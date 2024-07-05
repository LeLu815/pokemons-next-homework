import axios from "axios";
import { NextResponse } from "next/server";

import { PokemonResponse, PokemonSpeciesResponse } from "@/types/Pokemons";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "30", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  try {
    const allPokemonPromises = Array.from({ length: limit }, (_, index) => {
      const id = index + 1 + offset;
      return Promise.all([
        axios.get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`),
        axios.get<PokemonSpeciesResponse>(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        ),
      ]);
    });

    const allPokemonResponses = await Promise.all(allPokemonPromises);

    const allPokemonData = allPokemonResponses.map(
      ([response, speciesResponse], index) => {
        const koreanName = speciesResponse.data.names.find(
          (name: any) => name.language.name === "ko"
        );
        return { ...response.data, korean_name: koreanName?.name || null };
      }
    );

    return NextResponse.json(allPokemonData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
