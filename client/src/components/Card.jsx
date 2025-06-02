import React from "react";
import classNames from "classnames";

const Card = ({ children, className = "" }) => {
  const baseClasses = "p-4 rounded shadow-md";

  return (
    <div className={classNames(baseClasses, className)}>
      {children}
    </div>
  );
};

export default Card;
