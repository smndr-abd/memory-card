export default function PokemonCard({ pokemon, onClick }) {
  return (
    <div
      className="card"
      onClick={() => onClick(pokemon.id)}
      style={{ "--delay": `${Math.random() * 0.3}s` }}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="card-shine" />
          <div className="pokemon-number">#{String(pokemon.id).padStart(3, "0")}</div>
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className="pokemon-img"
            draggable={false}
          />
          <div className="pokemon-name">{pokemon.name}</div>
          <div className="pokemon-type">
            {pokemon.types.map((t) => (
              <span key={t} className={`type-badge type-${t}`}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="card-back">
          <div className="pokeball-icon">
            <div className="pokeball-top" />
            <div className="pokeball-middle" />
            <div className="pokeball-bottom" />
            <div className="pokeball-button" />
          </div>
        </div>
      </div>
    </div>
  );
}
