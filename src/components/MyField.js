import React, { useEffect } from 'react';
import { useField, useFormikContext } from 'formik';

const MyField = (props) => {

    // useFormik es un hook personalizado de Formik que retorna el stado de Formik y sus helpers, por React Context padre (el componente Formik que incluye un React Context)
    const {
        values: { fechaNacimiento },
        touched,
        setFieldValue,
    } = useFormikContext();

    /* SetFieldValue 
    Establece el valor imperativamente. El campo debe coicidir con la llave del valor que quieres actualizar. 
    Sierve para crear manejadores de cambio de input personalizados.
    Llamarlos dispara la validacion si validateOnChange es true (por defecto lo esta).
    */

    // es un hook personalizado que enlaza automaticamente los inputs a Formik
    const [field, meta] = useField(props);

    // Funcion que calcula la edad
    const calcularEdad = (fechaNacimiento) => {
        let fechaN = new Date(fechaNacimiento);
        let hoy = new Date();
        let diff = hoy - fechaN; // This is the difference in milliseconds
        let resultado = Math.floor(diff/31557600000); // Divide by 1000*60*60*24*365.25
        //console.log(resultado)
        return resultado;
    }

    // hook nativo como evento para efectos secundarios de react que no son renderizar componentes
    useEffect(() => {
        // set the value of edad, based on fechaNacimiento
        if (fechaNacimiento.trim() !== '' && touched.fechaNacimiento) {
            setFieldValue(props.name, calcularEdad(fechaNacimiento));
        }
    }, [fechaNacimiento,touched.fechaNacimiento]);
    // touched.fechaNacimiento, setFieldValue, props.name

    // regresa el input con la edad y su error correspondiente
    return (
        <>
            <input {...props} {...field} />
            {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
        </>
    );
};

export default MyField;