"""Smoke end-to-end de /diagnostico en un navegador real.

    pip install playwright && playwright install chromium
    npm run build
    python scripts/smoke-diagnostico.py

Por que existe: el 2026-07-26 se publico /diagnostico con el JavaScript roto.
`npm run build` daba verde, los tests de logica en Node daban verde y una
auditoria de codigo lo declaro publicable. Nadie habia abierto la pagina en un
navegador. Astro no valida la sintaxis de los scripts `is:inline`, asi que un
error de parseo viaja a produccion sin que nada falle de forma ruidosa.

Este script recorre las 12 preguntas y verifica que el resultado se renderice.
Sale con codigo != 0 si algo falla, para poder colgarlo de un hook o de CI.
"""
import http.server
import socket
import subprocess
import sys
import threading
from functools import partial
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
fallos: list[str] = []


def check(cond: bool, label: str, detail: str = "") -> None:
    if cond:
        print(f"  OK    {label}")
    else:
        fallos.append(label)
        print(f"  FALLA {label}{f' — {detail}' if detail else ''}")


def free_port() -> int:
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    port = s.getsockname()[1]
    s.close()
    return port


def main() -> int:
    if not (DIST / "diagnostico" / "index.html").exists():
        print("No hay dist/diagnostico/. Corre `npm run build` primero.")
        return 2

    port = free_port()
    handler = partial(http.server.SimpleHTTPRequestHandler, directory=str(DIST))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{port}"

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page(viewport={"width": 390, "height": 780})
            errores: list[str] = []
            page.on("pageerror", lambda e: errores.append(str(e)))

            print(f"\n=== /diagnostico en {base} ===")
            page.goto(f"{base}/diagnostico/", wait_until="networkidle")

            # El chequeo que hubiera atajado el incidente del 2026-07-26.
            check(not errores, "el JavaScript parsea sin errores",
                  " | ".join(errores[:2]))

            opciones = page.locator(".cuestionario__opcion")
            check(opciones.count() > 0, "la pregunta 1 renderiza sus opciones",
                  f"encontradas {opciones.count()}")

            if opciones.count() == 0:
                browser.close()
                return 1

            print("\n=== recorrido de las 12 preguntas ===")
            for n in range(1, 13):
                ops = page.locator(".cuestionario__opcion")
                if ops.count() == 0:
                    check(False, f"pregunta {n} tiene opciones", "cero")
                    break
                paso = page.locator("#cuestionario-paso").inner_text()
                if f"{n} de 12" not in paso:
                    check(False, f"pregunta {n}: el contador dice '{paso}'")
                ops.first.click()
                page.wait_for_timeout(500)
            else:
                check(True, "se avanzo por las 12 preguntas")

            print("\n=== pantalla de resultado ===")
            page.wait_for_timeout(900)
            resultado = page.locator("#diagnostico-resultado, .diag-result")
            check(resultado.count() > 0 and resultado.first.is_visible(),
                  "la pantalla de resultado aparece")
            body = page.locator("body").inner_text()
            check(page.locator("[data-overall]").count() > 0 and page.locator("[data-overall]").first.inner_text().strip() != "", "el resultado muestra un puntaje", page.locator("[data-overall]").first.inner_text() if page.locator("[data-overall]").count() else "sin elemento")
            check(page.locator("input[name='email']").count() > 0,
                  "el formulario de captura esta presente")

            check(not errores, "cero errores de JavaScript en todo el recorrido",
                  " | ".join(errores[:2]))
            browser.close()
    finally:
        server.shutdown()

    print()
    if fallos:
        print(f"SMOKE FALLIDO — {len(fallos)} chequeo(s): {', '.join(fallos)}")
        return 1
    print("SMOKE OK — /diagnostico funciona de punta a punta")
    return 0


if __name__ == "__main__":
    sys.exit(main())
