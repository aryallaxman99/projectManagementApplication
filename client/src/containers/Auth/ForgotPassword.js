import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const frogottonPassword = async (values) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const response = await fetch(
      "http://localhost:5000/user/forgotpassword",
      requestOptions
    );
    const data = await response.json();
    if (data.msg === "Email found") {
      navigate("/resetpassword");
    } else {
      alert(data.msg);
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
