import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import CoreContainer from "../containers/main/CoreContainer";
import { akOperatorClasses } from "../constants/classes";

const OperatorsPage = () => {
  return (
    <CoreContainer>
      <div className="py-4 px-2">
        <div className="font-black italic leading-6 flex-1 text-center">
          <h2 className="text-6xl">operators.</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 flex-1 justify-around mt-4 px-8">
          {akOperatorClasses.map((operatorClass, index) => {
            const lowercaseClass =
              operatorClass.charAt(0).toLowerCase() + operatorClass.slice(1);
            return (
              <Link href={`/classes/${operatorClass}`} key={operatorClass}>
                <motion.div
                  whileHover={{
                    y: -10,
                  }}
                >
                  <img
                    src={`/images/classes/${lowercaseClass}.png`}
                    alt={`${operatorClass} image`}
                    className="flex-shrink-0 h-20 w-20 mx-2 my-2 rounded-lg "
                    key={index}
                  />
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
