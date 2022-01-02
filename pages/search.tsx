import React, { useState } from "react";
import { NextPageContext } from "next";
import Link from "next/link";

import CoreContainer from "../containers/main/CoreContainer";

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
  return (
    <CoreContainer>
      Test
    </CoreContainer>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  const searchTarget = (query["q"] as string) || "";
  const pageNumber = query["page"] as string;
  const pageSize = query["size"] as string;

  // const results = await search(searchTarget, pageNumber, pageSize);
  return {
    props: {
      data: { hits: [] },
      searchQuery: searchTarget,
    },
  };
};

export default SearchPage;
