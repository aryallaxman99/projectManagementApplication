import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useLocation, useParams } from "react-router-dom";

const ResetPassword = () => {
  const CodeSchema = Yup.object().shape({
    code: Yup.number().required("Required"),
  });

  const sendCode = async (values) => {
    const requestOption = {
      method: "ALL",
      heasers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const response = await fetch(
      "http://localhost:5000/user/forgotpassword",
      requestOption
    );
    const data = await response.json();
    console.log(data);
  };
  return (
    <section className="form_selection">
      <div className="container">
        <div className="form">
          <h2>Enter your code</h2>
          <div className="line" />
          <p>Please enter the code to reset your password.</p>
          <Formik
            initialValues={{
              code: "",
            }}
            validationSchema={CodeSchema}
            onSubmit={(values) => {
              console.log(values);
              // sendCode(values);
            }}
          >
            {({
              errors,
              touched,
              values,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="code"
                  placeholder="Enter code"
                  value={values.code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.code && touched.code ? (
                  <div className="error">{errors.code}</div>
                ) : null}

                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};
export default ResetPassword;
