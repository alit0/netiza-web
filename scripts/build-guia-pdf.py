"""Genera public/assets/diagnostico-guia.pdf desde docs/PDF-GUIA-DIAGNOSTICO.md.

Uso, desde la raíz del repo:

    pip install reportlab
    python scripts/build-guia-pdf.py

Correr esto cada vez que cambie el markdown de la guía. El PDF versionado en
public/assets/ tiene que quedar siempre en sincronía con su fuente.

IMPORTANTE — el corte en CUT_MARKER no es cosmético. El markdown termina con una
sección "Nota de proceso" que es la autoauditoría interna del agente que lo
redactó: menciona el briefing, engram y los frameworks que decidimos mantener
invisibles para el lector. Esa parte nunca puede llegar al PDF que recibe el
cliente. Si el marcador no aparece, el script aborta en vez de publicar de más.
"""
import html
import re
import sys
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
)

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "docs" / "PDF-GUIA-DIAGNOSTICO.md"
OUT = ROOT / "public" / "assets" / "diagnostico-guia.pdf"
CUT_MARKER = "## Nota de proceso"

# Paleta de src/styles/tokens.css (tier 1). Mantener en sincronía si cambia.
INK = HexColor("#232323")
PAPER = HexColor("#EFEBE5")
SAND = HexColor("#E7D7C1")
ACCENT = HexColor("#F15A24")
MUTED = HexColor("#5C5651")

# Helvetica y no Inter: el repo no versiona archivos de fuente (se cargan de
# Google Fonts en el sitio) y no vale la pena una descarga de red por esto.
PAGE_W, PAGE_H = A4
MARGIN_X = 24 * mm
MARGIN_TOP = 22 * mm
MARGIN_BOT = 20 * mm

styles = {
    "body": ParagraphStyle(
        "body", fontName="Helvetica", fontSize=10, leading=15.5,
        textColor=INK, alignment=TA_JUSTIFY, spaceAfter=7,
    ),
    "h2": ParagraphStyle(
        "h2", fontName="Helvetica-Bold", fontSize=21, leading=25,
        textColor=INK, spaceBefore=0, spaceAfter=4,
    ),
    "h3": ParagraphStyle(
        "h3", fontName="Helvetica-Bold", fontSize=13.5, leading=18,
        textColor=INK, spaceBefore=15, spaceAfter=5,
    ),
    "h4": ParagraphStyle(
        "h4", fontName="Helvetica-Bold", fontSize=8.6, leading=12,
        textColor=ACCENT, spaceBefore=9, spaceAfter=3,
    ),
    "bullet": ParagraphStyle(
        "bullet", fontName="Helvetica", fontSize=10, leading=15.5,
        textColor=INK, alignment=TA_LEFT, leftIndent=11, bulletIndent=2,
        spaceAfter=5,
    ),
    "subbullet": ParagraphStyle(
        "subbullet", fontName="Helvetica", fontSize=9.4, leading=14,
        textColor=MUTED, alignment=TA_LEFT, leftIndent=24, bulletIndent=14,
        spaceAfter=3,
    ),
    "cover_title": ParagraphStyle(
        "cover_title", fontName="Helvetica-Bold", fontSize=32, leading=37,
        textColor=INK, spaceAfter=0,
    ),
    "cover_sub": ParagraphStyle(
        "cover_sub", fontName="Helvetica", fontSize=13, leading=19,
        textColor=MUTED, spaceAfter=0,
    ),
    "cover_brand": ParagraphStyle(
        "cover_brand", fontName="Helvetica-Bold", fontSize=11, leading=14,
        textColor=ACCENT, spaceAfter=0,
    ),
}


def inline(text: str) -> str:
    """Escapa XML y vuelve a aplicar el énfasis de markdown como tags."""
    out = html.escape(text, quote=False)
    out = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", out)
    out = re.sub(r"(?<![\*\w])\*([^*]+?)\*(?!\w)", r"<i>\1</i>", out)
    return out


