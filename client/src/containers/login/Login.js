import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup); // extend yup

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),

  password: Yup.string()
    .min(8, "Minimum 8 words")
    .minLowercase(1, "Required lower case")
    .minUppercase(1, "Required upper case")
    .minNumbers(1, " At least 1 number")
    .minSymbols(1, " At least 1 special character"),
});

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const showPassword = () => {
    console.log("show password");
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="box">
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
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
          fetch("http://localhost:5000/login", requestOptions).then((res) =>
            res.json()
          );
          // .then((data) => setResponse(data.msg));
          // same shape as initial values
        }}
      >
        {({ errors, touched }) => (
          <div className="inputField">
            <Form>
              <Field placeholder="E-mail" name="email" type="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <br></br>

              <Field
                placeholder="Password"
                name="password"
                type={passwordShown ? "text" : "password"}
              />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              {/* <Field type="checkbox" component={showPassword}></Field> */}
              <br></br>
              <button type="submit">Submit</button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Login;
