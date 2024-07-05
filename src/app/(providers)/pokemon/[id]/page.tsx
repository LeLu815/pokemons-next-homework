import Image from "next/image";
import Link from "next/link";

import { fetchPokemonData } from "@/api/pokemon";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const name = (await fetchPokemonData(params.id)).korean_name;

  return {
    title: `${id}. ${name} : POKEMONS`,
  };
}

async function PokemonDetailPage({ params }: { params: { id: string } }) {
  const pokemonData = await fetchPokemonData(params.id);
  return (
    <div>
      <div>
        <h2>{pokemonData.korean_name}</h2>
        <p>No. {pokemonData.id.toString().padStart(4, "0")}</p>
      </div>
      <div>
        <Image
          alt={pokemonData.korean_name}
          src={pokemonData.sprites.front_default}
          width={96}
          height={96}
        />

        <p>이름 : {pokemonData.korean_name}</p>
        <div>
          <p>키 : {pokemonData.height / 10} m</p>
          <p>무게 : {pokemonData.weight / 10} kg</p>
        </div>

        <div>
          <p>기술:</p>
          <div>
            {pokemonData.moves.map((move) => (
              <div key={move.move.name}>{move.move.korean_name}</div>
            ))}
          </div>
        </div>

        <div>
          <Link href="/">뒤로가기</Link>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetailPage;
