# Narrativa del problema

## Contexto

La **universidad** gestiona actualmente la información de su planta docente mediante hojas de cálculo compartidas y correos electrónicos. Cada facultad o coordinación mantiene su propia versión de los datos: nombres, correos institucionales, teléfonos, títulos académicos, área de enseñanza, tipo de dedicación (tiempo completo, medio tiempo, cátedra) y años de experiencia docente.

## Situación problemática

Cuando la **oficina de planeación** o **recursos humanos académicos** necesita un reporte consolidado —por ejemplo, docentes por área académica o con cierto nivel de titulación— el equipo debe **unificar manualmente** varios archivos, lo que genera:

- **Duplicados** del mismo docente con datos distintos.
- **Retrasos** en la entrega de información a acreditación y auditorías.
- **Errores** al transcribir teléfonos o correos al sistema de nómina o al campus virtual.
- **Falta de trazabilidad**: no queda claro cuándo se registró o modificó un dato.

Además, los coordinadores solicitan **cambios frecuentes** (nuevo teléfono, cambio de dedicación, actualización del título) y no existe un único lugar donde hacerlo de forma controlada.

## Personas involucradas

| Rol | Necesidad |
|-----|-----------|
| **Coordinación académica** | Consultar y actualizar datos de docentes de su área de forma rápida y sin depender de terceros para cada corrección menor. |
| **Planeación / RRHH académico** | Tener una **fuente única de verdad** exportable o consultable para reportes y cumplimiento normativo. |
| **Docente** | (Futuro) Que sus datos de contacto y titulación estén correctos en los sistemas institucionales. |

## Objetivo del negocio

Disponer de un **sistema centralizado** que permita **registrar, listar, modificar y dar de baja** (o archivar) la ficha básica de cada docente, con validaciones mínimas para evitar datos incompletos o inconsistentes, y que sea **accesible desde la red interna** (o entorno de desarrollo equivalente) mediante una interfaz web sencilla.

## Alcance inicial (MVP)

Para la primera versión se acuerda:

- No integrar aún con nómina ni campus virtual (solo almacenamiento y CRUD).
- No implementar roles de usuario avanzados en el MVP; el foco es **funcionalidad y arquitectura** reutilizable para cursos posteriores.
- Priorizar **claridad del modelo de datos** y **API estable** para que el frontend y otros consumidores puedan evolucionar.

## Cierre de la narrativa

El problema se resume en: **fragmentación y desactualización de la información docente**. La solución deseada es una **aplicación web con base de datos relacional** y **API REST** que sustituya los procesos manuales dispersos y siente las bases para auditoría, reportes y futuras integraciones.

---

*Este documento es la base para derivar los requerimientos (`REQUERIMIENTOS_FUNCIONALES_Y_NO_FUNCIONALES.md`) y el diseño técnico (`DISENO.md`).*
