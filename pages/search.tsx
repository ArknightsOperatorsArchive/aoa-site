import React from "react";

import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from "react-instantsearch-dom";

import CoreContainer from "../containers/main/CoreContainer";
import ALGOLIA_CONFIG from "../config/algolia";
import { BasicDoc, Hit } from "react-instantsearch-core";

const searchClient = algoliasearch(
  ALGOLIA_CONFIG.APP_ID as string,
  ALGOLIA_CONFIG.API_KEY as string
);

const SearchPage = () => {
  return (
    <CoreContainer>
      <div className="flex flex-1 flex-col">
        <h2 className="text-4xl font-semibold italics">search.</h2>
        <InstantSearch indexName="Artworks" searchClient={searchClient}>
          <div className="flex flex-col">
            <div className="flex flex-1 flex-row flex-wrap">
              <div className="min-w-md">
                <ClearRefinements />
                <h2>Operator Class</h2>
                <RefinementList attribute="operator.class" />
                <Configure hitsPerPage={8} />
              </div>
              <div className="flex-1 min-w-md">
                <SearchBox />
                <Hits hitComponent={HitComponent} />
              </div>
            </div>
            <div className="flex flex-row">
              <Pagination />
            </div>
          </div>
        </InstantSearch>
      </div>
    </CoreContainer>
  );
};

const HitComponent: React.FC<{ hit: Hit<BasicDoc> }> = (hit) => {
  console.log(hit);
  return (
    <div className="border-grey-100 border my-2 px-2 py-1">
      <span className="text-sm font-semibold text-grey-300">
        {hit.hit["operator.class"]}
      </span>
      <h4 className="text-2xl font-semibold">{hit.hit["operator.name"]}</h4>
      <h5 className="text-xl">by {hit.hit["artist.displayName"]}</h5>
    </div>
  );
};

export default SearchPage;
