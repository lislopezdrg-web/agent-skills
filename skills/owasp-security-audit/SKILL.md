---
name: owasp-security-audit
description: >-
  Realiza una auditoría de seguridad completa basada en el OWASP Top 10 2025
  analizando el código fuente del proyecto actual. Genera un reporte versionado
  en ./security-audits/ con hallazgos priorizados, recomendaciones específicas
  al stack detectado y changelog respecto al reporte anterior. Usar cuando el
  usuario pida: auditoría de seguridad, revisión OWASP, security audit, análisis
  de vulnerabilidades, revisar si el proyecto cumple OWASP Top 10, quiera un
  reporte de seguridad, o pregunte qué tan seguro está el proyecto.
---

# Auditoría de Seguridad OWASP Top 10 2025

Flujo obligatorio en **cuatro fases** (A → B → C → D). No emitir hallazgos sin completar A y B.

---

## Fase A — Análisis de arquitectura y stack técnico

### A1. Leer la documentación del proyecto

Buscar y leer los siguientes archivos para entender la arquitectura, convenciones y flujos del proyecto **antes** de inspeccionar el código fuente. Esta lectura es la base para que las recomendaciones sean específicas y accionables.

| Archivo | Contenido relevante |
|---|---|
| `CLAUDE.md` | Arquitectura, flujo de trabajo, convenciones del proyecto |
| `AGENTS.md` | Reglas de desarrollo, capas, testing |
| `README.md` | Descripción del sistema, comandos, dependencias |
| `CONTRIBUTING.md` | Convenciones de código, proceso de desarrollo |
| `ARCHITECTURE.md` | Diseño del sistema, patrones arquitectónicos |
| `API_DEV_GUIDELINES.md` | Convenciones de API, autenticación, validación |
| `docs/**/*.md` | Documentación adicional de módulos o servicios |

Leer todos los que existan. Si ninguno existe, proceder directamente con A2.

### A2. Detectar el stack tecnológico

Buscar los siguientes archivos de configuración para identificar el ecosistema, frameworks y dependencias:

**Node.js / TypeScript**
```bash
cat package.json 2>/dev/null
```
→ Detectar: NestJS, Express, Fastify, Next.js, Nuxt, Koa, Hono; ORM: Prisma, TypeORM, Sequelize, Drizzle; Auth: Passport, Auth.js, jose, jsonwebtoken

**Python**
```bash
cat requirements.txt pyproject.toml setup.py 2>/dev/null
```
→ Detectar: Django, FastAPI, Flask, Starlette; ORM: SQLAlchemy, Tortoise, Django ORM

**Java / Kotlin**
```bash
cat pom.xml build.gradle build.gradle.kts 2>/dev/null
```
→ Detectar: Spring Boot, Quarkus, Micronaut, Ktor

**Go**
```bash
cat go.mod 2>/dev/null
```
→ Detectar: Gin, Echo, Fiber, Chi, stdlib net/http

**Rust**
```bash
cat Cargo.toml 2>/dev/null
```
→ Detectar: Actix-web, Axum, Rocket

**PHP**
```bash
cat composer.json 2>/dev/null
```
→ Detectar: Laravel, Symfony, Slim

**Ruby**
```bash
cat Gemfile 2>/dev/null
```
→ Detectar: Rails, Sinatra, Hanami

**.NET**
```bash
ls *.csproj *.sln 2>/dev/null
```
→ Detectar: ASP.NET Core, Minimal API, Blazor

**Móvil**
```bash
cat pubspec.yaml 2>/dev/null
ls android/build.gradle 2>/dev/null
ls Package.swift 2>/dev/null
```
→ Detectar: Flutter, Android nativo, iOS nativo

**Infraestructura y despliegue**
```bash
cat docker-compose.yml Dockerfile .env.example 2>/dev/null
ls kubernetes/ terraform/ 2>/dev/null
```

### A3. Identificar el patrón arquitectónico

Inspeccionar la estructura de carpetas para determinar el patrón de diseño:

```bash
find . -maxdepth 3 -type d | grep -v node_modules | grep -v .git | grep -v dist | grep -v __pycache__ | sort
```

