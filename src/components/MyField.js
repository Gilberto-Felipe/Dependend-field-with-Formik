import React from 'react';
import { useField, useFormikContext } from 'formik';

const MyField = (props) => {
    const {
        values: { fechaNacimiento },
        touched,
        setFieldValue,
    } = useFormikContext();
    
    const [field, meta] = useField(props);

    const calcularEdad = (fechaNacimiento) => {
        let fechaN = new Date(fechaNacimiento);
        let hoy = new Date();
        let diff = hoy - fechaN; // This is the difference in milliseconds
        let resultado = Math.floor(diff/31557600000); // Divide by 1000*60*60*24*365.25
        //console.log(resultado)
        return resultado;
    }

    React.useEffect(() => {
        // set the value of edad, based on fechaNacimiento
        if (fechaNacimiento.trim() !== '' && touched.fechaNacimiento) {
            setFieldValue(props.name, calcularEdad(fechaNacimiento));
        }
    }, [fechaNacimiento, touched.fechaNacimiento, setFieldValue, props.name]);

    return (
        <>
            <input {...props} {...field} />
            {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
        </>
    );
};

export default MyField;