def read_body() -> list[str]:
    raw = SRC.read_text(encoding="utf-8")
    idx = raw.find(CUT_MARKER)
    if idx == -1:
        sys.exit(
            f"ABORTA: no se encontró el marcador de corte {CUT_MARKER!r} en {SRC.name}.\n"
            "Sin ese corte el PDF se llevaría la nota de proceso interna al cliente."
        )
    return raw[:idx].splitlines()


def draw_cover(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    canvas.setFillColor(ACCENT)
    canvas.rect(0, PAGE_H - 9 * mm, PAGE_W, 9 * mm, stroke=0, fill=1)
    canvas.setFillColor(SAND)
    canvas.rect(MARGIN_X, 34 * mm, PAGE_W - 2 * MARGIN_X, 0.8 * mm, stroke=0, fill=1)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8.5)
    canvas.drawString(MARGIN_X, 26 * mm, "netiza.com.ar  ·  Mercedes, Buenos Aires")
    canvas.restoreState()


def draw_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    canvas.setFillColor(ACCENT)
    canvas.rect(0, PAGE_H - 3.2 * mm, PAGE_W, 3.2 * mm, stroke=0, fill=1)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(MARGIN_X, 12 * mm,
                      "Guía de acción para tu presencia digital  ·  Netiza")
    canvas.drawRightString(PAGE_W - MARGIN_X, 12 * mm,
                           str(canvas.getPageNumber() - 1))
    canvas.restoreState()


def build() -> None:
    lines = read_body()
    OUT.parent.mkdir(parents=True, exist_ok=True)

    doc = BaseDocTemplate(
        str(OUT), pagesize=A4,
        leftMargin=MARGIN_X, rightMargin=MARGIN_X,
        topMargin=MARGIN_TOP, bottomMargin=MARGIN_BOT,
        title="Guía de acción para tu presencia digital",
        author="Netiza", subject="Autodiagnóstico de presencia digital",
    )
    frame = Frame(
        MARGIN_X, MARGIN_BOT,
        PAGE_W - 2 * MARGIN_X, PAGE_H - MARGIN_TOP - MARGIN_BOT,
        id="main", showBoundary=0,
    )
    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[frame], onPage=draw_cover),
        PageTemplate(id="body", frames=[frame], onPage=draw_page),
    ])

    story = []
    title = lines[0].lstrip("# ").strip()
    subtitle = lines[1].lstrip("# ").strip()

    story += [
        Spacer(1, 62 * mm),
        Paragraph("NETIZA", styles["cover_brand"]),
        Spacer(1, 8 * mm),
        Paragraph(inline(title), styles["cover_title"]),
        Spacer(1, 7 * mm),
        Paragraph(inline(subtitle), styles["cover_sub"]),
        NextPageTemplate("body"),
        PageBreak(),
    ]

    first_chapter = True
    for raw in lines[2:]:
        line = raw.rstrip()
        stripped = line.strip()
        if not stripped or stripped == "---":
            continue

        if stripped.startswith("#### "):
            story.append(Paragraph(inline(stripped[5:]).upper(), styles["h4"]))
        elif stripped.startswith("### "):
            story.append(Paragraph(inline(stripped[4:]), styles["h3"]))
        elif stripped.startswith("## "):
            if not first_chapter:
                story.append(PageBreak())
            first_chapter = False
            story.append(Paragraph(inline(stripped[3:]), styles["h2"]))
            story.append(Spacer(1, 4 * mm))
        elif re.match(r"^\d+\.\s", stripped):
            num, rest = stripped.split(".", 1)
            story.append(Paragraph(inline(rest.strip()), styles["bullet"],
                                   bulletText=f"{num}."))
        elif line.startswith("  - ") or line.startswith("    - "):
            story.append(Paragraph(inline(stripped[2:]), styles["subbullet"],
                                   bulletText="–"))
        elif stripped.startswith("- "):
            story.append(Paragraph(inline(stripped[2:]), styles["bullet"],
                                   bulletText="•"))
        else:
            story.append(Paragraph(inline(stripped), styles["body"]))

    doc.build(story)
    print(f"OK -> {OUT.relative_to(ROOT)}  ({OUT.stat().st_size:,} bytes)")


if __name__ == "__main__":
    build()
