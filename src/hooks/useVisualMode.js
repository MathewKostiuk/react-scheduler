import { useState } from "react";

  export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    function transition(newMode, replace = false) {
      setMode(newMode);
      replace ?
        setHistory(history => ([...history.slice(0, history.length - 1), newMode])) :
        setHistory(history => ([...history, newMode]));
    }

    function back() {
      if (history.length > 1) {
        history.pop();
        setMode(history[history.length - 1]);
      }
    }

    return { mode, transition, back };
  }
