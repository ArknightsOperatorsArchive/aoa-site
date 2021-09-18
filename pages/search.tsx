import React from "react";
import { NextPageContext } from "next";

import CoreContainer from "../containers/main/CoreContainer";

import search from "../services/algolia";

import ArtistQueryResponse from "../types/SearchResponse";

interface SearchPageProps {
  data: ArtistQueryResponse;
  searchQuery: string;
}
const SearchPage: React.FC<SearchPageProps> = (props: any) => {
  console.log(props);
  return (
    <CoreContainer>
      <div className="py-4 px-2">
        <div className="font-black uppercase italic leading-6 flex-1">
          <h2 className="text-7xl">search.</h2>
        </div>
        <div className="mt-4">
          <pre>{JSON.stringify(props, null, 2)}</pre>
        </div>
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
