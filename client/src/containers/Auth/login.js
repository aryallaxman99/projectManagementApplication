import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import ShowhidePassword from "../../components/showhidePassword";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../reducers/userSlice";
const Login = () => {
  const dispatch = useDispatch();
  // const { name, userRole } = useSelector((state) => state.user);

  const loginUser = async (values, resetForm) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const response = await fetch(
      "http://localhost:5000/user/login",
      requestOptions
    );
    const data = await response.json();
    if (data.msg === "login success") {
      dispatch(setUserDetails(data.userDetails));
    } else {
      alert(data.msg);
    }
  };
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <section>
      <div className="container">
        <div className="form">
          <h1>Login</h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { resetForm }) => {
              loginUser(values);
              // resetForm()
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

                <Field
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  component={ShowhidePassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <div className="error">{errors.password}</div>
                ) : null}

                <button type="submit">Login</button>
              </Form>
            )}
          </Formik>
          <a className="forgotPassword" href="/forgotpassword">
            Forgot password?
          </a>

          <div className="line"></div>
          <a role="button" className="register" href="/register">
            Create new account
          </a>
        </div>
      </div>
    </section>
  );
};

export default Login;
