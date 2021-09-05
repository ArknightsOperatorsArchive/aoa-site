import React from "react";

import { useRouter } from "next/router";

import AboutProjectModal from "../../containers/main/AboutProjectModal";
import OperatorsModal from "../../containers/main/OperatorClassDialog";
import CreditsModal from "../../containers/main/CreditsDialog";

export interface NavigationProps {
  type?: "default" | "compressed";
}

const Navigation: React.FC<NavigationProps> = ({ type }) => {
  const router = useRouter();

  if (type === "compressed") {
    return (
      <div className="flex flex-col flex-wrap max-w-lg">
        <button
          onClick={() => router.push("/")}
          className="bg-black text-white py-1 px-2 ml-10"
        >
          <h1 className="text-2xl leading-snug font-bold">{`Arknights: \n Operators \n Archives`}</h1>
        </button>
        <div className="ml-10 flex flex-col justify-end px-2 flex-wrap max-w-1/2">
          <AboutProjectModal />
          <OperatorsModal />
          <CreditsModal />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-wrap">
      <button
        onClick={() => router.push("/")}
        className="bg-black text-white pl-6 pr-12 pt-6 pb-14 ml-10 max-w-xs"
      >
        <h1 className="text-4xl leading-snug font-bold">{`Arknights: \n Operators \n Archives`}</h1>
      </button>
      <div className="ml-2 flex flex-col justify-end px-2 flex-wrap">
        <AboutProjectModal />
        <OperatorsModal />
        <CreditsModal />
      </div>
    </div>
  );
};

export default Navigation;
