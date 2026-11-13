# Desastres Naturales

Sitio web educativo en español para aprender sobre fenómenos naturales, consultar ejemplos históricos y explorar recomendaciones generales de prevención. Incluye una demostración de formulario con mapa interactivo; no recibe ni almacena reportes. La interfaz es responsive, con tema claro y oscuro.

Sitio publicado: <https://hinalador.github.io/desastres/>.

> **Importante:** el formulario de reporte es actualmente una interfaz de demostración. No envía ni guarda los datos. Si ocurre una emergencia real, contacta primero a los servicios de emergencia de tu zona.

## Contenido

- [Funciones](#funciones)
- [Tecnologías](#tecnologías)
- [Guía de estilo y skill](#guía-de-estilo-y-skill)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Comandos disponibles](#comandos-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [APIs, mapas, ubicación e imágenes](#apis-mapas-ubicación-e-imágenes)
- [Limitaciones conocidas](#limitaciones-conocidas)
- [Solución de problemas](#solución-de-problemas)

## Funciones

- Página principal con introducción y guías breves sobre terremotos, inundaciones y tsunamis, incendios forestales y erupciones volcánicas.
- Carrusel principal con controles, navegación por teclado e información de preparación.
- Página “Acerca de” con el propósito, alcance y límites educativos del sitio, y una guía de prevención de cinco pasos.
- Tarjetas informativas interactivas sobre distintos tipos de desastres.
- Casos históricos ilustrados: tsunami de Japón de 2011, terremoto de San Francisco de 1906 y erupción del Tambora de 1815.
- Formulario de demostración con mapa para buscar una ubicación, seleccionar un punto o solicitar la ubicación actual del dispositivo.
- Menú adaptable a pantallas pequeñas y tema claro/oscuro que guarda la preferencia en el navegador.
- Animación sorpresa de una motocicleta al cambiar el tema cinco veces durante una visita.
- Controles, etiquetas y estados accesibles por teclado y tecnologías de asistencia; se respetan algunas preferencias de movimiento reducido.

## Tecnologías

- [Vite](https://vite.dev/) para el servidor de desarrollo y la compilación multipágina.
- [Tailwind CSS 4](https://tailwindcss.com/) y su plugin de Vite para generar los estilos.
- [Leaflet](https://leafletjs.com/) para el mapa interactivo.
- [OpenStreetMap](https://www.openstreetmap.org/) para las imágenes de mapa y [Nominatim](https://nominatim.org/) para la búsqueda de lugares y direcciones aproximadas.
- HTML, CSS y JavaScript en módulos ES.

## Guía de estilo y skill

La guía visual del proyecto está en [`docs/GUIA_DE_ESTILO.md`](./docs/GUIA_DE_ESTILO.md). Documenta las paletas y sus códigos hexadecimales, tipografía, patrones de layout, tema oscuro, accesibilidad y la API de tokens de Tailwind que ya usa el sitio.

La skill [`guia-de-estilo-desastres`](./.github/skills/guia-de-estilo-desastres/SKILL.md) indica a Copilot que lea esa guía antes de modificar la interfaz y que reutilice los tokens y patrones existentes. Es una guía de trabajo para el agente; no añade dependencias ni se ejecuta en el sitio.

## Requisitos

- [Git](https://git-scm.com/) instalado.
- [Node.js](https://nodejs.org/) y npm. Vite 8 requiere Node.js **20.19+** o **22.12+**.
- Conexión a Internet para instalar dependencias y cargar los mapas y las imágenes externas.

Comprueba que Node.js y npm estén disponibles:

```bash
node --version
npm --version
```

## Instalación

Abre PowerShell, Terminal o una consola y clona el repositorio:

```bash
git clone https://github.com/Hinalador/desastres.git
cd desastres
```

Instala las dependencias del proyecto:

```bash
npm install
```

También puedes usar `npm ci` para instalar exactamente las versiones registradas en `package-lock.json` (por ejemplo, en una instalación limpia o en integración continua):

```bash
npm ci
```

Inicia el servidor local:

```bash
npm run dev
```

Vite mostrará una dirección local, normalmente `http://localhost:5173/`. Ábrela en el navegador. Para detener el servidor, vuelve a la terminal y presiona `Ctrl+C`.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo con recarga automática. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la compilación de `dist/` para revisarla antes de publicarla. Ejecuta primero `npm run build`. |

Para generar y probar la versión de producción:

```bash
npm run build
npm run preview
```

## Publicación en GitHub Pages

El sitio se compila con Vite y se publica desde `dist/` mediante el workflow [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). En el repositorio, configura **Settings → Pages → Build and deployment → Source** como **GitHub Actions**; no selecciones publicar directamente la raíz de una rama, porque allí están los archivos fuente, no el CSS y JavaScript compilados.

El workflow instala las dependencias con `npm ci`, ejecuta `npm run build` y publica el resultado. Se ejecuta al hacer `push` a `main`, `master` o `pintuco`, y también se puede iniciar manualmente desde la pestaña **Actions**. La base `/desastres/` en `vite.config.js` configura las rutas de recursos para la URL de GitHub Pages de este repositorio.

## Estructura del proyecto

```text
desastres/
├── index.html              # Inicio, carrusel, tarjetas y casos históricos
├── pages/
│   ├── about.html          # Acerca del proyecto y guía de prevención
│   └── contactus.html      # Formulario demostrativo y mapa
├── src/
│   ├── contact-map.js      # Mapa, búsqueda, geolocalización y coordenadas
│   ├── main.js             # Tema, menú, carrusel, tarjetas y diálogos
│   ├── style.css           # Tailwind y estilos compartidos
│   └── Img/                # Logotipo e imágenes locales, incluida la animación
├── .github/workflows/
│   └── deploy.yml          # Compilación y publicación en GitHub Pages
├── .github/skills/
│   └── guia-de-estilo-desastres/
│       └── SKILL.md        # Instrucciones de estilo para Copilot
├── docs/
│   └── GUIA_DE_ESTILO.md   # Tokens, tipografía y patrones visuales
├── package.json            # Dependencias y comandos npm
├── package-lock.json       # Versiones fijadas de dependencias
└── vite.config.js          # Entradas multipágina y ruta base de Pages
```

## APIs, mapas, ubicación e imágenes

- El proyecto **no tiene una API propia ni backend**. El formulario es una demostración y no envía ni almacena reportes.
- **Nominatim:** `src/contact-map.js` usa `GET https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=...` para buscar lugares y `GET https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=...&lon=...` para obtener una dirección aproximada. Lee `lat`, `lon` y `display_name` de la respuesta. El texto de búsqueda y las coordenadas usadas para geocodificar se comparten con Nominatim.
- **OpenStreetMap:** Leaflet carga teselas de `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`; se mantiene la atribución visible del mapa.
- **Geolocation API del navegador:** `navigator.geolocation.getCurrentPosition()` solo se usa tras solicitar la ubicación y obtener permiso. Requiere `localhost` durante desarrollo o HTTPS en producción.
- Al seleccionar un punto, la interfaz también ofrece un enlace externo a Google Maps; no es un endpoint propio.
- Las imágenes de los casos históricos se sirven desde Wikimedia Commons. Los créditos y enlaces de las imágenes se muestran junto a cada imagen en el sitio.

## Limitaciones conocidas

- El formulario HTML no está conectado a una API o servidor. En su estado actual, enviar el formulario no entrega el reporte a un equipo ni lo almacena.
- El botón de ubicación actual depende de los permisos y las capacidades del navegador y del dispositivo.
- Las imágenes y servicios de mapas dependen de terceros; podrían no cargarse si no hay conexión, si el servicio está temporalmente indisponible o si una red los bloquea.

## Solución de problemas

### Vite no puede resolver una dependencia, por ejemplo `leaflet`

Desde la carpeta del proyecto, instala las dependencias y reinicia el servidor:

```bash
npm install
npm run dev
```

### `npm` o `node` no se reconoce como comando

Instala Node.js desde [nodejs.org](https://nodejs.org/), cierra y vuelve a abrir la terminal, y comprueba `node --version` y `npm --version`.

### El puerto de desarrollo ya está ocupado

Vite puede ofrecer otro puerto automáticamente. Usa la dirección que aparece en la terminal, o detén el proceso que está utilizando el puerto y vuelve a ejecutar `npm run dev`.

### No aparece el mapa o no funciona la ubicación

Comprueba la conexión a Internet. Para la ubicación, permite el acceso cuando el navegador lo solicite; en un sitio publicado, utiliza HTTPS. La búsqueda de lugares y las direcciones aproximadas también necesitan acceso a Nominatim.

### El sitio publicado aparece sin estilos o scripts

Comprueba que **Settings → Pages → Build and deployment → Source** esté configurado como **GitHub Actions** y que la última ejecución del workflow haya terminado correctamente. La salida que se publica debe ser `dist/`, no la raíz del repositorio.
