import { injectStyle } from '../js/ui.js'

// -------------------------------
// Globals
// -------------------------------

const css = `
.form-horizontal-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.form-horizontal-wrapper button {
  margin-left: 20px;
}
.form-horizontal-wrapper button:disabled {
  cursor: not-allowed;
  pointer-events: none;
}
.form-horizontal-wrapper .form-horizontal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  width: 100%;
}
.form-horizontal-wrapper .input-group {
  width: 100%;
  display: flex;
  align-items: center;
}  
.form-horizontal-wrapper .input-group i {
  padding-left: 0;  
}
.form-horizontal-wrapper .form-horizontal input {
  margin: 0;
  width: 100%;
}
.form-horizontal-wrapper .message {
  padding: 10px;
  font-size: 0.75rem;
}
`

const html = `
  <form class="form-horizontal">
      <div class="input-group">
        <i class="fa-solid"></i>
        <input  />
      </div>
      <button class="primary hidden" type="submit"></button>
  </form>
  <span class="message"></span>
`

// -------------------------------
// Exported functions
// -------------------------------

export function createFormHorizontal(config) {
  injectStyle(css)
  return createElement(config)
}

// -------------------------------
// Helpers
// -------------------------------

/**
 *
 */
function createElement({
  formId,
  inputType,
  inputName,
  inputPlaceholder,
  inputAutoComplete,
  iClass,
  submitText,
  value,
  disabled = false,
  events,
}) {
  const wrapperEl = document.createElement('div')
  wrapperEl.className = 'form-horizontal-wrapper'
  wrapperEl.innerHTML = html

  const formEl = wrapperEl.querySelector('form')
  formEl.classList.add('form-horizontal')
  if (formId) {
    formEl.dataset.id = formId
  }

  const inputEl = formEl.querySelector('input')
  inputEl.type = inputType
  inputEl.name = inputName
  inputEl.placeholder = inputPlaceholder
  inputEl.dataset.testId = `${formId}-input` // cypress
  if (inputAutoComplete) {
    inputEl.autocomplete = inputAutoComplete
  }
  if (value) {
    inputEl.value = value
  }

  const iEl = formEl.querySelector('i')
  iEl.classList.add(iClass)

  const submitEl = formEl.querySelector('[type="submit"]')
  if (submitText) {
    submitEl.classList.remove('hidden')
    submitEl.textContent = submitText
    submitEl.dataset.testId = `${formId}-submit` //cypress
  }

  if (disabled) {
    submitEl.disabled = true
  }

  if (events) {
    for (const [k, v] of Object.entries(events)) {
      if (k === 'submit') {
        formEl.addEventListener('submit', (e) => {
          if (!submitEl.disabled) {
            v(e)
          }
        })
      } else {
        formEl.addEventListener(k, v)
      }
    }
  }

  wrapperEl.disable = disable.bind(wrapperEl)
  wrapperEl.enable = enable.bind(wrapperEl)
  wrapperEl.getValue = getValue.bind(wrapperEl)
  wrapperEl.message = message.bind(wrapperEl)
  wrapperEl.setSubmit = setSubmit.bind(wrapperEl)
  wrapperEl.setValue = setValue.bind(wrapperEl)

  Object.defineProperty(wrapperEl, 'message', {
    get() {
      return wrapperEl.querySelector('.message').textContent
    },
    set(message) {
      wrapperEl.querySelector('.message').textContent = message
    },
  })

  Object.defineProperty(wrapperEl, 'value', {
    get() {
      return wrapperEl.querySelector('input').value
    },
    set(value) {
      wrapperEl.querySelector('input').value = value
    },
  })

  return wrapperEl
}

// -------------------------------
// Element methods
// -------------------------------

/**
 *
 */
function disable() {
  this.querySelector('button')?.setAttribute('disabled', 'true')
}

/**
 *
 */
function enable() {
  this.querySelector('button')?.removeAttribute('disabled')
}

/**
 *
 */
function getValue() {
  return this.querySelector('input').value
}

/**
 *
 */
function message(msg) {
  this.querySelector('.message').textContent = msg
}

/**
 *
 */
function setSubmit({ text } = {}) {
  this.querySelector('button').textContent = text
}

/**
 *
 */
function setValue(value) {
  return (this.querySelector('input').value = value)
}
