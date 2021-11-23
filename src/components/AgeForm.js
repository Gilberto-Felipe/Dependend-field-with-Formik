import { Field, Form, Formik } from "formik";
import MyField from "./MyField";

const AgeForm = () => {
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
                        <div>
                            <label htmlFor="fechaNacimiento">Fecha Nacimiento</label>
                            <Field name="fechaNacimiento" type="date" />
                        </div>
                        <br />
                        <div>
                            <label>Edad</label>
                            <MyField name="edad" readOnly /> <br />
                        </div>.
                        <br />
                        <button type="submit">Submit</button>
                    </Form>
                </div>
            </Formik>
        </div>

    );
}

export default AgeForm;
