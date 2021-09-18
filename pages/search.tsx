import React from "react";
import { NextPageContext } from "next";
import CoreContainer from "../containers/main/CoreContainer";
import search from "../services/algolia";

const SearchPage = (props: any) => {
  console.log(props);
  return (
    <CoreContainer>
      Search page
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </CoreContainer>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  const searchTarget = query["q"] as string;
  const pageNumber = query["page"] as string;
  const pageSize = query["size"] as string;
  const results = await search(searchTarget, pageNumber, pageSize);
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
