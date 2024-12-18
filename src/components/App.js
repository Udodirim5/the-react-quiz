import Header from "./Header";
import QuizContent from "./QuizContent";
import { QuizProvider } from "../contexts/QuizContext";

const App = () => {
  return (
    <QuizProvider>
      <div className="app">
        <Header />
        <QuizContent />
      </div>
    </QuizProvider>
  );
};

export default App;
