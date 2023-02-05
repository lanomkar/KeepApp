import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "./helper/auth";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#000" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  <div className="bg-danger">
    <div className="nav nav-tabs container">
      <div className="nav-item">
        <Link
          style={currentTab(history, "/")}
          className="nav-link text-white"
          to="/"
        >
          MyKeep
        </Link>
      </div>
      {!isAuthenticated() && (
        <Fragment>
          <div className="ml-auto d-inline-flex">
            <div className="nav-item">
              <Link
                style={currentTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Signup
              </Link>
            </div>
            <div className="nav-item">
              <Link
                style={currentTab(history, "/signin")}
                className="nav-link"
                to="/signin"
              >
                Signin
              </Link>
            </div>
          </div>
        </Fragment>
      )}
      {isAuthenticated() && (
        <div className="nav-item ml-auto">
          <span
            className="nav-link text-white"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </div>
      )}
    </div>
  </div>
);

export default withRouter(Menu);
