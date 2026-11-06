# Desastres Naturales

Sitio web informativo en español para aprender sobre fenómenos naturales, conocer ejemplos históricos y registrar un reporte de manera informativa. La interfaz está diseñada con enfoque **mobile-first**, se adapta a móviles, tabletas y escritorio, y ofrece tema claro y oscuro.

> **Importante:** el formulario de reporte es actualmente una interfaz de demostración. No envía ni guarda los datos. Si ocurre una emergencia real, contacta primero a los servicios de emergencia de tu zona.

## Contenido

- [Funciones](#funciones)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Comandos disponibles](#comandos-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Mapas, ubicación e imágenes](#mapas-ubicación-e-imágenes)
- [Limitaciones conocidas](#limitaciones-conocidas)
- [Solución de problemas](#solución-de-problemas)

## Funciones

- Página principal con introducción y guías breves sobre terremotos, inundaciones y tsunamis, incendios forestales y erupciones volcánicas.
- Tarjetas informativas interactivas y navegación por temas.
- Casos históricos ilustrados: tsunami de Japón de 2011, terremoto de San Francisco de 1906 y erupción del Tambora de 1815.
- Formulario para describir un evento, su fecha, hora, ubicación, afectación y datos de contacto.
- Mapa interactivo para buscar un lugar, seleccionar coordenadas o solicitar la ubicación actual del dispositivo.
- Tema claro/oscuro que recuerda la preferencia del usuario en el navegador.
- Diseño responsive y accesible, con controles de teclado, etiquetas y estados legibles por tecnologías de asistencia.

## Tecnologías

- [Vite](https://vite.dev/) para el servidor de desarrollo y la compilación.
- [Tailwind CSS 4](https://tailwindcss.com/) para los estilos.
- [Leaflet](https://leafletjs.com/) para el mapa interactivo.
- [OpenStreetMap](https://www.openstreetmap.org/) para las imágenes de mapa y [Nominatim](https://nominatim.org/) para la búsqueda de lugares y direcciones aproximadas.
- HTML, CSS y JavaScript en módulos ES.

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

## Estructura del proyecto

```text
desastres/
├── index.html              # Página principal
├── pages/
│   └── contactus.html      # Formulario de reporte
├── src/
│   ├── contact-map.js      # Mapa, búsqueda y selección de ubicación
│   ├── main.js             # Tema, tarjetas y diálogos
│   ├── style.css           # Tailwind y estilos compartidos
│   └── Img/                # Logotipo e imágenes locales
├── package.json            # Dependencias y comandos npm
├── package-lock.json       # Versiones fijadas de dependencias
└── vite.config.js          # Configuración de Vite y páginas de entrada
```

## Mapas, ubicación e imágenes

- El mapa muestra cartografía de OpenStreetMap y requiere conexión a Internet.
- La búsqueda y la consulta de direcciones aproximadas usan Nominatim. Las consultas de búsqueda y las coordenadas enviadas para obtener una dirección se comparten con ese servicio.
- El navegador solo comparte la ubicación actual si el usuario lo permite. La geolocalización normalmente requiere `localhost` durante el desarrollo o un sitio publicado mediante HTTPS.
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
