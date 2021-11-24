import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';

const DependentForm = () => {

    const schema = yup.object().shape({
        fechaNacimiento: yup.string().required("Fecha de nacimiento es un campo requerido."),
        edad: yup.number().min(1, "La edad debe ser mayor o igual a uno").required("Edad es un campo requerido.")
    });

    const formik = useFormik({
        initialValues: {
            fechaNacimiento: "",
            edad: 0
        },
        validationSchema: schema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const calcularEdad = (fechaNacimiento) => {
        let fechaN = new Date(fechaNacimiento);
        let hoy = new Date();
        let diff = hoy - fechaN; // This is the difference in milliseconds
        let resultado = Math.floor(diff / 31557600000); // Divide by 1000*60*60*24*365.25
        //console.log(resultado)
        return resultado;
    }

    return (
        <>
            <h1>Formik + Yup + Campos dependientes con transform en onChange</h1>

            <form onSubmit={formik.handleSubmit}>
                <div >
                    <label >Fecha nacimiento: </label>
                    <input
                        name="fechaNacimiento"
                        type="date"
                        onChange={e => {
                            const { name, value } = e.target;
                            formik.setFieldValue("fechaNacimiento", value);
                            formik.setFieldValue("edad", calcularEdad(value));
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.fechaNacimiento}
                    />
                    {formik.errors.fechaNacimiento && formik.touched.fechaNacimiento ? (
                        <p>{formik.errors.fechaNacimiento}</p>
                    ) : null}
                </div>
                <hr />

                <div >
                    <label >Edad: </label>
                    <input
                        name="edad"
                        type="text"
                        readOnly
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.edad}
                    />
                    {formik.errors.edad && formik.touched.edad ? (
                        <p>{formik.errors.edad}</p>
                    ) : null}
                </div>
                <hr />

                <button >Submit</button>
            </form>
        </>
    )
}

export default DependentForm;
