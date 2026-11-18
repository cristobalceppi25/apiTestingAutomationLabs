# Automation Labs – API Testing

## Descripción

Proyecto de QA enfocado en la exploración, documentación y automatización de pruebas de una API REST de e-commerce, utilizando la API de demostración de Automation Labs.

El objetivo es validar el comportamiento de los distintos endpoints, comprobar respuestas HTTP, estructuras JSON, reglas de validación, autenticación y manejo de errores.

El proyecto comenzó con la exploración y ejecución de pruebas en Postman y posteriormente se trasladó la automatización a Playwright con TypeScript.

## Objetivos

- Explorar y documentar los endpoints disponibles.
- Diseñar casos de prueba funcionales y negativos.
- Automatizar las pruebas de API utilizando Playwright.
- Validar códigos de estado HTTP, propiedades y tipos de datos de las respuestas JSON.
- Comprobar los procesos de autenticación, registro y renovación de tokens.
- Mantener una estructura reutilizable para incorporar nuevos endpoints y pruebas.

## Tecnologías utilizadas

- **Playwright:** automatización y ejecución de pruebas de API.
- **TypeScript:** lenguaje utilizado para implementar los tests.
- **Postman:** exploración inicial y diseño de peticiones.
- **Git / GitHub:** control de versiones y almacenamiento del proyecto.
- **Microsoft Excel:** documentación de la exploración y diseño de casos de prueba.

## Cobertura de pruebas

El proyecto contempla distintos módulos de la API, organizados según su funcionalidad.

### Autenticación (AUTH)

Pruebas relacionadas con:
- Inicio de sesión.
- Registro de usuarios.
- Renovación de tokens.
- Consulta de información del usuario autenticado.
- Validación de autenticación mediante Bearer Token.
- Cierre de sesión.
- Validaciones negativas y manejo de errores.

### Usuarios (USERS)

Pruebas relacionadas con:
- Consulta y búsqueda de usuarios.
- Creación de usuarios.
- Modificación de información mediante PUT y PATCH.
- Eliminación de usuarios.
- Validación de parámetros y campos obligatorios.

### Productos (PROD)

Pruebas relacionadas con:
- Consulta y búsqueda de productos.
- Creación de productos.
- Modificación de información.
- Eliminación de productos.
- Validación de parámetros y datos de entrada.


## Aspectos evaluados

- Códigos de estado HTTP.
- Existencia de propiedades en las respuestas.
- Tipos de datos y valores esperados.
- Mensajes y códigos de error.
- Validación de campos obligatorios.
- Autenticación mediante Bearer Token.
- Generación y renovación de tokens.
- Comportamiento de los endpoints ante solicitudes válidas e inválidas.

## Estructura del proyecto

```text
apiTestingAutomationLabs/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── config/
│   └── api.urls.ts
│
├── docs/
│   ├── API-Exploration.xlsx
│   └── Test-cases.xlsx
│
├── evidencia/
│   ├── playwright/
│   │   └── test-report.png
│   │
│   └── postman/
│       ├── 01 - Autentificación/
│       ├── 02 - Users/
│       ├── 03 - Products/
│       └── Bugs/
│           └── BUGS-PROD-001/
│               ├── PROD-010 - ...
│               ├── PROD-010-response.json
│               └── Reporte completo de Postman.png
│
├── helpers/
│
├── postman/
│   └── Automation Labs API Testing.postman_collection.json
│
├── test_data/
│   ├── auth.data.ts
│   ├── product.data.ts
│   └── user.data.ts
│
├── test-results/
│
├── playwright-report/
│
├── tests/
│   └── api/
│       ├── auth.spec.ts
│       ├── products.spec.ts
│       ├── users.spec.ts
│       └── example.spec.ts
│
├── types/
│   ├── common/
│   │   ├── pagination.types.ts
│   │   └── validationError.types.ts
│   ├── products.types.ts
│   └── users.types.ts
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

## Documentación y evidencias

El repositorio incluye documentación complementaria:

- **API-Exploration.xlsx:** registro de la exploración de los endpoints, comportamiento observado y reglas identificadas.
- **Test-cases.xlsx:** diseño y documentación de los casos de prueba.
- **Colección de Postman:** peticiones y scripts utilizados durante la etapa inicial de exploración y testing.
- **evidencia/postman/:** capturas de ejecución, respuestas y documentación de errores encontrados.
- **evidencia/playwright/:** evidencias visuales de las ejecuciones automatizadas.

## Próximas etapas

- [ ] **Integración continua (CI/CD):** validar y mejorar la ejecución automática mediante GitHub Actions.
- [ ] **Reportes:** mejorar la presentación y conservación de los resultados de ejecución.

## Ejecución de las pruebas

Clonar el repositorio:

```bash
git clone https://github.com/cristobalceppi25/apiTestingAutomationLabs.git
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar la suite de pruebas:

```bash
npx playwright test --workers=1
```

Ejecutar únicamente las pruebas de autenticación:

```bash
npx playwright test tests/api/auth.spec.ts
```

Visualizar el informe de ejecución:

```bash
npx playwright show-report
```

La URL base de la API se configura en `playwright.config.ts`.