Determinar el patrón:
- **Hexagonal / Clean Architecture**: carpetas `domain/`, `application/`, `infrastructure/`, `presentation/`
- **MVC**: carpetas `models/`, `views/`, `controllers/`
- **Microservicios**: múltiples servicios con sus propios manifests de dependencias
- **Serverless / Functions**: carpetas `functions/`, `handlers/`, archivos `serverless.yml`
- **Monolito modular**: carpetas por módulo de negocio con subcapas internas
- **Event-driven**: presencia de `events/`, `consumers/`, `producers/`, brokers como Kafka o RabbitMQ

### A4. Identificar superficies de exposición

Determinar qué interfaces expone el proyecto al exterior:
- **API REST**: rutas HTTP, controladores, middlewares de validación
- **GraphQL**: schemas, resolvers, mutations
- **WebSockets / SSE**: handlers de tiempo real
- **gRPC**: archivos `.proto`, definiciones de servicios RPC
- **Frontend web / SPA**: componentes, rutas del cliente, llamadas a APIs externas
- **App móvil**: pantallas, servicios, permisos del sistema operativo
- **CLI**: comandos, flags, lectura de stdin
- **Microservicio interno**: consumidores de colas, workers, jobs

### A5. Detectar mecanismos de autenticación y autorización existentes

Identificar qué mecanismos de seguridad ya están implementados en el proyecto:
- JWT, OAuth2/OIDC, sesiones con cookies, API keys, certificados mTLS
- RBAC / ABAC: CASL, Casbin, anotaciones de rol, guards
- Middlewares, decoradores o filtros de control de acceso existentes
- Rate limiting, CORS, CSP ya configurados

Checklist Fase A:
- [ ] Documentación del proyecto leída (CLAUDE.md, README, AGENTS.md, docs/, etc.)
- [ ] Stack tecnológico y frameworks identificados
- [ ] ORM / base de datos detectados
- [ ] Patrón arquitectónico determinado
- [ ] Superficies de exposición identificadas
- [ ] Mecanismos de auth/authz existentes detectados

---

## Fase B — Selección de controles OWASP aplicables

### B1. Determinar qué controles aplican al proyecto

Leer `__SKILL_DIR__/owasp-developer-guide.md` como única fuente de verdad para los controles OWASP.

**Antes de extraer ningún control**, determinar cuáles son relevantes para este proyecto específico. No auditar los 10 controles por defecto; solo los que tienen sentido dado el tipo de proyecto detectado en Fase A:

| Control | Aplica principalmente a… | Excluir típicamente si… |
|---------|--------------------------|--------------------------|
| A01 Control de Acceso Roto | APIs, frontends, cualquier app con usuarios o roles | Script CLI sin usuarios, librería sin auth |
| A02 Mala Configuración de Seguridad | Cualquier aplicación desplegada | Librerías de propósito general sin configuración de servidor |
| A03 Fallos en Cadena de Suministro | Proyectos con dependencias externas (npm, pip, maven…) | Scripts de un solo archivo sin dependencias |
| A04 Fallos Criptográficos | Apps con contraseñas, datos personales, pagos, tokens | Herramientas internas sin datos sensibles |
| A05 Inyección | Apps con DB, comandos del SO, plantillas, queries | Proyectos sin intérpretes externos ni entrada de usuario |
| A06 Diseño Inseguro | Proyectos con lógica de negocio compleja | Prototipos o demos sin flujos de negocio definidos |
| A07 Fallos de Autenticación | Apps con login, sesiones, tokens, usuarios | Microservicios internos sin auth, CLIs sin usuarios |
| A08 Integridad de Software y Datos | Apps con updates automáticos, CDN, deserialización, CI/CD | Apps sin componentes que se actualicen en runtime |
| A09 Fallos en Registro y Alertas | Apps en producción con usuarios reales | Scripts de desarrollo o herramientas one-shot |
| A10 Manejo Incorrecto de Excepciones | Cualquier app con transacciones o flujos críticos | Scripts simples con flujos lineales sin transacciones |

Seleccionar solo los controles que aplican y documentar cuáles se excluyen y por qué.

### B2. Extraer y contextualizar los controles seleccionados

