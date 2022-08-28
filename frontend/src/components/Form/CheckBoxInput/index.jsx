import { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CheckBoxInput = forwardRef((props, ref) => {
  const { type, label, name, value, checked, onChange, errormessage } = props;
  return (
    <div className="flex pt-2">
      <div className="flex-none items-center h-5">
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          checked={checked}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.checked);
            }
          }}
          className="form-checkbox text-sky-500 border border-sky-1 rounded-2 shadow ml-1 w-5 h-5 focus:outline-none focus:ring-2 focus:ring-sky-500 ease-linear transition-all duration-150"
        />
      </div>
      <div className="flex-1 pl-2">
        <div className="text-sm">{label}</div>
        {errormessage ? (
          <div className="text-sm">
            <p className="text-red-400 text-md pt-0">{errormessage}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
});

CheckBoxInput.defaultProps = {
  errormessage: "",
};

CheckBoxInput.propTypes = {
  errormessage: PropTypes.string,
};

export default CheckBoxInput;
