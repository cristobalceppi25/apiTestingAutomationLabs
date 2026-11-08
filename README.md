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


## Pruebas implementadas

### 1. Autenticación (AUTH)

Actualmente se encuentran implementados 16 casos de prueba relacionados con autenticación y gestión de usuarios.

| ID | Escenario |
|---|---|
| AUTH-001 | Login con credenciales válidas |
| AUTH-002 | Login con email inexistente |
| AUTH-003 | Login sin email |
| AUTH-004 | Login sin contraseña |
| AUTH-005 | Login con body vacío |
| AUTH-006 | Registro con credenciales válidas |
| AUTH-007 | Registro con formato de email incorrecto |
| AUTH-008 | Registro sin nombre |
| AUTH-009 | Registro sin email |
| AUTH-010 | Registro sin contraseña |
| AUTH-011 | Renovación de token válido |
| AUTH-012 | Renovación con refresh token inválido |
| AUTH-013 | Renovación sin refresh token |
| AUTH-014 | Consulta de información del usuario autenticado |
| AUTH-015 | Consulta de usuario sin Bearer token |
| AUTH-016 | Cierre de sesión |

### Aspectos evaluados

- Códigos de estado HTTP.
- Existencia de propiedades en las respuestas.
- Tipos de datos y valores esperados.
- Mensajes y códigos de error.
- Validación de campos obligatorios.
- Autenticación mediante Bearer Token.
- Generación y renovación de tokens.


## Documentación

El repositorio incluye documentación complementaria:

- **API-Exploration.xlsx:** registro de la exploración de los endpoints, comportamiento observado y reglas identificadas.
- **Test-cases.xlsx:** diseño y documentación de los casos de prueba.
- **Colección de Postman:** peticiones y scripts utilizados durante la etapa inicial de exploración y testing.

## Próximas etapas

El proyecto continuará ampliando la cobertura de la API mediante los siguientes módulos:

- [ ] **Users:** pruebas de consulta, creación, modificación y eliminación de usuarios.
- [ ] **Products:** pruebas de consulta, búsqueda, creación, modificación y eliminación de productos.
- [ ] **Orders:** pruebas de consulta, creación, modificación y eliminación de órdenes.
- [ ] **Integración continua (CI/CD):** configuración de GitHub Actions para ejecutar automáticamente las pruebas.
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
npx playwright test
```

Ejecutar únicamente las pruebas de autenticación:

```bash
npx playwright test tests/api/auth.spec.ts
```

Visualizar el informe de ejecución (si está habilitado en la configuración):

```bash
npx playwright show-report
```

La URL base de la API se configura en `playwright.config.ts`.


