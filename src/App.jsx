import { useGame } from "./hooks/useGame";
import PokemonCard from "./components/PokemonCard";
import ScorePanel from "./components/ScorePanel";
import GameOverModal from "./components/GameOverModal";
import LoadingScreen from "./components/LoadingScreen";
import "./styles/index.css";

function Stars() {
  return (
    <div className="stars">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            "--dur": `${2 + Math.random() * 4}s`,
            "--delay": `${Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const {
    pokemon,
    shuffled,
    score,
    best,
    gameOver,
    loading,
    animating,
    handleCardClick,
    handleRestart,
  } = useGame();

  return (
    <div className="game-root">
      <Stars />

      <header className="header">
        <h1 className="game-title">Memory Card</h1>
        <p className="game-subtitle">Don't click the same Pokémon twice!</p>
      </header>

      <ScorePanel current={score} best={best} />

      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="progress-bar-wrap">
            <div
              className="progress-bar-fill"
              style={{ width: `${(score / pokemon.length) * 100}%` }}
            />
          </div>

          <p className="instruction">
            {score}/{pokemon.length} — Click each Pokémon once!
          </p>

          <div className={`card-grid ${animating ? "animating" : ""}`}>
            {shuffled.map((p) => (
              <PokemonCard key={p.id} pokemon={p} onClick={handleCardClick} />
            ))}
          </div>
        </>
      )}

      {gameOver && (
        <GameOverModal
          won={gameOver === "win"}
          score={score}
          total={pokemon.length}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
