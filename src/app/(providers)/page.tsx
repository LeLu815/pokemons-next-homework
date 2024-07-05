import PokemonList from "@/components/PokemonList/PokemonList";

export default function Home() {
  return (
    <div className="mt-20 mx-auto min-w-[320px] max-w-[1024px]">
      <h1 className="mb-12 text-white text-center font-semibold text-3xl">
        포켓몬 도감
      </h1>
      <PokemonList />
    </div>
  );
}
