import { createContext, useEffect, useReducer } from "react";
import questionsData from "../data/questions";

const QuizContext = createContext();

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

const quizReducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "errorReceived":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        timerRemaining: state.questions.length * SECS_PER_QUESTION,
      };
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

const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { questions, status, index, answer, score, highScore, timerRemaining } =
    state;

  const numQuestions = questions.length;
  const maxPossibleScore = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(() => {
    dispatch({ type: "dataReceived", payload: questionsData });
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        score,
        highScore,
        timerRemaining,
        numQuestions,
        maxPossibleScore,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizProvider };
