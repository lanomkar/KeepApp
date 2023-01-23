import React from "react";
import Menu from "./Menu";

const Base = ({ children }) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div>{children}</div>
      </div>
      <footer className="footer bg-danger mt-3 py-3">
        <div className="container">
          <span className="text-white">Copyright &copy; by Omkar</span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