Para cada control seleccionado, leer del guide:
- Descripción del riesgo
- Señales de vulnerabilidad concretas a buscar en el código
- Criterios de prevención recomendados

Luego traducir esos criterios al contexto específico del stack detectado. Algunos ejemplos de lo que significa adaptar:

- **A05 Injection en NestJS + Prisma** → buscar `$queryRaw`, `$executeRaw`, interpolación de strings en queries; verificar uso de `@ValidateNested()`, `class-validator`
- **A05 Injection en Django** → buscar `.raw()`, `.extra()`, uso de `format()` o `%` en queries; verificar `parameterized queries`
- **A07 Auth Failures en Express + JWT** → buscar ausencia de validación de `exp`, uso de algoritmo `none`, secrets hardcodeados
- **A03 Supply Chain en Node.js** → revisar versiones en `package.json`, presencia de `package-lock.json`, uso de `npm audit`
- **A01 Access Control en NestJS** → verificar presencia de guards globales, decoradores `@Roles()`, políticas CASL en cada endpoint

Checklist Fase B:
- [ ] Controles aplicables determinados y justificados según el tipo de proyecto
- [ ] Controles excluidos documentados con razón clara
- [ ] Solo los controles aplicables leídos del owasp-developer-guide.md
- [ ] Señales de vulnerabilidad y criterios traducidos al stack específico

---

## Fase C — Versionado y lógica de Changelog

### C1. Detectar reportes anteriores y calcular el número del nuevo reporte

```bash
# bash / zsh
last=$(ls ./security-audits/security_audit_report_*.md 2>/dev/null \
  | grep -oE '[0-9]+' | sort -n | tail -1)
next=$((${last:-0} + 1))
echo "Nuevo reporte: security_audit_report_${next}.md"
```

```powershell
# PowerShell
$prev = Get-ChildItem ./security-audits/security_audit_report_*.md -ErrorAction SilentlyContinue |
  Sort-Object { [int]($_.BaseName -replace '\D','') } | Select-Object -Last 1
$last = if ($prev) { [int]($prev.BaseName -replace '\D','') } else { 0 }
$next = $last + 1
Write-Host "Nuevo reporte: security_audit_report_$next.md"
```

### C2. Comparar con el reporte anterior

Si existe un reporte anterior, leerlo y comparar el estado de cada control para clasificar los hallazgos del nuevo reporte:

- **NUEVO** 🆕 — el control figura como vulnerable ahora pero no en el reporte anterior
- **PERSISTE** ⚠️ — el control figura como vulnerable en ambos reportes
- **RESUELTO** ✅ — el control era vulnerable antes, ahora está conforme
- **SIN CAMBIO** — el control estaba conforme antes y sigue conforme (no se lista en el changelog)

Si no hay reporte anterior, todos los hallazgos se marcan como **NUEVO** 🆕 y el changelog indicará que es el primer reporte.

Checklist Fase C:
- [ ] Directorio `./security-audits/` verificado
- [ ] Número del nuevo reporte calculado (N) sin sobrescribir reportes anteriores
- [ ] Reporte anterior leído y hallazgos clasificados por cambio

---

## Fase D — Generación del reporte

### D1. Crear el directorio si no existe

```bash
mkdir -p ./security-audits/
```

```powershell
New-Item -ItemType Directory -Force -Path ./security-audits/ | Out-Null
```

### D2. Escribir el reporte en UTF-8

El archivo debe guardarse en UTF-8 para que los emojis 🟢 🟡 🔴 y los acentos se lean correctamente en Windows, macOS y Linux.

Usar la herramienta `Write` del entorno cuando esté disponible — garantiza UTF-8 de forma nativa. Si se usa la terminal:

```bash
# bash — redirigir con encoding explícito
LANG=en_US.UTF-8 cat > "./security-audits/security_audit_report_${next}.md" << 'REPORTE'
[contenido]
REPORTE
```

```powershell
# PowerShell — siempre especificar UTF8 sin BOM
$content | Out-File -FilePath "./security-audits/security_audit_report_$next.md" -Encoding utf8
```

### D3. Estructura del reporte

El reporte completo debe seguir esta estructura, redactado íntegramente en español:

