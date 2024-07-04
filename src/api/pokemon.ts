import axios from "axios";

export type fetchPokemonData = {
  id: number;
  order: number;
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: {
    type: { korean_name: string };
  }[];
  moves: { move: { name: string; korean_name: string } }[];
  abilities: {
    ability: { korean_name: string };
  }[];
};

export const fetchPokemonData = async function (
  id: string
): Promise<fetchPokemonData> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const data = (await axios.get(`${apiUrl}/api/pokemons/${id}`)).data;
  return data;
};
