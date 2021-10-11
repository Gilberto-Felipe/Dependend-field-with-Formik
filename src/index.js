import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form, useField, useFormikContext } from 'formik';
import './styles.css';

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
        console.log(resultado)
        return resultado;
    }

    React.useEffect(() => {
        // set the value of edad, based on fechaNacimiento
        if (
            fechaNacimiento.trim() !== '' &&
            touched.fechaNacimiento
        ) {
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

function App() {
    // Note that we provide initalValues all fields.
    const initialValues = { fechaNacimiento: '', edad: '' };
    return (
        <div className="App">
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => alert(JSON.stringify(values, null, 2))}
            >
                <div className="section">
                    <h1>Campos dependientes con Formik</h1>

                    <Form>
                        <label htmlFor="fechaNacimiento">Fecha Nacimiento</label>
                        <Field name="fechaNacimiento" type="date" />
                        <label>Edad</label>
                        <MyField name="edad" readOnly /> <br />
                        <button type="submit">Submit</button>
                    </Form>
                </div>
            </Formik>

        </div>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
