// Report-an-error dialog wiring. Static prototype — submissions are acknowledged but not sent anywhere.

const dialog = document.getElementById('flag-dialog')
if (dialog) {
  const form = dialog.querySelector('.flag-form')
  const thanks = dialog.querySelector('.flag-thanks')
  const contextOut = dialog.querySelector('[data-flag-context-out]')

  const openFor = (label) => {
    contextOut.textContent = label || 'this information'
    form.hidden = false
    thanks.hidden = true
    form.reset()
    if (typeof dialog.showModal === 'function') {
      dialog.showModal()
    } else {
      dialog.setAttribute('open', '')
    }
  }

  document.querySelectorAll('.flag-link').forEach((btn) => {
    btn.addEventListener('click', () => openFor(btn.dataset.flagContext))
  })

  dialog.querySelectorAll('[data-flag-close]').forEach((btn) => {
    btn.addEventListener('click', () => dialog.close())
  })

  // Close on backdrop click.
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close()
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    form.hidden = true
    thanks.hidden = false
  })
}
