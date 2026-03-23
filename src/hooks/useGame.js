import { useState, useEffect, useCallback } from "react";
import { POKEMON_IDS } from "../constants";
import { shuffleArray } from "../utils/shuffleArray";

export function useGame() {
  const [pokemon, setPokemon] = useState([]);
  const [clicked, setClicked] = useState(new Set());
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [shuffled, setShuffled] = useState([]);
  const [gameOver, setGameOver] = useState(null); // null | 'win' | 'lose'
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      const data = await Promise.all(
        POKEMON_IDS.map(async (id) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const json = await res.json();
          return {
            id: json.id,
            name: json.name.charAt(0).toUpperCase() + json.name.slice(1),
            sprite:
              json.sprites.other["official-artwork"].front_default ||
              json.sprites.front_default,
            types: json.types.map((t) => t.type.name),
          };
        })
      );
      setPokemon(data);
      setShuffled(shuffleArray(data));
      setLoading(false);
    }
    fetchPokemon();
  }, []);

  const handleCardClick = useCallback(
    (id) => {
      if (animating || gameOver) return;

      if (clicked.has(id)) {
        if (score > best) setBest(score);
        setGameOver("lose");
        return;
      }

      const newClicked = new Set(clicked).add(id);
      const newScore = score + 1;
      setClicked(newClicked);
      setScore(newScore);
      if (newScore > best) setBest(newScore);

      if (newClicked.size === pokemon.length) {
        setGameOver("win");
        return;
      }

      setAnimating(true);
      setTimeout(() => {
        setShuffled(shuffleArray(pokemon));
        setAnimating(false);
      }, 300);
    },
    [animating, gameOver, clicked, score, best, pokemon]
  );

  const handleRestart = useCallback(() => {
    setClicked(new Set());
    setScore(0);
    setGameOver(null);
    setShuffled(shuffleArray(pokemon));
  }, [pokemon]);

  return {
    pokemon,
    shuffled,
    score,
    best,
    gameOver,
    loading,
    animating,
    handleCardClick,
    handleRestart,
  };
}
