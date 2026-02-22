import React from "react";

const EndScreen = ({ earned, onRestart }) => {
   return (
      <div className="end-screen">
         <h1>Čestitke</h1>
         <p>Osvojili ste: {earned}€</p>
         <button onClick={onRestart}>Igraj ponovo</button>
      </div>
   );
}

export default EndScreen;