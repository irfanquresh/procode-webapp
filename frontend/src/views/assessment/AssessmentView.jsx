import React, { useState, useEffect } from "react";
import AssessmentQuestion from "./AssessmentQuestion";
import { DisplayLabel } from "views/promo/PromoView";

const AssessmentView = ({ formData, onClick }) => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState();

  useEffect(() => {
    if (formData) {
      const { questions } = formData?.test;
      setQuestions(questions);
      if (questions && questions?.length >= 1) {
        setQuestion(questions[0]);
        setQuestionNumber(1);
      }
    }
  }, [formData]);

  const submitNextQuestion = (data) => {
    console.log("🚀 --> questionNumber", questionNumber);
    console.log("🚀 --> Submitted Answer: ", data);
    if (questionNumber >= questions?.length) {
      onClick();
    } else {
      const next = questionNumber + 1;
      console.log("🚀 --> next", next);
      setQuestionNumber(next);
      setQuestion(questions[next - 1]);
    }
  };

  const setPrevQuestion = () => {
    if (questions && questions?.length) {
      if (questionNumber > 0) {
        const next = questionNumber - 1;
        setQuestionNumber(next);
        setQuestion(questions[next]);
      }
    }
  };

  if (!questions || !questions.length) {
    return <DisplayLabel message="Questions not found !!!" />;
  }

  if (questionNumber <= questions.length) {
    return (
      <AssessmentQuestion
        key={new Date()}
        formData={{ question, questionNumber }}
        onClick={(data) => {
          submitNextQuestion(data);
        }}
      />
    );
  }
};

export default AssessmentView;
