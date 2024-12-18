import { useQuiz } from "../hooks/useQuiz";
const StartScreen = () => {
  const { numQuestions, dispatch } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to the Quiz App!</h2>
      <h3>{numQuestions} questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default StartScreen;
