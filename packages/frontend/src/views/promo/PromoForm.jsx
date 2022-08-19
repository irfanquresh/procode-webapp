import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { object, array, date, ref, string, number } from "yup";

// Utils
import { yupValidationResolver } from "utils/yup.util";

// Validations
const ensureNumber = (val) => (isFinite(val) ? val : undefined);

const resolver = yupValidationResolver(
  object().shape({
    title: string().min(5).max(32).required("Title is required!"),
    startDate: date()
      .nullable()
      .transform((v) => (v instanceof Date && !isNaN(v) ? v : null))
      .required("Start date is required (DD/MM/YYYY)"),
    endDate: date()
      .nullable()
      .transform((v) => (v instanceof Date && !isNaN(v) ? v : null))
      .required("End date is required (DD/MM/YYYY)")
      .min(ref("startDate"), "end date can't be before start date"),
    appliedOn: string().required(),
    buyBrandOrProduct: array()
      .of(
        object().shape({
          id: string().ensure().required("Brand/Product is required"),
          qty: number().required("Qty is required").transform(ensureNumber),
        })
      )
      .min(1, "You need at least 1 Buy Brand or Product")
      .required("Select at least 1 Buy Brand or Product"),
    offerProduct: array()
      .of(
        object().shape({
          id: string().ensure().required("Brand/Product is required"),
          qty: number().required("Qty is required").transform(ensureNumber),
        })
      )
      .min(1, "You need at least 1 Offer Product")
      .required("Select at least 1 Offer Product"),
  })
);

const style = {
  inputBaseClass:
    "w-full px-5 py-2 placeholder-slate-300 text-slate-600 bg-white rounded-2 text-lg shadow  ease-linear transition-all duration-150",
  inputBorderClass:
    "border border-sky-300 focus:border-2 focus:border-sky-500 focus:ring-2 focus:ring-sky-500",
  inputBorderErrorClass:
    "border-2 border-red-300 ring ring-offset-0 ring-red-300 focus:border-2 focus:border-red-500 focus:ring focus:ring-offset-0 focus:ring-red-500",
  btnBaseClass:
    "text-white text-sm font-bold bg-sky-500 active:bg-sky-400 uppercase px-6 py-2.5 rounded-2 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150",
  btnDangerClass:
    "text-white text-sm font-bold bg-red-500 active:bg-red-400 uppercase px-6 py-2.5 rounded-2 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150",
};

const defaultValue = { id: "", name: "", qty: "" };

