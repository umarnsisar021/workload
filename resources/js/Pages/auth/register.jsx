import React, { Component } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Inertia } from '@inertiajs/inertia';
import route from "ziggy-js"
class Register extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    repassword: ""
  };

  handleSubmit = (values, { setSubmitting }) => {
 
        Inertia.post(route('register_create'),values)
  };

  render() {
    return (
      <div
        className="auth-layout-wrap"
        style={{
          background:"light-gray"
        }}
      >
        <div className="auth-content">
          <div className="card o-hidden">
            <div className="row">
              <div
                className="col-md-6 text-center "
                style={{
                  backgroundSize: "cover",
                  background:"light-gray"
                }}
              >
                <div className="pl-3 auth-right">
                  <div className="auth-logo text-center mt-4">
                    <img src="/logos/logo.png" alt="" />
                  </div>
                  <div className="flex-grow-1"></div>
                  <div className="w-100 mb-4">
                   

                    <Button className="btn btn-outline-google btn-block btn-icon-text btn-rounded">
                      <i className="i-Google-Plus"></i> Sign in with Google
                    </Button>
                    <Button className="btn btn-outline-facebook btn-block btn-icon-text btn-rounded">
                      <i className="i-Facebook-2"></i> Sign in with Facebook
                    </Button>
                  </div>
                  <div className="flex-grow-1"></div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-4">
                  <h1 className="mb-3 text-18">Sign Up</h1>
                  <Formik
                    initialValues={this.state}
                   
                    onSubmit={this.handleSubmit}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting
                    }) => (
                      <form onSubmit={handleSubmit}>
                        {console.log(errors)}
                        <div className="form-group">
                          <label htmlFor="company_name">Company Name</label>
                          <input
                            className="form-control form-control-rounded"
                            name="company_name"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
          
                          />
                          {errors.company_name && touched.company_name && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.company_name}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="username">Username *</label>
                          <input
                            name="username"
                            className="form-control form-control-rounded"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
              
                          />
                          {errors.username && touched.username && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.username}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email address</label>
                          <input
                            name="email"
                            className="form-control form-control-rounded"
                            type="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          {errors.email && touched.email && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.email}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <input
                            name="password"
                            className="form-control form-control-rounded"
                            type="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          {errors.password && touched.password && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.password}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="repassword">Retype password</label>
                          <input
                            name="repassword"
                            className="form-control form-control-rounded"
                            type="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.repassword}
                          />
                          {errors.repassword && touched.repassword && (
                            <div className="text-danger mt-1 ml-2">
                              {errors.repassword}
                            </div>
                          )}
                        </div>
                        <button
                          className="btn btn-primary btn-block btn-rounded mt-3"
                          type="submit"
                        >
                          Sign Up
                        </button>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const SignupSchema = yup.object().shape({
 
  email: yup
    .string()
    .email("Invalid email")
    .required("email is required"),
  password: yup
    .string()
    .min(6, "Password must be 6 character long")
    .required("password is required"),
  repassword: yup
    .string()
    .required("repeat password")
    .oneOf([yup.ref("password")], "Passwords must match")
});

const mapStateToProps = state => ({
  user: state.user
});

export default Register;
