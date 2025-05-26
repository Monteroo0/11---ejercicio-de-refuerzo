# Gestiónde una Veterinaria 🐶🐱

## Descripción del Proyecto
Este proyecto implementa un sistema interactivo para gestionar una veterinaria, permitiendo registrar dueños y mascotas, listar todas las mascotas, buscar mascotas por nombre, actualizar el estado de salud, eliminar mascotas y ver las mascotas asociadas a un dueño. Todo se realiza en memoria utilizando JavaScript, con un enfoque en asincronía mediante promesas y `async/await`.

## Tecnologías Usadas
- **HTML**: Estructura básica para cargar el script.
- **JavaScript**: Lógica del sistema, incluyendo asincronía con `setTimeout`, `Promises` y `async/await`.

## Asincronía
La gestión asincrónica se implementa en las siguientes funcionalidades:
- **Registro de dueño**: Usa `async/await` con `setTimeout` de 1.5 segundos para simular validación.
- **Registro de mascota**: Usa `async/await` con `setTimeout` de 2 segundos para verificar la existencia del dueño.
- **Búsqueda de mascota**: Usa `Promise` con retraso de 1.5 segundos.
- **Actualización de estado de salud**: Usa `async/await` con retraso de 1 segundo.
- **Eliminación de mascota**: Usa `Promise` con confirmación y retraso de 2 segundos.
- **Ver mascotas de un dueño**: Usa `async/await` con retraso de 2 segundos.

## Funcionalidades
1. **Registrar un nuevo dueño**: Permite registrar un dueño con nombre, cédula, teléfono y correo. Valida que no haya cédulas duplicadas.
2. **Registrar una nueva mascota**: Solicita nombre, especie, edad, peso, estado de salud y cédula del dueño. Los datos inválidos (por ejemplo, especie no permitida) generan un reintento automático.
3. **Listar todas las mascotas**: Muestra todas las mascotas registradas con sus detalles y el nombre del dueño.
4. **Buscar una mascota por nombre**: Encuentra una mascota por su nombre (insensible a mayúsculas/minúsculas).
5. **Actualizar el estado de salud**: Cambia el estado de salud de una mascota (Sano, Enfermo, En tratamiento).
6. **Eliminar una mascota**: Elimina una mascota tras confirmación del usuario.
7. **Ver mascotas de un dueño**: Lista todas las mascotas asociadas a un dueño por su cédula.

## Mejoras Implementadas
- **Validaciones insensibles a mayúsculas/minúsculas**: Especies ("perro", "PERRO", "Perro") y estados de salud ("sano", "SANO", "Sano") son aceptados en cualquier capitalización.