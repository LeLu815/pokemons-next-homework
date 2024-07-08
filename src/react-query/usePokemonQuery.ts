import { Pokemon } from "@/types/Pokemons";
import {
  DefaultError,
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const ROWS_PER_PAGE = 30; // 한 페이지당 불러올 상품개수

export const usePokemonQuery = () => {
  return useQuery<AxiosResponse<Pokemon[]>, DefaultError, Pokemon[]>({
    queryKey: ["pokemons"],
    queryFn: () => axios.get("/api/pokemons"),
    select: (response) => response.data,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
  });
};

export const usePokemonInfiniteQuery = () => {
  return useInfiniteQuery<
    Pokemon[],
    DefaultError,
    InfiniteData<Pokemon[], number>,
    QueryKey,
    number
  >({
    queryKey: ["pokemons"],
    queryFn: async ({ pageParam = 0 }) => {
      const response: AxiosResponse<Pokemon[]> = await axios.get(
        `/api/pokemons/?limit=${ROWS_PER_PAGE}&offset=${pageParam}`
      );
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === ROWS_PER_PAGE) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
    initialPageParam: 0,
    retry: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
  });
};

// 데이터가 남아있어야 돌아올 곳이 있다.
