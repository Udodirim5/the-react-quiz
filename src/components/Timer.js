import { useEffect } from "react";
import { useQuiz } from "../hooks/useQuiz";


const Timer = () => {
  const { dispatch, timerRemaining } = useQuiz();
  const mins = Math.floor(timerRemaining / 60);
  const secs = timerRemaining % 60;
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: "timerTick" });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && "0" }
      {mins}:{secs.toString().padStart(2, "0")}
    </div>
  );
};

export default Timer;
