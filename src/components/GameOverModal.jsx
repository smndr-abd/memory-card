export default function GameOverModal({ won, score, total, onRestart }) {
  return (
    <div className="modal-overlay">
      <div className={`modal ${won ? "modal-win" : "modal-lose"}`}>
        <div className="modal-emoji">{won ? "🏆" : "💥"}</div>
        <h2 className="modal-title">
          {won ? "You Caught 'Em All!" : "Got You!"}
        </h2>
        <p className="modal-sub">
          {won
            ? `Perfect score! ${score}/${total} cards!`
            : `You clicked the same Pokémon twice. Score: ${score}`}
        </p>
        <button className="btn-restart" onClick={onRestart}>
          {won ? "Play Again" : "Try Again"}
        </button>
      </div>
    </div>
  );
}
