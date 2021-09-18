import React, { useState } from "react";
import { NextPageContext } from "next";

import CoreContainer from "../containers/main/CoreContainer";

import search from "../services/algolia";

import ArtistQueryResponse from "../types/SearchResponse";
import { paginate } from "../utils/paginate";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";

interface SearchPageProps {
  data: ArtistQueryResponse;
  searchQuery: string;
}
const SearchPage: React.FC<SearchPageProps> = ({ data, searchQuery }) => {
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const router = useRouter();
  const { pages } = paginate(
    data.nbHits,
    data.page + 1,
    data.hitsPerPage,
    data.nbPages
  );
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
        <div className="mt-8">
          {data.hits.map((hit) => {
            return (
              <div
                key={hit.objectID}
                className="border border-grey-500 px-4 py-2"
              >
                <span>{hit["operator.class"]}</span>
                <h3 className="text-xl font-semibold text-blue-500">
                  {hit["operator.name"]}
                </h3>
                <h4>{`By ${hit["artist.displayName"]}`}</h4>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex w-full justify-center">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            disabled={data.page === 0}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Back to Front</span>
            <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            disabled={data.page === 0}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          {pages.map((pageNumber) => {
            return (
              <button
                key={pageNumber}
                aria-current="page"
                className={
                  data.page + 1 === pageNumber
                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                }
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            disabled={data.page === data.nbPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            disabled={data.page === data.nbPages}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Back to End</span>
            <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </CoreContainer>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  const searchTarget = (query["q"] as string) || "";
  const pageNumber = query["page"] as string;
  const pageSize = query["size"] as string;

  const results = await search(searchTarget, pageNumber, pageSize);
  return {
    props: {
      data: results,
      searchQuery: searchTarget,
    },
  };
};

export default SearchPage;
