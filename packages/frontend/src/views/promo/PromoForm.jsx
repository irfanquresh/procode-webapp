import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { object, array, date, ref, string, number } from "yup";
import moment from "moment";

import FormInput from "components/Form/FormInput";
import FormSelectInput from "components/Form/FormSelectInput";

import { yupValidationResolver } from "utils/yup.util";
import { useGetPromoQuery } from "store/promo/promoApiSlice";

// Validations
const ensureNumber = (val) => (isFinite(val) ? val : undefined);

const resolver = yupValidationResolver(
  object().shape({
    title: string().min(5).max(100).required("Title is required!"),
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
  btnBaseClass:
    "text-white text-sm font-bold bg-sky-500 active:bg-sky-400 uppercase px-6 py-2.5 rounded-2 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150",
  btnDangerClass:
    "text-white text-sm font-bold bg-red-500 active:bg-red-400 uppercase px-6 py-2.5 rounded-2 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150",
};

const defaultValue = { id: "", qty: "" };

const PromoForm = ({ formData, onSubmit, onClose }) => {
  const id = formData?.promo?.id ?? "";
  const [buyBrandOrProduct, setBuyBrandOrProduct] = useState([defaultValue]);
  const [offerProduct, setOfferProduct] = useState([defaultValue]);

  const {
    data,
    refetch: refetchPromo,
    isLoading,
  } = useGetPromoQuery(id, { skip: !id });

  const {
    reset,
    trigger,
    handleSubmit,
    register,
    unregister,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({ resolver });

  useEffect(() => {
    refetchPromo();
  }, []);

  useEffect(() => {
    if (data && data?.id) {
      reset();
      setValue("id", data?.id);
      setValue("title", data.title);
      setValue("startDate", moment(data.startDate).format("yyyy-MM-DD"));
      setValue("endDate", moment(data.endDate).format("yyyy-MM-DD"));
      setValue("appliedOn", data.appliedOn);

      const newBuyBrandOrProduct = data.buyBrandOrProduct ?? [defaultValue];
      const newOfferProduct = data.offerProduct ?? [defaultValue];
      setBuyBrandOrProduct(newBuyBrandOrProduct);
      setOfferProduct(newOfferProduct);

      for (let i = 0; i < newBuyBrandOrProduct.length; i++) {
        setValue(`buyBrandOrProduct[${i}].id`, newBuyBrandOrProduct[i].id);
        setValue(`buyBrandOrProduct[${i}].qty`, newBuyBrandOrProduct[i].qty);
      }
      for (let i = 0; i < newOfferProduct.length; i++) {
        setValue(`offerProduct[${i}].id`, newOfferProduct[i].id);
        setValue(`offerProduct[${i}].qty`, newOfferProduct[i].qty);
      }
    } else {
      setValue("id", "");
      setValue("startDate", moment().format("yyyy-MM-DD"));
      setValue("endDate", moment().add(5, "days").format("yyyy-MM-DD"));
    }
  }, [setValue, reset, data, isLoading]);

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

    unregister(`buyBrandOrProduct`);
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

    unregister(`offerProduct`);
    setOfferProduct(newOfferProduct);
    for (let i = 0; i < newOfferProduct.length; i++) {
      setValue(`offerProduct[${i}].id`, newOfferProduct[i].id);
      setValue(`offerProduct[${i}].qty`, newOfferProduct[i].qty);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div className="mb-2 hidden">
          <FormInput {...register("id")} type="text" name="id" />
        </div>
        <div className="mb-2">
          <FormInput
            {...register("title")}
            type="text"
            label="Title"
            name="title"
            errors={errors}
          />
        </div>

        <div className="mb-2">
          <FormInput
            {...register("startDate")}
            type="date"
            label="Start Date"
            name="startDate"
            errors={errors}
          />
        </div>

        <div className="mb-2">
          <FormInput
            {...register("endDate")}
            type="date"
            label="End Date"
            name="endDate"
            errors={errors}
          />
        </div>

        <div className="mb-2">
          <FormSelectInput
            {...register("appliedOn")}
            onChange={(e) => {
              setValue("appliedOn", e.target.value);
              trigger("appliedOn");
            }}
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

        {buyBrandOrProduct
          .filter((item) => !!item)
          .map((_, index) => {
            const fieldName = `buyBrandOrProduct[${index}]`;
            return (
              <fieldset name={fieldName} key={fieldName}>
                <div className="grid grid-cols-5 gap-2">
                  <div className="col-span-3">
                    <div className="mb-2">
                      <FormSelectInput
                        {...register(`${fieldName}.id`)}
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
                        onChange={(e) => {
                          setValue(`${fieldName}.id`, e.target.value);
                          trigger(`${fieldName}.id`);
                        }}
                        name={`${fieldName}.id`}
                        errors={errors}
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="mb-2">
                      <FormInput
                        {...register(`${fieldName}.qty`)}
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

        {offerProduct
          .filter((item) => !!item)
          .map((_, index) => {
            const fieldName = `offerProduct[${index}]`;
            return (
              <fieldset name={fieldName} key={fieldName}>
                <div className="grid grid-cols-5 gap-2">
                  <div className="col-span-3">
                    <div className="mb-2">
                      <FormSelectInput
                        {...register(`${fieldName}.id`)}
                        onChange={(e) => {
                          setValue(`${fieldName}.id`, e.target.value);
                          trigger(`${fieldName}.id`);
                        }}
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
                        {...register(`${fieldName}.qty`)}
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
      <div class="mt-6 text-center">
        <button
          type="button"
          onClick={() => handleSubmit(onSubmit)()}
          className={style.btnBaseClass}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default PromoForm;
