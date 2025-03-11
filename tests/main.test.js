/**
 * @jest-environment jsdom
 */
import funciones from '../js/main'
const { filtrarCampos } = funciones;

test('Devuelve los nombres de campos que no empiezan con números', () => {
    const fakeElements = {
        nombre: {},
        apellido: {},
        "1edad": {},
        "2direccion": {}
    };

    const resultado = filtrarCampos(fakeElements);

    expect(resultado).toEqual(["nombre", "apellido"]);
});