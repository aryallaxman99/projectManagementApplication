import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import CountryData from "../../countries.json";
import ShowhidePassword from "../../components/showhidePassword";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const registerUser = async (values) => {
    const { confirmPassword, ...value } = values;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    };

    const response = await fetch(
      "http://localhost:5000/user/register",
      requestOptions
    );
    const data = await response.json();

    if (data) {
      alert(data.msg);
      navigate("/");
    }
  };

  const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6)
      .matches(passwordRule, { message: "Please create a stronger password" }),
    confirmPassword: Yup.string().required("Required"),
    mobileNumber: Yup.number().required("Required"),
  });

  return (
    <section className="form_section">
      <div className="container">
        <div className="form">
          <h1>Sign Up</h1>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              mobileNumber: "",
              country: "",
              userRole: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              if (values.password === values.confirmPassword) {
                registerUser(values);
              } else {
                alert("Password didn't matched");
              }
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
                  name="name"
                  placeholder="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (
                  <div className="error">{errors.name}</div>
                ) : null}

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
                  placeholder="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  component={ShowhidePassword}
                />
                {errors.password && touched.password ? (
                  <div className="error">{errors.password}</div>
                ) : null}

                <Field
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  component={ShowhidePassword}
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className="error">{errors.confirmPassword}</div>
                ) : null}

                <Field
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={values.mobileNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.mobileNumber && touched.mobileNumber ? (
                  <div className="error">{errors.mobileNumber}</div>
                ) : null}

                <select
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option
                    value=""
                    disabled="disabled"
                    label="Select a Country"
                  ></option>
                  {CountryData.map((country) => {
                    const { name } = country;
                    return (
                      <option value={name} label={name} key={name}>
                        {name}
                      </option>
                    );
                  })}
                </select>

                {errors.country && touched.country ? (
                  <div className="error">{errors.country}</div>
                ) : null}

                <select
                  name="userRole"
                  value={values.userRole}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option
                    value=""
                    disabled="disabled"
                    label="Select a Role"
                  ></option>
                  <option value="user" label="User">
                    User
                  </option>
                  <option value="developer" label="Developer">
                    Developer
                  </option>
                </select>
                {errors.userRole && touched.userRole ? (
                  <div className="error">{errors.userRole}</div>
                ) : null}

                <button type="submit">Signup</button>
              </Form>
            )}
          </Formik>
          <div className="line" />

          <p style={{ marginTop: "10px" }}>
            Already have an account? Please <Link to="/">Login</Link> to
            continue
          </p>
        </div>
      </div>
    </section>
  );
};
export default Register;
