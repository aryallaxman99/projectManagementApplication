import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const ForgotPassword = () => {
  const frogottonPassword = async (values) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const response = await fetch(
      "http://localhost:5000/user/forgotpassword",
      requestOptions
    );
    const data = await response.json();
    alert(data.msg);
  };

  const EmailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    DOB: Yup.string().required("Required"),
  });
  return (
    <section className="form_selection">
      <div className="container">
        <div className="form">
          <h2>Find your account</h2>
          <div className="line" />
          <p>Please enter your email to search for your account.</p>

          <Formik
            initialValues={{
              email: "",
              DOB: "",
            }}
            validationSchema={EmailSchema}
            onSubmit={(values) => {
              frogottonPassword(values);
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
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <div className="error">{errors.email}</div>
                ) : null}

                <div className="calender">
                  <p>Date of Birth</p>
                </div>

                <Field
                  type="date"
                  name="DOB"
                  value={values.DOB}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.DOB && touched.DOB ? (
                  <div className="error">{errors.DOB}</div>
                ) : null}

                <button type="submit">Search</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