```markdown
# Reporte de Auditoría de Seguridad OWASP Top 10 2025

- **Fecha**: YYYY-MM-DD
- **Proyecto**: [nombre detectado del README o carpeta raíz]
- **Stack**:
  - [framework principal]
  - [ORM / base de datos]
  - [librerías relevantes para seguridad]
- **Arquitectura**: [patrón detectado]
- **Superficies evaluadas**: [REST API, frontend, CLI, etc.]
- **Reporte anterior**: [security_audit_report_N-1.md o "Ninguno — primer reporte"]

---

## Resumen Ejecutivo

**Veredicto global**: 🔴 CRÍTICO / 🟡 ALTO / 🟢 ACEPTABLE

| Estado | Controles |
|--------|-----------|
| 🔴 Crítico | N |
| 🟡 Advertencia | M |
| 🟢 Conforme | P |
| ⬜ No aplica | Q |

[Párrafo breve en español describiendo el estado general de seguridad y los riesgos más urgentes.]

---

## Checklist de controles OWASP evaluados

| ID | Control | Estado | Hallazgo principal |
|----|---------|--------|--------------------|
| A01 | Control de Acceso Roto | 🔴 Crítico | Endpoints sin guardia de roles |
| A02 | Mala Configuración de Seguridad | 🟡 Advertencia | Headers de seguridad ausentes |
| A05 | Inyección | 🟢 Conforme | Uso correcto de queries parametrizadas |

Solo listar los controles que fueron evaluados. No incluir filas ni secciones para controles excluidos. Si en el Changelog un control aparece como 🆕 NUEVO porque antes no era evaluable y ahora sí aplica, eso ya queda registrado en esa sección.

---

## Hallazgos priorizados

### 🔴 Crítico — [A01] [Título descriptivo del hallazgo]

**Evidencia**: `ruta/al/archivo.ts` (línea aprox. N)
**Descripción**: [Qué está mal y por qué representa un riesgo de seguridad real en este proyecto]
**Recomendación**: [Qué hacer concretamente, con ejemplos de código en el stack del proyecto si aplica]
**Changelog**: 🆕 NUEVO / ⚠️ PERSISTE desde `security_audit_report_N-1.md`

---

### 🟡 Advertencia — [A02] [Título descriptivo del hallazgo]

**Evidencia**: `ruta/al/archivo.ts` (línea aprox. N)
**Descripción**: ...
**Recomendación**: ...
**Changelog**: ...

---

## Changelog respecto al reporte anterior

> Comparando con: `./security-audits/security_audit_report_N-1.md`

| Control | Estado anterior | Estado actual | Cambio |
|---------|----------------|---------------|--------|
| A01 | 🔴 Crítico | 🔴 Crítico | ⚠️ PERSISTE |
| A05 | 🔴 Crítico | 🟢 Conforme | ✅ RESUELTO |
| A09 | ⬜ No evaluado | 🟡 Advertencia | 🆕 NUEVO |

> Si es el primer reporte: "Este es el primer reporte de auditoría del proyecto. No existe historial previo para comparar."
```

### D4. Restricción de salida en el chat

**No imprimir el reporte completo en el chat.** Al finalizar la escritura del archivo, mostrar únicamente estas 5 líneas:

```
Reporte generado: ./security-audits/security_audit_report_N.md
Stack detectado: [tecnologías principales separadas por comas]
🔴 Críticos: N | 🟡 Advertencias: M | 🟢 Conformes: P | ⬜ No aplica: Q
Hallazgo más grave: [título del primer hallazgo crítico, o "Sin hallazgos críticos"]
Changelog: [N persisten · M nuevos · P resueltos] (o "Primer reporte — sin historial previo")
```

Checklist Fase D:
- [ ] Directorio `./security-audits/` creado si no existía
- [ ] Número del reporte calculado correctamente (no sobrescribe reportes anteriores)
- [ ] Archivo escrito en UTF-8 con emojis y acentos correctos
- [ ] Reporte contiene: Resumen Ejecutivo, Checklist, Hallazgos priorizados, Changelog
- [ ] Recomendaciones redactadas en español y específicas al stack del proyecto
- [ ] Solo 5 líneas mostradas en el chat
