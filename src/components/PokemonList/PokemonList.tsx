"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import {
  ROWS_PER_PAGE,
  usePokemonInfiniteQuery,
} from "@/react-query/usePokemonQuery";
import PokemonCard from "../PokemonCard";
import CircularIndeterminate from "../Progress/Progress";
import SkeletonComponent from "../Skeleton/Skeleton";

function PokemonList() {
  const { ref, inView, entry } = useInView();
  const {
    data: pokemons,
    isLoading,

    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = usePokemonInfiniteQuery();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return (
      <div className="grid gap-3 min-[320px]:grid-cols-2 min-[500px]:grid-cols-3 sm:grid-cols-4 min-[900px]:grid-cols-5 lg:grid-cols-6">
        {Array.from({ length: ROWS_PER_PAGE }, (_, index) => {
          return <SkeletonComponent key={index} />;
        })}
      </div>
    );
  }
  return (
    <>
      <div className="grid gap-3 min-[320px]:grid-cols-2 min-[500px]:grid-cols-3 sm:grid-cols-4 min-[900px]:grid-cols-5 lg:grid-cols-6">
        {pokemons &&
          pokemons.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </React.Fragment>
          ))}
      </div>
      <div className="h-[200px] flex items-center justify-center" ref={ref}>
        {isFetchingNextPage && <CircularIndeterminate />}
      </div>
    </>
  );
}

export default PokemonList;
