import searchClient from "../config/algolia";

/**
 * performs a search against Algolia
 * @param query: the query string to be searched
 * @param page: the current page to be searched against
 * @param pageSize: the size of the page
 * @returns an the search promise provided by Algolia
 */
export const search = (
  query: string,
  page: string = "0",
  pageSize: string = "20"
) => {
  const index = searchClient.initIndex("Artworks");

  return index.search(query, {
    page: parseInt(page) || 0,
    hitsPerPage: parseInt(pageSize) || 20,
  });
};

export default search;
