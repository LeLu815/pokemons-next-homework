import Image from "next/image";
import Link from "next/link";

import { Pokemon } from "@/types/Pokemons";

type PokemonCardProps = {
  pokemon: Pokemon;
};

function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div
      className="flex max-w-[270px] justify-center items-center border border-slate-500 aspect-square rounded-md cursor-pointer text-white"
      key={pokemon.id}
    >
      <Link
        className="flex justify-center items-center flex-col"
        href={`/pokemon/${pokemon.id}`}
      >
        <Image
          alt={pokemon.korean_name}
          src={pokemon.sprites.front_default}
          width={96}
          height={96}
        />
        <p className="w-full text-left">{pokemon.korean_name}</p>
        <p className="font-extralight w-full text-left text-slate-400">
          도감번호 : {pokemon.id}
        </p>
      </Link>
    </div>
  );
}

export default PokemonCard;
