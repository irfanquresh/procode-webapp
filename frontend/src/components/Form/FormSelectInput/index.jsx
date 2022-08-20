import { forwardRef } from "react";
import ErrorMessage from "components/ErrorMessage";

const style = {
  inputBaseClass:
    "w-full px-5 py-2 placeholder-slate-300 text-slate-600 bg-white rounded-2 text-lg shadow  ease-linear transition-all duration-150",
  inputBorderClass:
    "border border-sky-300 focus:border-2 focus:border-sky-500 focus:ring-2 focus:ring-sky-500",
  inputBorderErrorClass:
    "border-2 border-red-300 ring ring-offset-0 ring-red-300 focus:border-2 focus:border-red-500 focus:ring focus:ring-offset-0 focus:ring-red-500",
};

const FormSelectInput = forwardRef((props, ref) => {
  const { label, name, value, options, onChange, errors } = props;

  return (
    <>
      <label className="block text-slate-600 text-sm font-bold">{label}</label>
      <div className="relative w-full">
        <select
          ref={ref}
          {...props}
          onChange={(e) => onChange(e)}
          className={
            style.inputBaseClass +
            " " +
            (errors[`${name}`]?.message
              ? style.inputBorderErrorClass
              : style?.inputBorderClass)
          }
        >
          {options?.map((item, idx) => (
            <option value={item.id} key={name + "-" + item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <ErrorMessage errors={errors} name={name} />
      </div>
    </>
  );
});

export default FormSelectInput;
