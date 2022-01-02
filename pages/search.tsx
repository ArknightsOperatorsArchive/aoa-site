import React, { useEffect, useState } from "react";
import { NextPageContext } from "next";
import Link from "next/link";
import Fuse from 'fuse.js'

import CoreContainer from "../containers/main/CoreContainer";

import { useRouter } from "next/router";
import { useFunctions } from "../firebase/firebase";
import Artwork from "../types/Artwork";

interface SearchPageProps {
  result: Fuse.FuseResult<Artwork>[]
  searchQuery: string;
}

const searchOptions = {
  includeScore: true,
  distance: 30,
  keys: ['artist.displayName', {
    name: 'operator.name',
    weight: 3
  }]
}

const SearchPage: React.FC<SearchPageProps> = ({ result, searchQuery }) => {
  const [searchTerm, setSearchTerm] = useState(searchQuery);


  const router = useRouter();

  return (
    <CoreContainer>
      <div className="py-4 px-2">
        <div className="font-black uppercase italic leading-6 flex-1">
          <h2 className="text-7xl">search.</h2>
          <div className="mt-3">
            <input
              type="text"
              name="search"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push(`/search?q=${searchTerm}`);
                }
              }}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="search for an artist or operator..."
            />
          </div>
        </div>
      </div><div className="mt-8">
        {result.map((artwork) => {
          const { item } = artwork

          const { operator, artist } = item
          return (
            <Link href={`/artworks/${item.uid}`} key={item.uid}>
              <div className="border border-grey-500 px-4 py-2">
                <span>{operator.class}</span>
                <h3 className="text-xl font-semibold text-blue-500">
                  {operator.name}
                </h3>
                <h4>{`By ${artist.displayName}`}</h4>
              </div>
            </Link>
          );
        })}
      </div>
    </CoreContainer>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  const searchTarget = (query["q"] as string) || "";

  const functions = useFunctions();
  const getArtworks = functions.httpsCallable('getAllArtworks')

  const artworks = await getArtworks({
    projectId: 'main'
  }).then(resp => {
    return resp as { data: Artwork[] }
  })

  const fuse = new Fuse(artworks.data, searchOptions)

  const result = fuse.search(searchTarget)

  return {
    props: {
      result,
      searchQuery: searchTarget,
    },
  };
};


export default SearchPage;
