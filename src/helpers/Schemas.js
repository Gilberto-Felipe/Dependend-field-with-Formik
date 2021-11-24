import * as yup from 'yup';

export const schema = yup.object().shape({
    fechaNacimiento: yup.string().required("La fecha de nacimiento es un campo requerido."),
    edad: yup.number().min(1, "La edad debe ser mayor o igual a uno").required("Edad es un campo requerido."),
    nombre: yup.string().required("El nombre es requerido.")
});

export const calcularEdad = (fechaNacimiento) => {
    let fechaN = new Date(fechaNacimiento);
    let hoy = new Date();
    let diff = hoy - fechaN; // This is the difference in milliseconds
    let resultado = Math.floor(diff / 31557600000); // Divide by 1000*60*60*24*365.25
    //console.log(resultado)
    return resultado;
}