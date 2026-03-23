export default function LoadingScreen() {
  return (
    <div className="loading">
      <svg className="loading-pokeball" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="28" fill="white" stroke="#333" strokeWidth="3" />
        <path d="M2 30 Q30 30 58 30" stroke="#333" strokeWidth="5" fill="none" />
        <path d="M2 30 Q2 2 30 2 Q58 2 58 30" fill="#ee4444" />
        <circle cx="30" cy="30" r="9" fill="white" stroke="#333" strokeWidth="3" />
      </svg>
      <p className="loading-text">Loading Pokémon...</p>
    </div>
  );
}
