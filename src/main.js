import './style.css'

const themeToggle = document.querySelector('#theme-toggle')
const themeIcon = document.querySelector('#theme-icon')
const themeLabel = document.querySelector('#theme-label')

if (!(themeToggle instanceof HTMLButtonElement) ||
    !(themeIcon instanceof HTMLSpanElement) ||
    !(themeLabel instanceof HTMLSpanElement)) {
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
  themeLabel.textContent = `Modo ${isDarkMode ? 'claro' : 'oscuro'}`
}

updateTheme()

themeToggle.addEventListener('click', () => {
  isDarkMode = !isDarkMode
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  updateTheme()
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