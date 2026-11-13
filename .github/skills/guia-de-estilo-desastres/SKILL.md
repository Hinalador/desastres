---
name: guia-de-estilo-desastres
description: Use when creating or changing the visual interface, colors, typography, Tailwind classes, responsive layouts, dark mode, or animations in Desastres Naturales. Read the project style guide before making visual decisions.
---

# Guía de estilo de Desastres Naturales

Usa esta skill para mantener coherentes las interfaces nuevas y existentes del proyecto.

## Procedimiento

1. Antes de proponer o editar estilos, lee `docs/GUIA_DE_ESTILO.md` desde la raíz del repositorio.
2. Revisa el HTML y CSS del componente que vas a cambiar y reutiliza sus patrones cercanos.
3. Usa primero las escalas de color y utilidades de Tailwind descritas en la guía. No inventes colores, fuentes ni tokens. Si una necesidad requiere una nueva decisión visual, explícalo y actualiza la guía junto con la implementación.
4. Conserva el enfoque mobile-first, los estados de tema claro y oscuro, los estilos `focus-visible` y la navegación por teclado.
5. Si cambias una animación, respeta `prefers-reduced-motion`. No comuniques un estado solo mediante color.
6. Después de cambios visuales, ejecuta `npm run build` para comprobar la compilación.

## API del sistema visual

Los tokens de color se declaran con `@theme` en `src/style.css`. Tailwind CSS 4 los expone como clases, por ejemplo `bg-gunmetal-950`, `text-deep-teal-700` y `dark:text-tropical-mint-300`, y como variables CSS, por ejemplo `var(--color-gunmetal-950)`. Usa las variantes responsive (`sm:`, `md:`, `lg:`) y `dark:` en lugar de duplicar reglas cuando una utilidad existente resuelva el caso.

La tabla de `docs/GUIA_DE_ESTILO.md` es la referencia completa de nombres, escalas y códigos hexadecimales. Celadon y Emerald están definidos, pero no se usan actualmente en las páginas.

## APIs de la aplicación

El sitio no tiene backend ni endpoints propios. El formulario es una demostración que no almacena ni transmite reportes.

- `src/contact-map.js` consulta Nominatim con `GET https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=...` para búsquedas y `GET https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=...&lon=...` para geocodificación inversa. Se usan los campos `lat`, `lon` y `display_name`.
- Leaflet obtiene imágenes de mapa del servicio de teselas de OpenStreetMap: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`.
- La ubicación actual usa la API del navegador `navigator.geolocation.getCurrentPosition()`, solo tras una acción y permiso de la persona. Las coordenadas seleccionadas se consultan con Nominatim para obtener una dirección aproximada.

Al modificar estas integraciones, conserva la atribución de OpenStreetMap y comunica que las búsquedas y coordenadas se comparten con Nominatim. No describas el formulario como un canal real de emergencias.
