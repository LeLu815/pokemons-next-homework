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
    <div className="mx-auto min-w-[320px] max-w-[640px] bg-white rounded-[15px] my-10 overflow-hidden">
      <div className="bg-[#e5e7ea] py-4 flex justify-center items-center flex-col gap-1">
        <h2 className="font-semibold text-2xl">{pokemonData.korean_name}</h2>
        <p className="font-normal text-sm text-slate-500">
          No. {pokemonData.id.toString().padStart(4, "0")}
        </p>
      </div>
      <div className="flex justify-center items-center flex-col">
        <Image
          alt={pokemonData.korean_name}
          src={pokemonData.sprites.front_default}
          width={96}
          height={96}
        />

        <p className="text-xl mb-1">이름 : {pokemonData.korean_name}</p>
        <div className="flex gap-2">
          <p className="font-light">키 : {pokemonData.height / 10} m</p>
          <p className="font-light">무게 : {pokemonData.weight / 10} kg</p>
        </div>

        <div>
          <p className="text-center py-4 font-bold">기술:</p>
          <div className="overflow-y-auto flex gap-1 px-4 flex-wrap justify-center">
            {pokemonData.moves.map((move) => (
              <div className="" key={move.move.name}>
                {move.move.korean_name}
              </div>
            ))}
          </div>
        </div>

        <div className="py-6">
          <Link
            className="px-3 py-1.5 bg-blue-500 border-none rounded text-white cursor-pointer"
            href="/"
          >
            뒤로가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetailPage;
