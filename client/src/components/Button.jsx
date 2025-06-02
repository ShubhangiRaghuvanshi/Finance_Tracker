import React from "react";
import classNames from "classnames";

const Button = ({ children, onClick, className = "", type = "button" }) => {
  const baseClasses =
    "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition";

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(baseClasses, className)}
    >
      {children}
    </button>
  );
};

export default Button;
