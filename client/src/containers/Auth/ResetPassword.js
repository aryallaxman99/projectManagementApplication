import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import ShowhidePassword from "../../components/showhidePassword";

const ResetPassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [passwordMsg, setPasswordMsg] = useState("");

  const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const PasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Required")
      .min(6)
      .matches(passwordRule, { message: "Please create a stronger password" }),
    confirmPassword: Yup.string().required("Required"),
  });

  const sendPassword = async (values) => {
    const requestOption = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const response = await fetch(
      "http://localhost:5000/user/resetpassword",
      requestOption
    );
    const data = await response.json();
    if ((data.status = "true")) {
      alert(data.msg);
      navigate("/");
    } else {
      alert(data.msg);
    }
  };
  return (
    <section className="form_selection">
      <div className="container">
        <div className="form">
          <h2> password</h2>
          <div className="line" />
          <p> Enter your new password.</p>
          <Formik
            initialValues={{
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={PasswordSchema}
            onSubmit={(values) => {
              if (values.newPassword === values.confirmPassword) {
                values.email = state.email;
                values.code = state.code;
                sendPassword(values);
              } else {
                setPasswordMsg("Password doesn't matched");
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
                  name="newPassword"
                  placeholder="New Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  component={ShowhidePassword}
                />
                {errors.newPassword && touched.newPassword ? (
                  <div className="error">{errors.newPassword}</div>
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
                <div style={{ color: "red", fontSize: "12px" }}>
                  {passwordMsg}
                </div>
                <br></br>
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
