# Requerimientos funcionales y no funcionales

Este documento se deriva de la narrativa descrita en [`NARRATIVA_PROBLEMA.md`](./NARRATIVA_PROBLEMA.md).

---

## Requerimientos funcionales

| ID | Requerimiento | Prioridad |
|----|----------------|-----------|
| RF-01 | El sistema debe permitir **crear** un registro de docente con: nombre completo, correo institucional, teléfono, título académico máximo, área académica, tipo de dedicación y años de experiencia docente. | Alta |
| RF-02 | El sistema debe **listar** todos los docentes registrados en una sola vista o endpoint. | Alta |
| RF-03 | El sistema debe permitir **consultar** un docente por su identificador único. | Alta |
| RF-04 | El sistema debe permitir **actualizar** los datos de un docente existente identificado por su ID. | Alta |
| RF-05 | El sistema debe permitir **eliminar** un docente del registro activo identificado por su ID. | Media |
| RF-06 | El sistema debe **validar** que los campos de texto obligatorios no estén vacíos (tras normalizar espacios en blanco). | Alta |
| RF-07 | El sistema debe **validar** que los años de experiencia sean un número no negativo y rechazar valores no numéricos inválidos. | Alta |
| RF-08 | El sistema debe **rechazar** la creación o actualización cuando falten datos obligatorios o las validaciones fallen, informando el error de forma entendible para el cliente (p. ej. mensaje en JSON). | Alta |
| RF-09 | El frontend debe ofrecer una **interfaz** para realizar las operaciones de alta, listado, edición y baja sin depender de herramientas externas (Postman no excluido para pruebas, pero la UI debe cubrir el flujo principal). | Alta |
| RF-10 | El identificador del docente debe ser **único** y **generado por el sistema** (no editable por el usuario en alta). | Alta |

### Reglas de negocio asociadas

- Cada docente corresponde a **una fila** en la tabla principal de docentes.
- El correo y demás datos se consideran obligatorios en el MVP para mantener **calidad mínima** del catálogo (la narrativa menciona errores por datos incompletos).

---

## Requerimientos no funcionales

| ID | Requerimiento | Categoría | Prioridad |
|----|----------------|-----------|-----------|
| RNF-01 | La API debe exponerse como **REST** sobre HTTP, usando JSON en cuerpos y respuestas donde aplique. | Interoperabilidad | Alta |
| RNF-02 | El backend debe persistir datos en una **base de datos relacional** (MySQL o compatible con el estándar del proyecto). | Persistencia | Alta |
| RNF-03 | Las consultas parametrizadas deben usarse para **mitigar inyección SQL** en operaciones de lectura/escritura. | Seguridad | Alta |
| RNF-04 | El servidor debe permitir llamadas desde el **navegador en otro origen** (p. ej. frontend en puerto distinto) mediante configuración CORS acorde al entorno de desarrollo. | Usabilidad / Desarrollo | Media |
| RNF-05 | En caso de error de base de datos u operación inválida, el servidor debe responder con **códigos HTTP apropiados** (p. ej. 400 validación, 404 no encontrado, 500 error interno). | Confiabilidad | Alta |
| RNF-06 | El tiempo de respuesta de operaciones CRUD típicas en entorno local debe ser **adecuado para uso interactivo** (objetivo orientativo: por debajo de unos pocos segundos con volúmenes académicos habituales). | Rendimiento | Media |
| RNF-07 | El código debe estar **organizado** en capas reconocibles (servidor, acceso a datos, cliente) para facilitar mantenimiento y extensiones futuras (roles, reportes). | Mantenibilidad | Media |
| RNF-08 | La solución debe poder ejecutarse en **entornos de laboratorio** (Windows/Linux) con Node.js y motor SQL según documentación del repositorio. | Portabilidad | Media |

---

## Trazabilidad narrativa → requerimientos

| Elemento de la narrativa | Requerimientos que lo cubren |
|----------------------------|------------------------------|
| Fuente única de verdad | RF-01 a RF-05, RNF-02 |
| Evitar datos incompletos | RF-06, RF-07, RF-08 |
| Interfaz web | RF-09, RNF-04 |
| Base para integraciones futuras | RNF-01, RNF-07 |
| Sustituir hojas dispersas | RF-02, RF-03, RF-04 |

---

*El diseño técnico que satisface estos requerimientos se describe en [`DISENO.md`](./DISENO.md).*
