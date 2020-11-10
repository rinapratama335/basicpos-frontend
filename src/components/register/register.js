import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Username is to short!")
    .max(50, "Username is to long!")
    .required("Username is required!"),
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string()
    .required("Password is required!")
    .min(6, "Password is to short!")
    .max(30, "Password is to long!"),
  confirm_password: Yup.string().oneOf([
    Yup.ref("password"),
    null,
    "Both password neet to be same",
  ]),
});

class Register extends Component {
  showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group has-feedback">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={values.username}
            placeholder="Username"
            className={
              errors.username && touched.username
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {errors.username && touched.username ? (
            <small id="passwordHelp" className="text-danger">
              {errors.username}
            </small>
          ) : null}
        </div>
        <div className="form-group has-feedback">
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={values.email}
            placeholder="Email"
            className={
              errors.email && touched.email
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {errors.email && touched.email ? (
            <small id="passwordHelp" className="text-danger">
              {errors.email}
            </small>
          ) : null}
        </div>
        <div className="form-group has-feedback">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            placeholder="Password"
            className={
              errors.password && touched.password
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {errors.password && touched.password ? (
            <small id="passwordHelp" className="text-danger">
              {errors.password}
            </small>
          ) : null}
        </div>
        <div className="form-group has-feedback">
          <input
            type="password"
            name="confirm_password"
            onChange={handleChange}
            placeholder="Confirm Password"
            className={
              errors.confirm_password && touched.confirm_password
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {errors.confirm_password && touched.confirm_password ? (
            <small id="passwordHelp" className="text-danger">
              {errors.confirm_password}
            </small>
          ) : null}
        </div>
        <div className="row">
          <div className="col-md-12">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary bt-block btn-float"
            >
              Confirm
            </button>
          </div>
        </div>
      </form>
    );
  };

  handleSubmit = (values, history) => {
    axios
      .post("http://localhost:8000/register", values)
      .then((res) => {
        if (res.data.result === "success") {
          swal("Success!", res.data.message, "success").then((value) => {
            history.push("/login");
          });
        } else if (res.data.result === "error") {
          swal("Error!", res.data.message, "error");
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        swal("Error!", "Unexpected error", "error");
      });
  };

  render() {
    return (
      <div className="register-page">
        <div className="register-form">
          <div className="register-logo">
            <a href="#">
              <b>Basic</b> POS
            </a>
          </div>
          <div className="card">
            <div className="card-body register-card-body">
              <p className="login-box-msg">Register New Member</p>

              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                  confirm_password: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                  this.handleSubmit(values, this.props.history);
                  setSubmitting(false);
                  console.log(values);
                }}
                validationSchema={SignupSchema}
              >
                {(props) => this.showForm(props)}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
