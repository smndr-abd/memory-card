export default function ScorePanel({ current, best }) {
  return (
    <div className="score-panel">
      <div className="score-item">
        <span className="score-label">Score</span>
        <span className="score-value current-score">{current}</span>
      </div>
      <div className="score-divider" />
      <div className="score-item">
        <span className="score-label">Best</span>
        <span className="score-value best-score">{best}</span>
      </div>
    </div>
  );
}
