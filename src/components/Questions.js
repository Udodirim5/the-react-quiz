import Options from "./Options";
import { useQuiz } from "../hooks/useQuiz";

const Questions = () => {

  const { questions, index } = useQuiz();
  const currentQuestion = questions[index];

  return (
    <div>
      <h4>{currentQuestion.question}</h4>
      <Options />
    </div>
  );
};

export default Questions;
