import searchClient from "../config/algolia";

export const search = (
  query: string,
  page: number = 0,
  pageSize: number = 20
) => {
  const index = searchClient.initIndex("Artworks");

  return index.search(query, {
    page: page,
    hitsPerPage: pageSize || 20,
  });
};

export default search;
