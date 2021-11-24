import React, { useState } from 'react';
import { useFormik } from 'formik';
import { calcularEdad, schema } from '../helpers/Schemas';


const DependentFormFactorizado = () => {

    const initialValues = {
        fechaNacimiento: "",
        edad: 0,
        nombre: "",
    };

    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    // evento personalizado
    const setEdadValue = e => {
        const { name, value } = e.target;
        formik.setFieldValue(name, value);
        formik.setFieldValue("edad", calcularEdad(value));
    }

    return (
        <>
            <h1>Formik + Yup + Campos dependientes Refactorizado</h1>

            <form onSubmit={formik.handleSubmit}>
                <div >
                    <label >Fecha nacimiento: </label>
                    <input
                        name="fechaNacimiento"
                        type="date"
                        onChange={setEdadValue}
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

                <div >
                    <label >Nombre: </label>
                    <input
                        name="nombre"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nombre}
                    />
                    {formik.errors.nombre && formik.touched.nombre ? (
                        <p>{formik.errors.nombre}</p>
                    ) : null}
                </div>
                <hr />

                <button >Submit</button>
            </form>
        </>
    )
}

export default DependentFormFactorizado;
