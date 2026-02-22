import React from "react";
import { useState } from "react"
import StartScreen from "./components/StartScreen"
import { questions } from "./constants/questions";
import QuestionScreen from "./components/QuestionScreen";
import { levels } from "./constants/levels";
import EndScreen from "./components/EndScreen";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [earned, setEarned] = useState(0);

  const [jokers, setJokers] = useState({
    fiftyFifty: true,
    skipQuestion: true
  });

  function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function startGame() {
    const shuffledQuestions = shuffle(questions);
    const selectedQuestions = shuffledQuestions.slice(0, 10).map(q => ({
      ...q,
      answers: shuffle(q.answers)
    }));

    setGameStarted(true);
    setSelectedQuestions(selectedQuestions);
    setCurrentQuestion(0);
    setGameOver(false);
    setEarned(0);
  }

  function handleAnswer(isCorrect) {
    if (isCorrect) {
      if (currentQuestion === 9) {
        setEarned(500000);
        setGameOver(true);
      } else {
        setCurrentQuestion(prev => prev + 1);
      }
    } else {
      if (currentQuestion >= 4) {
        setEarned(5000);
      } else {
        setEarned(0);
      }
      setGameOver(true);
    }
  }

  function resetGame() {
    setGameStarted(false);
    setSelectedQuestions([]);
    setCurrentQuestion(0);
    setGameOver(false);
    setEarned(0);
  }

  function handleFiftyFifty() {
    setJokers(prev=> ({
      ...prev, 
      fiftyFifty: false
    }));
  }

  function handleSkip() {
   if(currentQuestion === 9) {
    setGameOver(true);
   } else {
    setCurrentQuestion(prev => prev + 1);
   }

   setJokers(prev => ({
    ...prev, 
    skipQuestion: false
   }));
  }

  if(!gameStarted) 
    return (<StartScreen onStart = {startGame}/>);

  if(gameOver)
    return (<EndScreen earned={earned} onRestart={resetGame}/>);

  return (<QuestionScreen question={selectedQuestions[currentQuestion]} currentLevel={currentQuestion} levels={levels} onAnswer={handleAnswer} jokers={jokers} onFiftyFifty={handleFiftyFifty} onSkip={handleSkip}/>);
}

export default App

