const themeToggle = document.querySelector('#theme-toggle')
const themeIcon = document.querySelector('#theme-icon')

if (!(themeToggle instanceof HTMLButtonElement) || !(themeIcon instanceof HTMLSpanElement)) {
  throw new Error('No se encontraron los elementos del botón de tema.')
}

const savedTheme = localStorage.getItem('theme')
let isDarkMode = savedTheme === 'dark' ||
  (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches)

const updateTheme = () => {
  document.documentElement.classList.toggle('dark', isDarkMode)
  themeToggle.setAttribute('aria-pressed', String(isDarkMode))
  themeToggle.setAttribute('aria-label', `Cambiar al modo ${isDarkMode ? 'claro' : 'oscuro'}`)
  themeIcon.textContent = isDarkMode ? '☀' : '☾'
}

updateTheme()

themeToggle.addEventListener('click', () => {
  isDarkMode = !isDarkMode
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  updateTheme()
})

const heroCarousel = document.querySelector('#hero-carousel')

if (heroCarousel instanceof HTMLElement) {
  const slides = Array.from(heroCarousel.querySelectorAll('.hero-slide'))
  const slideButtons = Array.from(heroCarousel.querySelectorAll('[data-carousel-slide]'))
  const previousButton = heroCarousel.querySelector('[data-carousel-prev]')
  const nextButton = heroCarousel.querySelector('[data-carousel-next]')
  const carouselInterval = 4000
  let activeSlide = 0

  const showSlide = (index) => {
    activeSlide = (index + slides.length) % slides.length

    slides.forEach((slide, slideIndex) => {
      slide.setAttribute('aria-hidden', String(slideIndex !== activeSlide))
    })

    slideButtons.forEach((button, slideIndex) => {
      button.setAttribute('aria-current', String(slideIndex === activeSlide))
    })
  }

  window.setInterval(() => showSlide(activeSlide + 1), carouselInterval)

  if (previousButton instanceof HTMLButtonElement && nextButton instanceof HTMLButtonElement) {
    previousButton.addEventListener('click', () => showSlide(activeSlide - 1))
    nextButton.addEventListener('click', () => showSlide(activeSlide + 1))
  }

  slideButtons.forEach((button, slideIndex) => {
    button.addEventListener('click', () => showSlide(slideIndex))
  })

  heroCarousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      showSlide(activeSlide - 1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      showSlide(activeSlide + 1)
    }
  })
}

document.querySelectorAll('.flip-card').forEach((card) => {
  if (!(card instanceof HTMLButtonElement)) {
    throw new Error('Se encontró una tarjeta informativa que no es un botón.')
  }

  card.addEventListener('click', () => {
    card.setAttribute('aria-pressed', String(card.getAttribute('aria-pressed') !== 'true'))
  })
})

const openModalButton = document.querySelector('#open-modal')
const tipsModal = document.querySelector('#tips-modal')

if (openModalButton instanceof HTMLButtonElement && tipsModal instanceof HTMLDialogElement) {
  openModalButton.addEventListener('click', () => {
    tipsModal.showModal()
  })

  tipsModal.addEventListener('click', (event) => {
    if (event.target === tipsModal) {
      tipsModal.close()
    }
  })
}