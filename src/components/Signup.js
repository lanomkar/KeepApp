import React, { useState } from "react";
import Base from "./Base";
import { Link } from "react-router-dom";
import { signup } from "./helper/auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, lastname, password, email, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });

    signup({ name, lastname, email, password })
      .then((data) => {
        console.log("data", data);
        if (!data.success) {
          console.log("error");
          setValues({ ...values, error: data.error, success: false });
        } else {
          console.log("working");
          setValues({
            ...values,
            name: "",
            lastname: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
        console.log("not");
      })
      .catch((err) => console.log(err));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <h2 align="center">Sign Up</h2>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                onChange={handleChange("name")}
                value={name}
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Last name</label>
              <input
                onChange={handleChange("lastname")}
                value={lastname}
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                type="email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                type="password"
                className="form-control"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-danger btn-block">
              submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link to="/signin">Login here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          {" "}
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base>
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
