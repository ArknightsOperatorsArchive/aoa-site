import React from "react";
import { NextPageContext } from "next";
import CoreContainer from "../containers/main/CoreContainer";
import search from "../services/algolia";

const SearchPage = (props: { data }) => {
  console.log(props);
  return <CoreContainer>Search page</CoreContainer>;
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  const searchTarget = query["q"] as string;
  const results = await search(searchTarget);
  if (!results) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: results,
      searchQuery: searchTarget,
    },
  };
};

export default SearchPage;
