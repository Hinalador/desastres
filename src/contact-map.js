import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapElement = document.querySelector('#report-map')
const searchInput = document.querySelector('#map-search')
const searchButton = document.querySelector('#search-location')
const currentLocationButton = document.querySelector('#use-current-location')
const locationInput = document.querySelector('#ubicacion')
const latitudeInput = document.querySelector('#latitud')
const longitudeInput = document.querySelector('#longitud')
const statusMessage = document.querySelector('#map-status')
const googleMapsLink = document.querySelector('#google-maps-link')

if (mapElement instanceof HTMLElement &&
    searchInput instanceof HTMLInputElement &&
    searchButton instanceof HTMLButtonElement &&
    currentLocationButton instanceof HTMLButtonElement &&
    locationInput instanceof HTMLInputElement &&
    latitudeInput instanceof HTMLInputElement &&
    longitudeInput instanceof HTMLInputElement &&
    statusMessage instanceof HTMLElement &&
    googleMapsLink instanceof HTMLAnchorElement) {
  const map = L.map(mapElement).setView([20, 0], 2)
  let selectedMarker

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map)

  const setSelection = (latitude, longitude, placeName) => {
    if (selectedMarker) {
      map.removeLayer(selectedMarker)
    }

    selectedMarker = L.circleMarker([latitude, longitude], {
      color: '#ffffff',
      fillColor: '#dc2626',
      fillOpacity: 1,
      radius: 9,
      weight: 3,
    }).addTo(map)

    latitudeInput.value = latitude.toFixed(6)
    longitudeInput.value = longitude.toFixed(6)
    googleMapsLink.href = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    googleMapsLink.hidden = false

    if (placeName) {
      locationInput.value = placeName
      statusMessage.textContent = `Punto seleccionado: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}.`
    } else {
      statusMessage.textContent = `Coordenadas seleccionadas: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}.`
    }
  }

  const reverseGeocode = async (latitude, longitude) => {
    statusMessage.textContent = 'Buscando la dirección aproximada...'

    try {
      const query = new URLSearchParams({
        format: 'jsonv2',
        lat: String(latitude),
        lon: String(longitude),
      })
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${query}`)

      if (!response.ok) {
        throw new Error('No se pudo consultar la dirección.')
      }

      const place = await response.json()
      setSelection(latitude, longitude, place.display_name)
    } catch {
      setSelection(latitude, longitude)
      statusMessage.textContent = 'Punto marcado. Escribe una dirección o referencia cercana.'
    }
  }

  const searchPlace = async () => {
    const queryText = searchInput.value.trim()

    if (!queryText) {
      statusMessage.textContent = 'Escribe una dirección o lugar para buscar.'
      searchInput.focus()
      return
    }

    statusMessage.textContent = 'Buscando lugar...'

    try {
      const query = new URLSearchParams({
        format: 'jsonv2',
        limit: '1',
        q: queryText,
      })
      const response = await fetch(`https://nominatim.openstreetmap.org/search?${query}`)

      if (!response.ok) {
        throw new Error('No se pudo completar la búsqueda.')
      }

      const [place] = await response.json()

      if (!place) {
        statusMessage.textContent = 'No encontramos ese lugar. Prueba con otra dirección o márcalo en el mapa.'
        return
      }

      const latitude = Number(place.lat)
      const longitude = Number(place.lon)
      map.setView([latitude, longitude], 15)
      setSelection(latitude, longitude, place.display_name)
    } catch {
      statusMessage.textContent = 'No pudimos buscar el lugar. Puedes marcarlo directamente en el mapa.'
    }
  }

  map.on('click', ({ latlng }) => {
    setSelection(latlng.lat, latlng.lng)
    void reverseGeocode(latlng.lat, latlng.lng)
  })

  searchButton.addEventListener('click', () => {
    void searchPlace()
  })

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      void searchPlace()
    }
  })

  currentLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
      statusMessage.textContent = 'Este navegador no permite consultar la ubicación actual.'
      return
    }

    statusMessage.textContent = 'Solicitando tu ubicación...'
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      map.setView([coords.latitude, coords.longitude], 15)
      setSelection(coords.latitude, coords.longitude)
      void reverseGeocode(coords.latitude, coords.longitude)
    }, () => {
      statusMessage.textContent = 'No pudimos obtener tu ubicación. Busca un lugar o marca el mapa manualmente.'
    }, { enableHighAccuracy: true, timeout: 10000 })
  })
}