const PromoForm = ({ formData, onSubmit }) => {
  const [buyBrandOrProduct, setBuyBrandOrProduct] = useState([defaultValue]);
  const [offerProduct, setOfferProduct] = useState([defaultValue]);

  const {
    trigger,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({ resolver });

  useEffect(() => {
    if (formData?.promo?.title) {
      setValue("title", formData?.promo?.title);
    }
  }, [formData, setValue]);

  const addBuyBrandOrProduct = async () => {
    setBuyBrandOrProduct([...buyBrandOrProduct, defaultValue]);
  };

  const addOfferProduct = async () => {
    setOfferProduct([...offerProduct, defaultValue]);
  };

  const removeBuyBrandOrProduct = (index) => {
    const buyBrandOrProduct = getValues("buyBrandOrProduct");
    const newBuyBrandOrProduct = [...buyBrandOrProduct];
    newBuyBrandOrProduct.splice(index, 1);
    setBuyBrandOrProduct(newBuyBrandOrProduct);

    for (let i = 0; i < newBuyBrandOrProduct.length; i++) {
      setValue(`buyBrandOrProduct[${i}].id`, newBuyBrandOrProduct[i].id);
      setValue(`buyBrandOrProduct[${i}].qty`, newBuyBrandOrProduct[i].qty);
    }
  };

  const removeOfferProduct = (index) => {
    const offerProduct = getValues("offerProduct");
    const newOfferProduct = [...offerProduct];
    newOfferProduct.splice(index, 1);
    setOfferProduct(newOfferProduct);

    for (let i = 0; i < newOfferProduct.length; i++) {
      setValue(`offerProduct[${i}].id`, newOfferProduct[i].id);
      setValue(`offerProduct[${i}].qty`, newOfferProduct[i].qty);
    }
  };

  const ErrorMessage = ({ errors, name }) => {
    if (errors[`${name}`]?.message) {
      return <p className="text-red-400 text-md">{errors[`${name}`]?.message}</p>;
    } else {
      return null;
    }
  };

  const FormInput = ({ type, label, name, value, onChange, errors }) => {
    return (
      <>
        <label className="block text-slate-600 text-sm font-bold">{label}</label>
        <div className="relative w-full">
          <input
            {...register(name)}
            type={type}
            className={
              style.inputBaseClass +
              " " +
              (errors[`${name}`]?.message
                ? style.inputBorderErrorClass
                : style?.inputBorderClass)
            }
          />
          <ErrorMessage errors={errors} name={name} />
        </div>
      </>
    );
  };

  const FormSelectInput = ({ label, name, value, options, onChange, errors }) => {
    return (
      <>
        <label className="block text-slate-600 text-sm font-bold">{label}</label>
        <div className="relative w-full">
          <select
            {...register(name)}
            value={value ?? ""}
            onChange={(e) => {
              setValue(name, e.target.value);
              trigger(name);
            }}
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
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-2 gap-2">
        <div className="mb-2">
          <FormInput type="text" label="Title" name="title" errors={errors} />
        </div>

        <div className="mb-2">
          <FormInput
            type="date"
            label="Start Date"
            name="startDate"
            errors={errors}
          />
        </div>

        <div className="mb-2">
          <FormInput type="date" label="End Date" name="endDate" errors={errors} />
        </div>

        <div className="mb-2">
          <FormSelectInput
            options={[
              { id: "brand", name: "Brand" },
              { id: "product", name: "Product" },
            ]}
            label="Applied On"
            name="appliedOn"
            errors={errors}
          />
        </div>
      </div>

      <div className="mb-2 mt-5">
        <h2 className="text-slate-500 text-xl lg:text-3xl font-bold">
          Select Products/Brands
        </h2>

        {buyBrandOrProduct.map((_, index) => {
          const fieldName = `buyBrandOrProduct[${index}]`;
          return (
            <fieldset name={fieldName} key={fieldName}>
              <div className="grid grid-cols-5 gap-2">
                <div className="col-span-3">
                  <div className="mb-2">
                    <FormSelectInput
                      options={
                        getValues("appliedOn") === "brand"
                          ? formData?.brand ?? []
                          : formData?.product ?? []
                      }
                      label={
                        getValues("appliedOn") === "brand"
                          ? "Select Brand"
                          : "Select Product"
                      }
                      name={`${fieldName}.id`}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="mb-2">
                    <FormInput
                      type="number"
                      label="Quantity"
                      name={`${fieldName}.qty`}
                      errors={errors}
                    />
                  </div>
                </div>

                <div className="col-span-1">
                  <div className="mb-2 mt-6 text-center">
                    {index === 0 ? (
                      <button
                        type="button"
                        className={style.btnBaseClass}
                        onClick={() => addBuyBrandOrProduct(index)}
                      >
                        <i className={"fa fa-plus"}></i>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={style.btnDangerClass}
                        onClick={() => removeBuyBrandOrProduct(index)}
                      >
                        <i className={"fa fa-minus"}></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </fieldset>
          );
        })}
      </div>

      <div className="mb-2 mt-5">
        <h2 className="text-slate-500 text-xl lg:text-3xl font-bold">
          Offer Product
        </h2>

        {offerProduct.map((_, index) => {
          const fieldName = `offerProduct[${index}]`;
          return (
            <fieldset name={fieldName} key={fieldName}>
              <div className="grid grid-cols-5 gap-2">
                <div className="col-span-3">
                  <div className="mb-2">
                    <FormSelectInput
                      options={formData?.product ?? []}
                      label={"Select Product"}
                      name={`${fieldName}.id`}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="mb-2">
                    <FormInput
                      type="number"
                      label="Quantity"
                      name={`${fieldName}.qty`}
                      errors={errors}
                    />
                  </div>
                </div>

                <div className="col-span-1">
                  <div className="mb-2 mt-6 text-center">
                    {index === 0 ? (
                      <button
                        type="button"
                        className={style.btnBaseClass}
                        onClick={() => addOfferProduct(index)}
                      >
                        <i className={"fa fa-plus"}></i>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={style.btnDangerClass}
                        onClick={() => removeOfferProduct(index)}
                      >
                        <i className={"fa fa-minus"}></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </fieldset>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => handleSubmit(onSubmit)()}
          className={style.btnBaseClass}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default PromoForm;
