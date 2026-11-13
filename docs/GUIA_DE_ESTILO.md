# Guía de estilo: Desastres Naturales

Esta guía registra el sistema visual que ya existe en el sitio. Se basa en las páginas HTML y en `src/style.css`; no introduce una identidad visual nueva. Si cambian los tokens o patrones de la interfaz, actualiza esta guía y la skill del proyecto.

## Colores

Las escalas siguientes están declaradas en `@theme` dentro de `src/style.css`. En Tailwind se usan como utilidades, por ejemplo `bg-gunmetal-950`, `text-tropical-mint-300` o `border-deep-teal-700`. También están disponibles como variables CSS `var(--color-gunmetal-950)`.

| Familia | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Gunmetal | `#f1f3f3` | `#e3e8e7` | `#c7d1d0` | `#acb9b8` | `#90a2a0` | `#748b89` | `#5d6f6d` | `#465352` | `#2e3837` | `#171c1b` | `#101313` |
| Deep teal | `#f1f3f2` | `#e3e8e5` | `#c7d1ca` | `#acb9b0` | `#90a295` | `#748b7b` | `#5d6f62` | `#46534a` | `#2e3831` | `#171c19` | `#101311` |
| Celadon | `#edf7f1` | `#dbf0e3` | `#b8e0c7` | `#94d1ab` | `#70c28f` | `#4db374` | `#3d8f5c` | `#2e6b45` | `#1f472e` | `#0f2417` | `#0b1910` |
| Emerald | `#ecf9ee` | `#d9f2dd` | `#b3e6bb` | `#8cd999` | `#66cc77` | `#40bf55` | `#339944` | `#267333` | `#194d22` | `#0d2611` | `#091b0c` |
| Tropical mint | `#e9fcf6` | `#d2f9ed` | `#a5f3da` | `#78edc8` | `#4be7b5` | `#1fe0a3` | `#18b482` | `#128762` | `#0c5a41` | `#062d21` | `#041f17` |

### Uso recomendado

- **Gunmetal:** paleta neutral para fondos, texto, bordes y superficies. En tema claro predominan los tonos 50–200; en tema oscuro, 800–950.
- **Deep teal:** acento secundario para enlaces, botones y títulos destacados, sobre todo en tema claro.
- **Tropical mint:** acento de interacción y marca: foco visible, elementos activos y énfasis en tema oscuro.
- **Celadon y Emerald:** escalas disponibles en Tailwind, pero actualmente no se usan en las páginas. No las sustituyas automáticamente por Tropical mint; consulta el diseño existente antes de incorporarlas.
- **Rojo y blanco:** se usan utilidades estándar de Tailwind para mensajes de riesgo, validación o contraste puntual; no son escalas de marca declaradas en `@theme`.

Mantén el contraste entre texto y fondo. Para estados de foco, sigue el patrón visible existente y no dependas solo del color para comunicar errores o estados.

## Tipografía

- No hay archivos de fuentes, `@font-face` ni fuentes externas cargadas. Se conserva la pila sans-serif predeterminada de Tailwind y del sistema.
- Usa las utilidades tipográficas de Tailwind (`text-sm`, `text-base`, `text-lg`, `text-2xl`, `text-4xl`, etc.) y conserva una jerarquía clara de encabezados.
- Los títulos suelen usar `font-bold` y `tracking-tight`; los párrafos priorizan `leading-relaxed` o `leading-7`.
- No añadas una fuente externa o una nueva familia tipográfica sin actualizar primero esta guía y confirmar el cambio visual.

## Layout y componentes

- El diseño es **mobile-first**: empieza por una columna y añade distribución con prefijos responsive como `sm:`, `md:`, `lg:` y `xl:`.
- Usa la escala de espaciado y los breakpoints predeterminados de Tailwind. Los estilos existentes usan contenedores `max-w-*`, rejillas, flexbox y separación generosa entre secciones.
- Las tarjetas y paneles suelen usar esquinas redondeadas (`rounded-lg`, `rounded-2xl`), bordes neutrales y sombras discretas.
- Conserva los estados `hover:`, `focus-visible:` y `dark:` de los controles; los elementos interactivos deben seguir siendo utilizables con teclado.
- El tema oscuro se activa con la clase `.dark`; `src/main.js` guarda la selección en `localStorage` y considera la preferencia del sistema cuando todavía no hay una selección guardada.
- Las transiciones son breves y deben respetar `prefers-reduced-motion` cuando se añada o modifique una animación.

## API de tokens visuales

Tailwind 4 genera las utilidades y variables CSS a partir de las escalas definidas en `@theme`:

```html
<section class="bg-gunmetal-50 text-gunmetal-900 dark:bg-gunmetal-950 dark:text-gunmetal-100">
  <a class="text-deep-teal-700 hover:text-tropical-mint-600 dark:text-tropical-mint-300">
    Enlace
  </a>
</section>
```

En CSS, usa la variable correspondiente, por ejemplo `var(--color-tropical-mint-300)`. Prefiere estos tokens frente a colores hexadecimales nuevos o estilos inline. Las variantes `dark:`, `sm:`, `md:` y similares son parte de la API de utilidades de Tailwind, no nombres de colores nuevos.

## APIs e integraciones relacionadas

El proyecto no expone una API propia ni tiene un servidor backend. La página de reporte es demostrativa y no envía ni guarda los datos del formulario.

- **Nominatim:** `src/contact-map.js` usa `GET /search?format=jsonv2&limit=1&q=...` para buscar un lugar y `GET /reverse?format=jsonv2&lat=...&lon=...` para obtener una dirección aproximada. La interfaz lee `lat`, `lon` y `display_name` del resultado. El texto de búsqueda y las coordenadas consultadas se envían a Nominatim.
- **OpenStreetMap:** Leaflet carga teselas desde `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png` y muestra la atribución requerida en el mapa.
- **Geolocation API del navegador:** `navigator.geolocation.getCurrentPosition()` se llama solo cuando la persona pulsa el botón de ubicación y autoriza el permiso. Requiere `localhost` o un contexto HTTPS seguro.

Estas integraciones dependen de Internet y de servicios externos. La selección de ubicación también genera un enlace externo a Google Maps; no es una API propia.
