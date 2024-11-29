import { useEffect, useReducer } from "react";
import questionsData from '../data/questions';


import Main from "./Main";
import Error from "./Error";
import Timer from "./Timer";
import Header from "./Header";
import Loader from "./Loader";
import Footer from "./Footer";
import Progress from "./Progress";
import Questions from "./Questions";
import NextButton from "./NextButton";
import StartScreen from "./StartScreen";
import FinishScreen from "./FinishScreen";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
  highScore: 0,
  timerRemaining: null,
};

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "errorReceived":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active", timerRemaining: state.questions.length * SECS_PER_QUESTION };
    case "nweAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.score > state.highScore ? state.score : state.highScore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "timerTick":
      return {
        ...state,
        timerRemaining: state.timerRemaining - 1,
        status: state.timerRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action is not recognized");
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  const { questions, status, index, answer, score, highScore, timerRemaining } =
    state;

  const numQuestions = questions.length;
  const maxPossibleScore = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  // for fetching the data
  // useEffect(() => {
  //   const fetchQuestion = async () => {
  //     try {
  //       const res = await fetch("/questions.json/");
  //       const data = await res.json();
  //       dispatch({ type: "dataReceived", payload: data });
  //     } catch (err) {
  //       dispatch({ type: "errorReceived" });
  //     }
  //   };
  //   fetchQuestion();
  // }, []);


useEffect(() => {
  dispatch({ type: "dataReceived", payload: questionsData });
}, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "errorReceived" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              score={score}
              answer={answer}
              numQuestions={numQuestions}
              maxPossibleScore={maxPossibleScore}
            />
            <Questions
              answer={answer}
              dispatch={dispatch}
              question={questions[index]}
            />
            <Footer>
              <Timer dispatch={dispatch} timerRemaining={timerRemaining} />
              <NextButton
                index={index}
                answer={answer}
                dispatch={dispatch}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            score={score}
            dispatch={dispatch}
            highScore={highScore}
            maxPossibleScore={maxPossibleScore}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
