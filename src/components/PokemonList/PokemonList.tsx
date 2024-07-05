"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { usePokemonInfiniteQuery } from "@/react-query/usePokemonQuery";
import CircularIndeterminate from "../Progress/Progress";

function PokemonList() {
  const { ref, inView, entry } = useInView();
  const {
    data: pokemons,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = usePokemonInfiniteQuery();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isPending) {
    return (
      <div className="grid gap-3 min-[320px]:grid-cols-2 min-[500px]:grid-cols-3 sm:grid-cols-4 min-[900px]:grid-cols-5 lg:grid-cols-6"></div>
    );
  }
  return (
    <>
      <div className="grid gap-3 min-[320px]:grid-cols-2 min-[500px]:grid-cols-3 sm:grid-cols-4 min-[900px]:grid-cols-5 lg:grid-cols-6">
        {pokemons &&
          pokemons.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((pokemon) => (
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
