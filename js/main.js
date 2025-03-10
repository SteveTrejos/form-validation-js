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
        const regex = /^[a-zA-Z]+$/;
        if ( !regex.test(nombre) ) return false;
        return true;
    }catch(err){
        console.error(err)
    }
}

function validarCampoEmail(email){
    if ( email === undefined ) return;
    try{
        let contadorPuntos = 0;
        let contadorArrobas = 0;
        const caracteresEmail = email.split('');
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if ( !regexEmail.test(email) ) return false;
        for( char of caracteresEmail ) {
            if ( char === '.' ) contadorPuntos ++;
            if ( char === '@' ) contadorArrobas ++;
            if ( contadorArrobas > 1 || contadorPuntos > 1 ) return false;
        }
        return true;
    }catch(err){
        console.error(err);
    }
}

function validarCampoMensaje(mensaje){
    if ( mensaje.length === 0 || mensaje.length < 10 ) return false;
    return true;
}

function crearMensajeError(mensaje){
    if ( mensaje.length === 0) return;
    try{
        const elementoError = document.querySelector('span');
        elementoError.textContent = mensaje;
        elementoError.style.fontFamily = 'Poppins';
        elementoError.style.color = 'red';
        elementoError.style.textAlign = 'center';
        elementoError.style.display = 'inline';
    }catch(err){
        console.error(err);
    }
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

const camposFiltrados = filtrarCampos(form.elements);

btnEnviar.addEventListener('click', (e) => {
    const values = mapearCampos(camposFiltrados, form.elements);
    limpiarMensajeError();
    e.preventDefault();
    const { nombre, email, mensaje } = values;
    let mensajeError;
    const esNombreValido = validarCampoNombre(nombre);
    const esEmailValido = validarCampoEmail(email);
    const esMensajeValido = validarCampoMensaje(mensaje);
    if ( !esNombreValido ) {
        mensajeError = 'El nombre no debe estar vacío y debe contener solo letras';
        crearMensajeError(mensajeError);
        limpiarValorCampo(form, 'nombre');
        return;
    }else if ( !esEmailValido ) {
        mensajeError = 'Formato de email incorrecto';
        crearMensajeError(mensajeError);
        limpiarValorCampo(form, 'email');
        return;
    }else if( !esMensajeValido ) {
        mensajeError = 'El mensaje debe contener al menos 10 caracteres'
        crearMensajeError(mensajeError);
        limpiarValorCampo(form, 'mensaje');
        return;
    }else if( esNombreValido && esEmailValido && esMensajeValido ) {
        limpiarMensajeError();
        alert('Se han enviado los datos correctamente');
        return;
    }

})