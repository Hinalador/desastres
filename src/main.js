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

const navigationToggle = document.querySelector('#navigation-toggle')
const navigationIcon = document.querySelector('#navigation-icon')
const primaryNavigation = document.querySelector('#primary-navigation')

if (
  navigationToggle instanceof HTMLButtonElement &&
  navigationIcon instanceof HTMLSpanElement &&
  primaryNavigation instanceof HTMLElement
) {
  const setNavigationOpen = (isOpen) => {
    navigationToggle.setAttribute('aria-expanded', String(isOpen))
    navigationToggle.setAttribute('aria-label', `${isOpen ? 'Cerrar' : 'Abrir'} menú de navegación`)
    navigationIcon.textContent = isOpen ? '×' : '☰'
    primaryNavigation.classList.toggle('hidden', !isOpen)
  }

  navigationToggle.addEventListener('click', () => {
    setNavigationOpen(navigationToggle.getAttribute('aria-expanded') !== 'true')
  })

  primaryNavigation.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      setNavigationOpen(false)
    }
  })
}

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

const preventionOpenButton = document.querySelector('#prevention-open')
const preventionDialog = document.querySelector('#prevention-dialog')

if (preventionOpenButton instanceof HTMLButtonElement && preventionDialog instanceof HTMLDialogElement) {
  const preventionCloseButton = preventionDialog.querySelector('#prevention-close')
  const previousButton = preventionDialog.querySelector('#prevention-previous')
  const nextButton = preventionDialog.querySelector('#prevention-next')
  const stepPanels = Array.from(preventionDialog.querySelectorAll('[data-prevention-panel]'))
  const stepButtons = Array.from(preventionDialog.querySelectorAll('[data-prevention-jump]'))
  const progressLabel = preventionDialog.querySelector('#prevention-progress-label')
  const progressBar = preventionDialog.querySelector('#prevention-progress')

  if (
    !(preventionCloseButton instanceof HTMLButtonElement) ||
    !(previousButton instanceof HTMLButtonElement) ||
    !(nextButton instanceof HTMLButtonElement) ||
    !(progressLabel instanceof HTMLParagraphElement) ||
    !(progressBar instanceof HTMLDivElement) ||
    stepPanels.length === 0 ||
    stepButtons.length !== stepPanels.length
  ) {
    throw new Error('No se encontraron todos los controles de la guía de prevención.')
  }

  let activeStep = 0

  const showStep = (step) => {
    activeStep = Math.max(0, Math.min(step, stepPanels.length - 1))

    stepPanels.forEach((panel, index) => {
      panel.hidden = index !== activeStep
      panel.classList.toggle('hidden', index !== activeStep)
    })

    stepButtons.forEach((button, index) => {
      if (!(button instanceof HTMLButtonElement)) {
        throw new Error('Se encontró un control de paso que no es un botón.')
      }

      if (index === activeStep) {
        button.setAttribute('aria-current', 'step')
      } else {
        button.removeAttribute('aria-current')
      }
    })

    progressLabel.textContent = `Paso ${activeStep + 1} de ${stepPanels.length}`
    progressBar.style.width = `${((activeStep + 1) / stepPanels.length) * 100}%`
    previousButton.disabled = activeStep === 0
    nextButton.textContent = activeStep === stepPanels.length - 1 ? 'Terminar' : 'Siguiente'
  }

  const openPreventionDialog = () => {
    showStep(0)
    if (!preventionDialog.open) {
      preventionDialog.showModal()
    }
  }

  preventionOpenButton.addEventListener('click', openPreventionDialog)
  preventionCloseButton.addEventListener('click', () => preventionDialog.close())
  previousButton.addEventListener('click', () => showStep(activeStep - 1))
  nextButton.addEventListener('click', () => {
    if (activeStep === stepPanels.length - 1) {
      preventionDialog.close()
      return
    }

    showStep(activeStep + 1)
  })

  stepButtons.forEach((button, index) => {
    button.addEventListener('click', () => showStep(index))
  })

  preventionDialog.addEventListener('click', (event) => {
    if (event.target === preventionDialog) {
      preventionDialog.close()
    }
  })

  const openFromHash = () => {
    if (window.location.hash === '#prevencion') {
      openPreventionDialog()
    }
  }

  window.addEventListener('hashchange', openFromHash)
  openFromHash()
}