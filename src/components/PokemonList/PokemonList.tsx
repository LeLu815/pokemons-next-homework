"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Pokemon } from "@/types/Pokemons";

function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  useEffect(() => {
    (async () => {
      const data = (await axios.get("/api/pokemons")).data;
      setPokemons(data);
    })();
  }, []);
  return (
    <div>
      {pokemons.map((pokemon) => (
        <div key={pokemon.id}>
          <Link href={`/pokemon/${pokemon.id}`}>
            <Image
              alt={pokemon.korean_name}
              src={pokemon.sprites.front_default}
              width={96}
              height={96}
            />
            <p>{pokemon.korean_name}</p>
            <p>도감번호 : {pokemon.id}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PokemonList;
