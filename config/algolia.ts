import algoliasearch from "algoliasearch";

export const ALGOLIA_CONFIG = {
  APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ID,
  API_KEY: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
};

const searchClient = algoliasearch(
  ALGOLIA_CONFIG.APP_ID as string,
  ALGOLIA_CONFIG.API_KEY as string
);

export default searchClient;
