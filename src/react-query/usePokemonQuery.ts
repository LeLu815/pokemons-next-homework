import { Pokemon } from "@/types/Pokemons";
import { DefaultError, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const usePokemonQuery = () => {
  return useQuery<AxiosResponse<Pokemon[]>, DefaultError, Pokemon[]>({
    queryKey: ["pokemons"],
    queryFn: () => axios.get("/api/pokemons"),
    select: (response) => response.data,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
  });
};
