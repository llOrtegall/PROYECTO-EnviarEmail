document.addEventListener('DOMContentLoaded', function () {

    const email = {
        email: '',
        asunto: '',
        mensaje: '',
    }

    //seleccionar elemenetos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSumit = document.querySelector('#formulario button[type=submit]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spiner = document.querySelector('#spinnerhtml');

    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function (e) {
        e.preventDefault();

        resetForm()
    });
    // ------------------- - >> Start Funciones  << - --------------------------
    function enviarEmail(evt) {
        evt.preventDefault();
        spinnerhtml.classList.add('flex');
        spinnerhtml.classList.remove('hidden');

        setTimeout(() => {
            spinnerhtml.classList.remove('flex');
            spinnerhtml.classList.add('hidden');

            resetForm()

            //crear alerta de envio de email
            const alertExito = document.createElement('P');
            alertExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertExito.textContent='Mensaje Enviado Correctamente';

            formulario.appendChild(alertExito);

            setTimeout(() => {
                alertExito.remove();
            }, 1500);
        
        }, 3000);
    }

    function validar(evt) {

        if (evt.target.value.trim() === '') {
            mostraAlerta(`El campo ${evt.target.id} es obligatorio`, evt.target.parentElement);
            email[evt.target.name] = '';
            comprobarEmail();
            return;
        }

        if (evt.target.id === 'email' && !validarEmail(evt.target.value)) {
            mostraAlerta('El  email no es valido', evt.target.parentElement);
            email[evt.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(evt.target.parentElement);

        //asingar los valores 
        email[evt.target.name] = evt.target.value.trim().toLowerCase();

        //comprobar el objecto email
        comprobarEmail();
    }

    function mostraAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);

        // Generar Alert en html
        const error01 = document.createElement('P');
        error01.textContent = mensaje;
        error01.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center'); //telwin css
        //ShowError al formulario
        referencia.appendChild(error01); // usamos appenchild con el parametro 
        //referencia para poder mostar el error de bajo de cada campo
    }

    function limpiarAlerta(referencia) {
        //comnprueba si ya existe una Alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i; // expresion regular para el email
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {

        if (Object.values(email).includes('')) {
            btnSumit.classList.add('opacity-50');
            btnSumit.disable = true;
            btnSumit.removeAttribute('disabled');
            return;
        }

        btnSumit.classList.remove('opacity-50');
        btnSumit.disable = false;
    }
    function resetForm() {

        //reiniciar obecto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }
    // ------------------- - >> Fin Funciones << - ----------------------------
});