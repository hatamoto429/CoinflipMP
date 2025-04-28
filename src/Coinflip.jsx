import { useState } from "react";
import "./Coinflip.css";

function Coinflip() {
  const [balance, setBalance] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState(null); // true = heads, false = tails
  const [playerChoice, setPlayerChoice] = useState(null); // "heads" or "tails"

  const flipCoin = () => {
    if (balance > 0 && playerChoice) {
      setFlipping(true);
      setResult(null);

      setTimeout(() => {
        const flip = Math.random() < 0.5; // true = heads, false = tails
        setResult(flip);
        setFlipping(false);

        const flipString = flip ? "heads" : "tails";
        if (flipString === playerChoice) {
          win();
        } else {
          lose();
        }

        // reset choice for next round
        setPlayerChoice(null);
      }, 1000);
    }
  };

  const win = () => {
    setBalance((prev) => prev + 1);
  };

  const lose = () => {
    setBalance((prev) => prev - 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {balance <= 0 && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          ⚠️ Your balance is empty. Please charge.
        </p>
      )}

      <button onClick={() => setBalance((prev) => prev + 1)}>
        Charge Amount
      </button>

      <p>Your Balance: {balance}</p>

      <div style={{ margin: "20px" }}>
        <button
          style={{
            fontSize: "20px",
            padding: "20px",
            marginRight: "10px",
            backgroundColor: playerChoice === "heads" ? "#a0e1ff" : "#eee",
          }}
          disabled={flipping}
          onClick={() => setPlayerChoice("heads")}
        >
          Pick Heads
        </button>
        <button
          style={{
            fontSize: "20px",
            padding: "20px",
            backgroundColor: playerChoice === "tails" ? "#a0e1ff" : "#eee",
          }}
          disabled={flipping}
          onClick={() => setPlayerChoice("tails")}
        >
          Pick Tails
        </button>
      </div>

      <button
        onClick={flipCoin}
        disabled={flipping || balance <= 0 || !playerChoice}
      >
        {flipping ? "Flipping..." : "Flip The Coin"}
      </button>

      {result !== null && (
        <>
          <h2>{result ? "🪙 Heads!" : "🪙 Tails!"}</h2>
          <p>{result === (playerChoice === "heads") ? "+1 (You win!)" : "-1 (You lose!)"}</p>
        </>
      )}
    </div>
  );
}

export default Coinflip;