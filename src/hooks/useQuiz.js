import { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";

const useQuiz = () => {
  const contexts = useContext(QuizContext);
  if (!contexts || contexts === undefined) {
    throw new Error("useAuth must be used within a QuizContext");
  }
  return contexts;
};

export { useQuiz };
