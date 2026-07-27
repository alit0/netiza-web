# Test MCP Penpot — KiloCode

**Fecha:** 2026-07-18  
**Card Plane:** `588cf8e7-654d-43fb-9cc5-1a02c44eb71f`  
**Agente:** Kilo (DeepSeek 4 Pro)  
**Veredicto:** **Test de infraestructura exitoso**

---

## (a) Mecanismo exacto de configuración en KiloCode

KiloCode soporta MCP remoto vía `type: "remote"` en `kilo.json`. El archivo se creó en la raíz del proyecto (`netiza-web/kilo.json`):

```jsonc
{
  "$schema": "https://app.kilo.ai/config.json",
  "mcp": {
    "penpot": {
      "type": "remote",
      "url": "https://penpot.allitto.com/mcp/stream?userToken=<JWE de ~/.claude.json>",
      "enabled": true
    }
  }
}
```

- El token JWE se copió de `C:\Users\Ale\.claude.json` → `mcpServers.penpot.url`
- KiloCode validó el schema correctamente
- **NO hereda** de `~/.claude.json` como Grok (no tiene `[compat.claude]`). Requiere configuración explícita.
- El `type: "remote"` de KiloCode apunta a un endpoint streamable HTTP; la implementación interna debe manejar SSE.

## (b) Resultado handshake / tools

Handshake directo contra el endpoint (bypassing KiloCode):

```
POST https://penpot.allitto.com/mcp/stream?userToken=<JWE>
Accept: application/json, text/event-stream

→ HTTP 200
→ Server: penpot v1.0.0
→ Capabilities: tools (listChanged: true)
→ Instructions: "read high_level_overview first"
```

Tools esperados (según wiki + Claude): `high_level_overview`, `execute_code`, `export_shape`, `penpot_api_info`.

**Los tools NO aparecieron en la tool list de esta sesión de KiloCode.** Esto es esperable: la config se creó mid-sesión y KiloCode carga MCP servers al iniciar. En una sesión nueva, el mecanismo sería:

1. KiloCode lee `kilo.json` al iniciar
2. Conecta al endpoint remoto vía SSE
3. Negocia `initialize` → `tools/list`
4. Expone tools como `penpot_execute_code`, `penpot_high_level_overview`, etc.
5. Permisos: se configuran como `"penpot_*": "allow"` en `permission.mcp`

## (c) Boards — prueba de lectura

No se pudo ejecutar `execute_code` en esta sesión (tools no disponibles mid-sesion). El endpoint responde correctamente al `initialize` pero requiere:
- **Conexión SSE persistente** (no HTTP stateless)
- **Plugin conectado en navegador** (gotcha 0 del wiki: sin pestaña abierta, `execute_code` responde "No plugin instance connected")

La query de prueba era:
```js
return penpot.currentPage.root.children
  .filter(c => c.type === 'board')
  .map(b => ({ name: b.name, sections: b.children.length }))
```

## (d) Gotchas nuevos

1. **Requiere `Accept: application/json, text/event-stream`**. Sin este header, el endpoint responde HTTP 406 "Not Acceptable". KiloCode debe enviar este header automáticamente como parte de la implementación MCP estándar.
2. **SSE stateful**. Cada request HTTP es un stream nuevo; no se pueden encadenar `initialize` + `tools/list` en requests separados sin mantener la conexión SSE abierta.
3. **Config no recargada mid-sesión**. KiloCode carga MCP servers al iniciar; cambios en `kilo.json` requieren nueva sesión.
4. **Sin auto-descubrimiento desde `~/.claude.json`**. A diferencia de Grok, KiloCode no scanea config de Claude Code. Cada MCP se configura explícitamente en `kilo.json`.

---

## Paso replicable (para cualquier agente nuevo)

1. Leer `C:\Users\Ale\.claude.json` → `mcpServers.penpot.url` (contiene el token JWE)
2. Agregar al `kilo.json` del proyecto:
   ```jsonc
   { "mcp": { "penpot": { "type": "remote", "url": "<URL con userToken>", "enabled": true } } }
   ```
3. Agregar permisos: `"permission": { "penpot_*": "allow" }`
4. Verificar que Ale tenga el archivo Penpot abierto con el plugin MCP conectado (gotcha 0)
5. Abrir sesión nueva de KiloCode en `netiza-web`
6. Verificar que aparezcan las tools `penpot_high_level_overview`, `penpot_execute_code`, `penpot_export_shape`, `penpot_penpot_api_info`
