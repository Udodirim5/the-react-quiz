import { useQuiz } from "../hooks/useQuiz";

const Options = () => {
  const { questions, index, dispatch, answer } = useQuiz();

  // Get the current question
  const currentQuestion = questions[index];
  const hasAnswer = answer !== null;

  // Guard: Render nothing if no question is loaded
  if (!currentQuestion) return null;

  return (
    <div className="options">
      {currentQuestion.options.map((option, optionIndex) => (
        <button
          key={option}
          className={`btn btn-option ${optionIndex === answer ? "answer" : ""} ${
            hasAnswer
              ? optionIndex === currentQuestion.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswer}
          onClick={() =>
            dispatch({ type: "nweAnswer", payload: optionIndex })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
