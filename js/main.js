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
    if ( !nombre ) return;
    try{
        const regex = /[a-zA-Z]/;
        if ( !nombre.length !== 0 || !regex.test(nombre) ) return false;
        return true;
    }catch(err){
        console.error(err)
    }
}

function validarCampoEmail(email){
    if ( !email ) return;
    try{
        const caracteresEmail = email.split('');
        if ( !caracteresEmail.includes('@') || !caracteresEmail.includes('.com') ) return false;
        return true;
    }catch(err){
        console.error(err);
    }
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
        console.log(elementoError, 'elemento error')
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
const values = mapearCampos(camposFiltrados, form.elements);
btnEnviar.addEventListener('click', (e) => {
    limpiarMensajeError();
    e.preventDefault();
    const { nombre, email } = values;
    let mensaje;
    const esNombreValido = validarCampoNombre(nombre);
    const esEmailInvalido = validarCampoEmail();
    if ( !esNombreValido ) {
        mensaje = 'El nombre no debe estar vacío y debe contener solo letras';
        crearMensajeError(mensaje);
        limpiarValorCampo(form, 'nombre')
        return;
    }else if ( !esEmailInvalido ) {
        mensaje = 'Formato de email incorrecto';
        crearMensajeError(mensaje);
        limpiarValorCampo(form, 'email');
    }

})