import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { object, array, string } from "yup";

import CheckBoxInput from "components/Form/CheckBoxInput";
import { yupValidationResolver } from "utils/yup.util";
import FormInput from "components/Form/FormInput";

// Validations
const ensureNumber = (val) => (isFinite(val) ? val : undefined);

const resolver = yupValidationResolver(
  object().shape({
    question: string().min(5).max(100).required("Title is required!"),
    ans: array()
      .of(
        object().shape({
          id: string().ensure().required("Option is required"),
        })
      )
      .min(1, "You need at least 1 Option")
      .required("Select at least 1 Option"),
  })
);

const AssessmentQuestion = ({ formData, onClick }) => {
  const { question, questionNumber } = formData;
  const [questionOptions, setQuestionOptions] = useState([]);
  const [background, setBackground] = useState();
  const {
    unregister,
    trigger,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver });

  useEffect(() => {
    const { complexity, options } = question;
    if (complexity === "Low") {
      setBackground("bg-yellow-100");
    } else if (complexity === "Medium") {
      setBackground("bg-yellow-200");
    } else {
      setBackground("bg-yellow-300");
    }

    const mappedOptions = options?.map((item, idx) => {
      return { ...item, checked: false };
    });

    setQuestionOptions(mappedOptions);
  }, [formData, question]);

  const onCheckboxChange = (selectedOption, value) => {
    unregister("ans");

    const mappedOptions = questionOptions.map((item, idx) => {
      if (item?._id === selectedOption?._id) {
        return { ...item, checked: value };
      } else {
        return item;
      }
    });

    setQuestionOptions(mappedOptions);

    mappedOptions.forEach((item, idx) => {
      if (item.checked === true) {
        const fieldName = `ans[${idx}].id`;
        const val = item?.checked === true ? selectedOption._id : "";
        setValue(fieldName, val);
        trigger("ans");
      }
    });
  };

  const onSubmit = (data) => {
    onClick(data);
  };

  if (question && questionOptions?.length > 0) {
    return (
      <div className={`w-full p-5 ${background}`}>
        <label className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">
          {questionNumber}. {question?.title}
        </label>
        <div className="hidden">
          <FormInput
            {...register("question")}
            type="text"
            name="question"
            value={question._id}
          />
          {questionOptions
            ?.filter((item) => item.checked === true)
            ?.map((item, idx) => {
              const fieldName = `ans[${idx}]`;
              return (
                <fieldset name={fieldName} key={"h-" + fieldName}>
                  <FormInput
                    {...register(`${fieldName}.id`)}
                    name={`${fieldName}.id`}
                    type="text"
                    value={item?._id}
                  />
                </fieldset>
              );
            })}
        </div>
        {questionOptions?.map((item, idx) => {
          const fieldName = `ans[${idx}]`;
          return (
            <div key={fieldName}>
              <CheckBoxInput
                type="checkbox"
                value={item?._id}
                checked={item?.checked}
                onChange={(checked) => onCheckboxChange(item, checked)}
                label={item.option}
              />
            </div>
          );
        })}
        {errors && errors?.ans ? (
          <div className="text-sm mt-2">
            <p className="text-red-400 text-md pt-0">{errors?.ans?.message}</p>
          </div>
        ) : null}

        <div className="w-full my-5">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              className="text-white text-sm font-bold bg-sky-500 active:bg-sky-400 uppercase px-6 py-2.5 rounded-2 shadow hover:shadow-lg outline-none focus:outline-none   ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default AssessmentQuestion;
