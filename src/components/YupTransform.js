import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';


// .tranform(calcularEdad) da problemas de validacion, porque calcular edad cambia el tipo de dato
// transform corre primero, validation corre despues
// investigué en el repositorio github de Fromik. Formik no recibe el valor transformado.
// Lo tienes que recuperar por otro metodo, pe. en el onBlur, u onChange. Tienes que personalizarlos.


const YupTransform = () => {

    const calcularEdad = (fechaNacimiento) => {
        console.log("Hola estoy funcionando");
        let fechaN = new Date(fechaNacimiento);
        let hoy = new Date();
        let diff = hoy - fechaN; // This is the difference in milliseconds
        let resultado = Math.floor(diff/31557600000); // Divide by 1000*60*60*24*365.25
        console.log(resultado);
        formik.setFieldValue('edad', resultado);
        //return fechaNacimiento;
    }
    
    const SignupSchema = Yup.object().shape({
        // firstName: Yup.string()
        //     .min(2, 'Too Short!')
        //     .max(50, 'Too Long!')
        //     .required('Required'),
        // lastName: Yup.string()
        //     .min(2, 'Too Short!')
        //     .max(50, 'Too Long!')
        //     .required('Required'),
        // email: Yup.string()
        //     .email('Invalid email')
        //     .required('Required'),
        fechaNacimiento: Yup.string()
            //.transform(calcularEdad) // da problemas la validacion, transform ocurre primero y cambia 'fechaNacimiento' a un int. Y la validacion espera un string
            .required('Required')
            .when(calcularEdad),
        edad: Yup.number()
            .required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            fechaNacimiento: '',
            edad: '',
        },
        validationSchema: SignupSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <h1>Yup + Transform + useFormik() Sample</h1>
            {/* <label htmlFor="firstName">First Name</label>
            <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
            />
            {formik.errors.firstName && formik.touched.firstName ? (
                <div>{formik.errors.firstName}</div>
            ) : null}
            <br />
            <label htmlFor="lastName">Last Name</label>
            <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
            />
            {formik.errors.lastName && formik.touched.lastName ? (
                <div>{formik.errors.lastName}</div>
            ) : null}
            <br />
            <label htmlFor="email">Email Address</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
            <br /> */}
            <label htmlFor="fechaNacimiento">Fecha Nacimiento  </label>
            <input
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fechaNacimiento}
            />
            {formik.errors.fechaNacimiento && formik.touched.fechaNacimiento ? <div>{formik.errors.fechaNacimiento}</div> : null}
            <br />
            <label htmlFor="edad">Edad  </label>
            <input
                id="edad"
                name="edad"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.edad}
                readOnly
            />
            {formik.errors.edad && formik.touched.edad ? <div>{formik.errors.edad}</div> : null}
            <br />
            <button type="submit">Submit</button>
        </form>
    );
}

export default YupTransform;
