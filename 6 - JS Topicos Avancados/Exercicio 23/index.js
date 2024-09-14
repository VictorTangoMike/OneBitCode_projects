function validateEmail(email) {
    if (!email.match(/^[A-Za-z0-9_]{2,}@[A-Za-z0-9_]{2,}\.[A-Za-z0-9_]{2,}$/g)) {
        const err = new Error('Formato de email inválido.')
        err.input = 'email'
        throw err
    }
}

function validatePassword(password) {
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/g)) {
        const err = new Error('A senha não cumpre os requisitos de segurança.')
        err.input = 'password'
        throw err
    }
}

function resetFormStyles() {
    Object.entries(userInputs).forEach(([key, value]) => {
        value.classList.remove('success', 'error')
        document.querySelector(`#${key}-error`).textContent = ''
    })
}

const userInputs = {}

userInputs.name = document.querySelector('#name')
userInputs.email = document.querySelector('#email')
userInputs.password = document.querySelector('#password')

const form = document.querySelector('form')

form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    resetFormStyles()
    try {
        userInputs.name.classList.add('success')
        validateEmail(userInputs.email.value)
        userInputs.email.classList.add('success')
        validatePassword(userInputs.password.value)
        userInputs.password.classList.add('success')
    } catch (err) {
        userInputs[err.input].classList.add('error')
        document.querySelector(`#${err.input}-error`).textContent = err.message
    }
})