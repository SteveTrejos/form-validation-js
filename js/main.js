const form = document.querySelector('form');
const btnEnviar = document.querySelector('button');

function filtrarCampos(campos){
    if ( !campos ) return;
    try{
        const keys = Object.keys(campos);
        const llavesFiltradas = keys.filter(key => !/^\d/.test(key));
        return llavesFiltradas;
    }catch(err){
        console.error(err);
    }
}

function mapearCampos(llaves, valores){
    if ( !llaves || !valores ) return;
    try{
        let camposMapeados = {};
        for ( let llave of llaves ) {
            camposMapeados[llave] = valores[llave].value;
        }
        return camposMapeados;
    } catch(err){
        console.error(err);
    }
}

function validarCampoNombre(nombre){
    if ( nombre === undefined || nombre.length === 0 ) return false;
    try{
        const regex = /^[a-zA-Z\s]+$/;
        if ( !regex.test(nombre) ) return false;
        return true;
    }catch(err){
        console.error(err)
    }
}

function validarCampoEmail(email) {
    if ( email.length === 0 ) return false;
    try{
        const regexEmail = /^[^\s@]+@[^\s@]+(\.[^\s@]+)+$/;
        return regexEmail.test(email);
    }catch(err){
        console.error(err);
    }
}

function validarCampoMensaje(mensaje){
    if ( mensaje.length === 0 || mensaje.length < 10 ) return false;
    return true;
}

function crearMensajeError(mensaje) {
    if (!mensaje) return;
    
     const campos = [...form.elements].filter(el => ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName));
     const campoError = campos[campos.length - 1];

    let elementoError = campoError.nextElementSibling;
    if (!elementoError || elementoError.tagName !== 'SPAN') {
        elementoError = document.createElement('span');
        campoError.insertAdjacentElement('afterend', elementoError);
    }
    
    elementoError.textContent = mensaje;
    elementoError.style.fontFamily = 'Poppins';
    elementoError.style.color = 'red';
    elementoError.style.textAlign = 'center';
    elementoError.style.display = 'block';
}

function obtenerCamposForm(form){
    if ( !form ) return
    try{
        return Object.keys(form.elements);
    }catch(err){
        console.error(err);
    }
}

function limpiarValorCampo(form, campoALimpiar){
    form.elements[campoALimpiar].value = '';
}

function limpiarMensajeError(){
    try{
        const elementoError = document.querySelector('span');
        elementoError.textContent = '';
    }catch(err){
        console.error(err);
    }
}

function inicializarFormulario() {
    if (!form || !btnEnviar) return; // Evita errores si no se encuentra el formulario en Jest

    const camposFiltrados = filtrarCampos(form.elements);

    btnEnviar.addEventListener('click', (e) => {
        e.preventDefault();
        limpiarMensajeError();

        const values = mapearCampos(camposFiltrados, form.elements);
        const { nombre, email, mensaje } = values;

        if (!validarCampoNombre(nombre)) {
            crearMensajeError('El nombre no debe estar vacío y debe contener solo letras');
            limpiarValorCampo(form, 'nombre');
            return;
        }

        if (!validarCampoEmail(email)) {
            crearMensajeError('Formato de email incorrecto');
            limpiarValorCampo(form, 'email');
            return;
        }

        if (!validarCampoMensaje(mensaje)) {
            crearMensajeError('El mensaje debe contener al menos 10 caracteres');
            limpiarValorCampo(form, 'mensaje');
            return;
        }

        limpiarMensajeError();
        alert('Se han enviado los datos correctamente');
        form.reset();
    });
}

// Solo ejecutar en el navegador
if (typeof window !== "undefined") {
    inicializarFormulario();
}

export default {
            filtrarCampos, 
            mapearCampos, 
            validarCampoNombre, 
            validarCampoEmail, 
            validarCampoMensaje, 
            crearMensajeError, 
            obtenerCamposForm,
            limpiarValorCampo,
            limpiarMensajeError
        }