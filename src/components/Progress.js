import { useQuiz } from "../hooks/useQuiz";

const Progress = () => {
  const { index, numQuestions, score, maxPossibleScore, answer } = useQuiz();

  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/ {numQuestions}
      </p>
      <p>
        <strong>{score}</strong>/{maxPossibleScore}
      </p>
    </header>
  );
};

export default Progress;
