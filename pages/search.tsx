import React, { useEffect, useState } from "react";
import { NextPageContext } from "next";
import Link from "next/link";

import CoreContainer from "../containers/main/CoreContainer";

import ArtistQueryResponse from "../types/SearchResponse";
import { useRouter } from "next/router";

interface SearchPageProps {
  data: ArtistQueryResponse;
  searchQuery: string;
}
const SearchPage: React.FC<SearchPageProps> = ({ searchQuery }) => {
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  useEffect(() => {
    function fetchData() {
      console.log('fetching data!')
    }
    fetchData()
  })

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
      </div>
    </CoreContainer>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  const searchTarget = (query["q"] as string) || "";

  return {
    props: {
      searchQuery: searchTarget,
    },
  };
};


export default SearchPage;
