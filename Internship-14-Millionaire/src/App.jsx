import React from "react";
import { useState } from "react"
import StartScreen from "./components/StartScreen"
import { questions } from "./constants/questions";

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

  return (
    <StartScreen onStart = {startGame}/>
  )
}

export default App

