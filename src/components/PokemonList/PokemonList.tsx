"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { usePokemonInfiniteQuery } from "@/react-query/usePokemonQuery";

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
      console.log("다음!");
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isPending) {
    return <div>로딩중</div>;
  }
  return (
    <div>
      {pokemons &&
        pokemons.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((pokemon) => (
              <div key={pokemon.id}>
                <Link href={`/pokemon/${pokemon.id}`}>
                  <Image
                    alt={pokemon.korean_name}
                    src={pokemon.sprites.front_default}
                    width={96}
                    height={96}
                  />
                  <p>{pokemon.korean_name}</p>
                  <p>도감번호 : {pokemon.id}</p>
                </Link>
              </div>
            ))}
          </React.Fragment>
        ))}
      <div id="ref" ref={ref}>
        {`${inView}`}
      </div>
    </div>
  );
}

export default PokemonList;
