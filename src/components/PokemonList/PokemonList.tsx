"use client";

import Image from "next/image";
import Link from "next/link";

import { usePokemonQuery } from "@/react-query/usePokemonQuery";

function PokemonList() {
  const { data: pokemons, isPending, error } = usePokemonQuery();
  if (isPending) {
    return <div>로딩중</div>;
  }
  return (
    <div>
      {pokemons &&
        pokemons.map((pokemon) => (
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
