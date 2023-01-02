import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import "./Register.css";

YupPassword(Yup); // extend yup

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("please enter your name"),

  email: Yup.string().email("Invalid email").required("Required"),

  password: Yup.string()
    .min(8, "Minimum 8 words")
    .minLowercase(1, "Required lower case")
    .minUppercase(1, "Required upper case")
    .minNumbers(1, " At least 1 number")
    .minSymbols(1, " At least 1 special character"),

  confirmPassword: Yup.string().required("Required"),

  country: Yup.string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),

  userRole: Yup.string().required("Required"),
});

const Register = () => {
  const [response, setResponse] = useState("");

  return (
    <div className="box">
      <h1>Register</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          country: "",
          userRole: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          const requestOptions = {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(values),
          };
          fetch("http://localhost:5000/register", requestOptions)
            .then((res) => res.json())
            .then((data) => setResponse(data.msg));
          // same shape as initial values
        }}
      >
        {({ errors, touched }) => (
          <div className="inputField">
            <Form>
              <Field placeholder="Full Name" name="name" />
              {errors.name && touched.name ? <div>{errors.name}</div> : null}
              <br></br>

              <Field placeholder="E-mail" name="email" type="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <br></br>

              <Field placeholder="Password" name="password" type="password" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              <br></br>

              <Field
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div>{errors.confirmPassword}</div>
              ) : null}
              <br></br>

              <Field placeholder="Country Name" name="country" />
              {errors.country && touched.country ? (
                <div>{errors.country}</div>
              ) : null}
              <br></br>

              <Field as="select" name="userRole">
                <option value="">select </option>
                <option value="User">Client</option>
                <option value="Rider">Developer</option>
              </Field>

              <br></br>

              <button type="submit">Submit</button>
            </Form>
            {response}
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Register;
