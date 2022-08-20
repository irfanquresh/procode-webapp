import React from "react";

const ErrorMessage = ({ errors, name }) => {
  if (errors[`${name}`]?.message) {
    return <p className="text-red-400 text-md">{errors[`${name}`]?.message}</p>;
  } else {
    return null;
  }
};

export default ErrorMessage;
