const form = document.forms.loginForm
// const form = document.getElementById('loginForm')

const errorMsgTemplate = {
    empty: {
        EMAIL: 'Email cannot be empty!',
        PASSWORD: 'Password cannot be empty!'
    },
    invalid: {
        EMAIL: 'Email should be in valid format.',
        PASSWORD: 'Password is invalid! it should have any one of @- and atleast 8 characters, atleast 1 capital letter, atleast 1 small letter and atleast 1 number'
    },
    length: {
        PASSWORD: 'Password should be in range 8 to 15 characters.'
    }
}


// ES6 arrow shorthand function
const createNode = (nodeName) => document.createElement(nodeName)

const createInputError = (fieldType, fieldError) => {
    const errorDiv = createNode('div')
    errorDiv.className = 'error-msg' // setAttribute()

    const textNode = document.createTextNode(fieldError) // errorDiv.textContent = fieldError

    errorDiv.append(textNode)

    form[fieldType].parentElement.after(errorDiv)
}

const getErrorMessage = (errorType, fieldType) => {
    // usually not encouraged! 
    // modifying the arguments directly
    fieldType = fieldType.toUpperCase()
    // proper way would be to use another variable

    return errorMsgTemplate[errorType][fieldType]
}

function handleLoginFormSubmit(event) {
    console.log('Submitting login form ')
    event.preventDefault()

    const emailVal = form.email.value.trim()
    const passwordVal = form.password.value.trim()

    console.log({ emailVal, passwordVal })

    // Email empty validation
    const isEmailErr = emptyValidations(emailVal, 'email')

    // Password empty validation
    let isPasswordErr = emptyValidations(passwordVal, 'password')

    if (isEmailErr || isPasswordErr) {
        return false
    }

    isPasswordErr = lengthValidation(passwordVal, 'password')

    if (isPasswordErr) return false


}

function lengthValidation(fieldValue, fieldType) {
    if (fieldType === 'password' && (fieldValue.length < 8 || fieldValue.length > 15)) {
        const fieldError = getErrorMessage('length', fieldType)

        createInputError(fieldType, fieldError)

        return true
    }

    return false
}


function emptyValidations(fieldValue, fieldType) {
    let isError = false

    if (fieldValue.trim().length === 0) {
        const fieldError = getErrorMessage('empty', fieldType)
        console.error(fieldError)

        createInputError(fieldType, fieldError)

        isError = true
    }

    // LOGIC1
    if (form[fieldType].getAttribute('isOnChangeListener') !== true) {
        form[fieldType].addEventListener('keydown', handleFieldOnChange)
        form[fieldType].setAttribute('isEventListenerPresent', true)
    }

    return isError
}

function handleFieldOnChange(event) {
    console.log('handleFieldOnChange  called', event.target)
    const targetField = event.target
    // targetField.parentElement.nextElementSibling -> error div

    if (targetField.parentElement.nextElementSibling) {
        targetField.parentElement.nextElementSibling.remove()
    }
}

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};
debugger
form.addEventListener('input', debounce(function (event) {
    switch (event.target.passwordFiled) {

        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
    }
}));

// debugger
form.addEventListener('submit', handleLoginFormSubmit)
