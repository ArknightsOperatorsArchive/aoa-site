import { SearchIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";

const variants = {
  open: { width: "300px", x: 0 },
  closed: { x: -1 },
};
const NavSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="text-white">
      <motion.div
        className="bg-gray-900 py-4 px-2 flex items-center"
        variants={variants}
        animate={isOpen ? "open" : "closed"}
      >
        <SearchIcon
          className="h-8 w-8 mr-2"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        {!isOpen && <h2 className="text-lg font-semibold">Search</h2>}
        <motion.input
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
          className={`shadow-sm focus:border-indigo-500 ${
            isOpen ? "block" : "hidden"
          } w-full sm:text-sm border-b-1 border-gray-300 rounded-md bg-transparent`}
          placeholder="search for an artist or operator..."
        />
      </motion.div>
    </div>
  );
};

export default NavSearch;
