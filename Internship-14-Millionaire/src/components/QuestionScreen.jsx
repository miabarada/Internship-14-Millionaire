import { useState } from "react"
import React from "react";

const QuestionScreen = ({ question, currentLevel, levels, onAnswer}) => {
   const [selectedAnswer, setSelectedAnswer] = useState(null);

   const handleclick = (answer) => {
      if(selectedAnswer) return;
      setSelectedAnswer(answer);
      setTimeout(() => {
         onAnswer(answer.correct);
         setSelectedAnswer(null)
      }, 5000);
   };

   return (
      <div className="question-screen">
         <div className="question-main">
            <div className="question">
               <h2>Pitanje {currentLevel + 1}: {levels[currentLevel]}€</h2>
               <p>{question.question}</p>
            </div>
            <div className="answers">
               {question.answers.map((answer, index) => {
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
                  <div key={i} className={i === currentLevel ? "current-level" : i === 4 ? "safe-level" : ""}>{level}€</div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default QuestionScreen;