import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import CoreContainer from "../containers/main/CoreContainer";
import { akOperatorClasses } from "../constants/classes";

const OperatorsPage = () => {
  return (
    <CoreContainer>
      <div className="py-4 px-2">
        <div className="font-black italic leading-6 flex-1">
          <h2 className="text-6xl">operators.</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 flex-1 justify-around mt-4">
          {akOperatorClasses.map((operatorClass, index) => {
            const lowercaseClass =
              operatorClass.charAt(0).toLowerCase() + operatorClass.slice(1);
            return (
              <Link href={`/classes/${operatorClass}`}>
                <motion.div
                  whileHover={{
                    y: -10,
                  }}
                >
                  {operatorClass !== "Other" && (
                    <img
                      src={`/images/classes/icon_profession_${lowercaseClass}_large.png`}
                      alt={`${operatorClass} image`}
                      className="flex-shrink-0 h-20 w-20 mx-2 my-2 rounded-lg "
                      key={index}
                    />
                  )}
                  {operatorClass === "Other" && (
                    <div className="bg-black h-20 w-20 rounded-lg mx-2 my-2 flex justify-center items-center">
                      Other
                    </div>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </CoreContainer>
  );
};

export default OperatorsPage;
