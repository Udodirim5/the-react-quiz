import { useQuiz } from "../hooks/useQuiz";

import Main from "./Main";
import Error from "./Error";
import Timer from "./Timer";
import Loader from "./Loader";
import Footer from "./Footer";
import Progress from "./Progress";
import Questions from "./Questions";
import NextButton from "./NextButton";
import StartScreen from "./StartScreen";
import FinishScreen from "./FinishScreen";

const QuizContent = () => {
  const { status } = useQuiz();

  return (
    <Main>
      {status === "loading" && <Loader />}
      {status === "errorReceived" && <Error />}
      {status === "ready" && <StartScreen />}
      {status === "active" && (
        <>
          <Progress />
          <Questions />
          <Footer>
            <Timer />
            <NextButton />
          </Footer>
        </>
      )}
      {status === "finished" && <FinishScreen />}
    </Main>
  );
};

export default QuizContent;
