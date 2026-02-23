import { useState, useEffect } from "react"
import React from "react";

const QuestionScreen = ({ question, currentLevel, levels, onAnswer, jokers, onFiftyFifty, onSkip, onChangeQuestion}) => {
   const [selectedAnswer, setSelectedAnswer] = useState(null);
   const [hiddenAnswers, setHiddenAnswers] = useState([]);

   const handleclick = (answer) => {
      if(selectedAnswer) return;
      setSelectedAnswer(answer);
      setTimeout(() => {
         onAnswer(answer.correct);
         setSelectedAnswer(null)
      }, 2500);
   };

   function handleFiftyFifty() {
    const wrongAnswers = question.answers.map((a, i) => (!a.correct ? i : null)).filter(i => i !== null);
    const toRemove = wrongAnswers.sort(() => Math.random() - 0.5).slice(0, 2);

    setHiddenAnswers(toRemove);
    onFiftyFifty();
  }

  useEffect(() => {
   setHiddenAnswers([]);
  }, [question]);

   return (
      <div className="question-screen">
         <div className="question-main">
            <div className="question">
               <h2>Pitanje {currentLevel + 1}: {levels[currentLevel]}€</h2>
               <p>{question.question}</p>
            </div>
            <div className="jokers">
               <button disabled={!jokers.fiftyFifty} onClick={handleFiftyFifty}>50:50</button>
               <button disabled={!jokers.skipQuestion} onClick={onSkip}>Preskoči pitanje</button>
               <button disabled={!jokers.changeQuestion} onClick={onChangeQuestion}>Zamijeni pitanje</button>
            </div>
            <div className="answers">
               {question.answers.map((answer, index) => {
                  if (hiddenAnswers.includes(index)) return null;
                  let className = "answer";
                  if (selectedAnswer) {
                     if (answer === selectedAnswer) {
                        className += answer.correct ? " correct" : " wrong";
                     } else if (answer.correct) {
                        className += " correct"
                     }
                  }

                  return (
                     <button key={index} className={className} onClick={() => handleclick(answer)}>{answer.text}</button>
                  );
               })}
            </div>
         </div>

         <div className="sidebar">
            <div className="levels">
               {levels.map((level, i) => (
                  <div key={i} className={i === 4 ? "safe-level" : i === currentLevel ? "current-level" : ""}>{level}€</div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default QuestionScreen;