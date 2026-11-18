# BUG-PROD-001 - La API permite crear productos con precio negativo

## Información general

| Campo | Detalle |
|---|---|
| ID | BUG-PROD-001 |
| Módulo | Products |
| Caso de prueba asociado | PROD-010 |
| Severidad | Por determinar |
| Prioridad | Por determinar |
| Estado | Abierto |
| Tipo | Validación de datos |
| Fecha de detección | 16-11-2026 |

## Descripción

La API permite registrar productos utilizando un precio negativo, sin realizar una validación que rechace este tipo de valores.

Al enviar una solicitud POST al endpoint de productos con un precio de `-10`, la API responde con un código HTTP `201 Created` y devuelve los datos del producto creado, manteniendo el precio negativo.

## Precondiciones

- Disponer de acceso al endpoint de creación de productos.
- Contar con los datos obligatorios para registrar un producto.

## Pasos para reproducir

1. Enviar una solicitud POST al endpoint `/v1/products`.
2. Ingresar los datos requeridos para crear un producto.
3. Establecer el campo `price` con un valor negativo (`-10`).
4. Enviar la solicitud.
5. Revisar el código HTTP y el cuerpo de la respuesta.

## Resultado esperado

La API debería rechazar la creación del producto cuando el precio sea negativo, devolviendo una respuesta de error de validación.

## Resultado obtenido

La API acepta la solicitud y crea el producto correctamente.

- Código HTTP: `201 Created`.
- ID del producto creado: `61`.
- Precio registrado: `-10`.

## Evidencia

- `postman/evidencia/Bugs/PROD-010 - Crear un producto con un precio en negativo.png`

## Caso de prueba relacionado

`PROD-010 - Crear un producto con un precio en negativo`

