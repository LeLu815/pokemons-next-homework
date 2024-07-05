export type Pokemon = {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: { type: { name: string; korean_name: string } }[];
  abilities: { ability: { name: string; korean_name: string } }[];
  moves: { move: { name: string; korean_name: string } }[];
};

export type PokemonResponse = {
  // 필요한 필드를 여기에 정의합니다.
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: { type: { name: string; korean_name: string } }[];
  abilities: { ability: { name: string; korean_name: string } }[];
  moves: { move: { name: string; korean_name: string } }[];
};

export type PokemonSpeciesResponse = {
  names: Array<{
    language: {
      name: string;
    };
    name: string;
  }>;
};
