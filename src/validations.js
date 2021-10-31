
//Validación de errores
function crearMascotasValidation(data) {

    const { id, nombre, especie, genero, edad, fec_nac } = data;

    if (typeof nombre !== 'string') {
        throw new Error('El nombre debe ser una cadena de caracteres');
    }

    if (edad <= 0) {
        throw new Error('La edad debe ser mayor que 0');
    }

    if (edad >= 100) {
        throw new Error('La edad no puede ser mayor que 100');
    }
};

module.exports = {
    crearMascotasValidation,
};