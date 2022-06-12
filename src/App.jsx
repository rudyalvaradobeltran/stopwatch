import React, { useState, useEffect } from "react";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
      if (seconds === 60) {
        setSeconds(0);
        setMinutes((prevMinutes) => prevMinutes + 1);
      }
      if (minutes === 60) {
        setMinutes(0);
        setHours((prevHours) => prevHours + 1);
      }
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn, seconds, minutes]);

  const reset = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setTimerOn(false);
  };

  return (
    <div className="App">
      <div>
        <span>
          {`${hours < 10 ? `0${hours}` : hours}:${
            minutes < 10 ? `0${minutes}` : minutes
          }:${seconds < 10 ? `0${seconds}` : seconds}`}
        </span>
      </div>
      <div>
        <button
          onClick={() => setTimerOn(true)}
          disabled={timerOn || seconds !== 0}
        >
          Start
        </button>
        <button onClick={() => setTimerOn(false)} disabled={!timerOn}>
          Stop
        </button>
        <button
          onClick={() => setTimerOn(true)}
          disabled={timerOn || seconds === 0}
        >
          Resume
        </button>
        <button
          onClick={reset}
          disabled={seconds === 0 && minutes === 0 && hours === 0}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
