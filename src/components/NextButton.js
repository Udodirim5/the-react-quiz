import { useQuiz } from "../hooks/useQuiz";


const NextButton = () => {
  const { dispatch, answer, index, numQuestions } = useQuiz();
  if (answer === null) {
    return null;
  }

  const isLastQuestion = index === numQuestions - 1;
  return (
    <Button
      dispatch={dispatch}
      actionType={isLastQuestion ? "finish" : "nextQuestion"}
    >
      {isLastQuestion ? "Finish" : "Next"}
    </Button>
  );
};

const Button = ({ dispatch, actionType, children }) => {
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: actionType })}
    >
      {children}
    </button>
  );
};

export default NextButton;
