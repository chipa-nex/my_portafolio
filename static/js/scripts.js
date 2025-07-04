document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const errorMessage = document.getElementById('submitErrorMessage');

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');

    // Toast de éxito Bootstrap
    const successToastEl = document.getElementById('submitSuccessToast');
    const successToast = new bootstrap.Toast(successToastEl);

    // Limitar la entrada de teléfono a solo números y un '+' al inicio
    phone.addEventListener('input', function(event) {
        const input = this;
        let value = input.value;

        // Guardar posición actual del cursor
        let selectionStart = input.selectionStart;

        // Filtrar el valor permitiendo solo números y un '+' al inicio
        let filtered = value
            .replace(/[^0-9+]/g, '') // elimina todo excepto números y '+'
            .replace(/(?!^)\+/g, ''); // elimina '+' que no está al inicio

        if (filtered !== value) {
            input.value = filtered;

            // Ajustar la posición del cursor
            if (selectionStart > filtered.length) {
                selectionStart = filtered.length;
            }
            input.setSelectionRange(selectionStart, selectionStart);
        }
        updateSubmitButton();
    });

    // Prevenir que se escriban números o símbolos en el campo nombre
    name.addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        updateSubmitButton();
    });

    email.addEventListener('input', updateSubmitButton);
    message.addEventListener('input', updateSubmitButton);

    // Inicialmente botón deshabilitado
    submitButton.classList.add('disabled');
    submitButton.disabled = true;

    // Función que valida el formulario para activar el botón
    function checkFormValidity() {
        const nameVal = name.value.trim();
        const emailVal = email.value.trim();
        const phoneVal = phone.value.trim();
        const messageVal = message.value.trim();

        const isNameValid = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nameVal) && nameVal !== '';
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
        const isPhoneValid = /^\+?[0-9]+$/.test(phoneVal) && phoneVal !== '';
        const isMessageValid = messageVal !== '';

        return isNameValid && isEmailValid && isPhoneValid && isMessageValid;
    }

    function updateSubmitButton() {
        if (checkFormValidity()) {
            submitButton.classList.remove('disabled');
            submitButton.disabled = false;
        } else {
            submitButton.classList.add('disabled');
            submitButton.disabled = true;
        }
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío por defecto

        // Ocultar mensajes anteriores
        errorMessage.classList.add('d-none');

        let isValid = true;

        // Validación de nombre
        if (!name.value.trim()) {
            showError(name, "Se requiere un nombre.");
            isValid = false;
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name.value.trim())) {
            showError(name, "El nombre solo debe contener letras.");
            isValid = false;
        } else {
            hideError(name);
        }

        // Validación de email
        if (!email.value.trim()) {
            showError(email, "Se requiere un correo electrónico.");
            isValid = false;
        } else if (!validateEmail(email.value)) {
            showError(email, "El correo electrónico no es válido.");
            isValid = false;
        } else {
            hideError(email);
        }

        // Validación de teléfono
        if (!phone.value.trim()) {
            showError(phone, "Se requiere un número de teléfono.");
            isValid = false;
        } else if (!/^\+?[0-9]+$/.test(phone.value.trim())) {
            showError(phone, "Número de teléfono inválido.");
            isValid = false;
        } else {
            hideError(phone);
        }

        // Validación de mensaje
        if (!message.value.trim()) {
            showError(message, "Se requiere un mensaje.");
            isValid = false;
        } else {
            hideError(message);
        }

        if (isValid) {
            // Enviar con EmailJS
            const templateParams = {
                name: name.value,
                email: email.value,
                phone: phone.value,
                message: message.value
            };

            //emailjs.send('TU_SERVICE_ID', 'TU_TEMPLATE_ID', templateParams)
            emailjs.send('service_9qtlmdb', 'template_aogbvul', templateParams)
                .then(function(response) {
                    // Mostrar toast de éxito
                    successToast.show();
                    form.reset(); // Limpiar formulario
                    updateSubmitButton(); // Desactivar botón nuevamente
                }, function(error) {
                    console.error('❌ Error al enviar el mensaje:', error);
                    console.error('Error al enviar el mensaje:', error);
                    errorMessage.classList.remove('d-none');
                });
        } else {
            errorMessage.classList.remove('d-none');
        }
    });


    // Mostrar mensaje de error
    function showError(input, message) {
        const feedback = input.parentElement.querySelector('.invalid-feedback');
        if (feedback) feedback.textContent = message;
        input.classList.add('is-invalid');
    }

    // Ocultar mensaje de error
    function hideError(input) {
        input.classList.remove('is-invalid');
    }

    // Validar formato de correo electrónico
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }
});
//ID de servicio
//service_9qtlmdb