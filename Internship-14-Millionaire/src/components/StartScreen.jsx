import React from "react";

const StartScreen = ({ onStart }) => {
   return (
      <div className="start-screen">
         <h1>Tko želi biti polumilijunaš?</h1>
         <button onClick={onStart}>Pokreni igru</button>
      </div>
   );
}

export default StartScreen;