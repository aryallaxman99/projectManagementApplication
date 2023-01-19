import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState(false);

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
    console.log(response.status);
    if (response.status === 302) {
      navigate("/otp", { state: { email: values.email } });
    } else {
      setResponseMessage(true);
    }
  };

  const EmailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
  return (
    <section className="form_selection">
      <div className="container">
        <div className="form">
          <h2>Find your account</h2>
          <div className="line" />
          <p>Please enter your email to search for your account.</p>
          <p>code will be send to your mobile number.</p>

          <Formik
            initialValues={{
              email: "",
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
                <div className="error">
                  {responseMessage ? "Email not found" : ""}
                </div>
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
