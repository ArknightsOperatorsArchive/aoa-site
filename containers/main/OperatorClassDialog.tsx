import { motion } from "framer-motion";
import Link from "next/link";
import React, { Fragment, useState } from "react";

import UnderlineButton from "../../components/UnderlineButton";
import { akOperatorClasses } from "../../constants/classes";
import CoreDialog from "./CoreDialog";

const OperatorsModal: React.FC = () => {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <Fragment>
      <UnderlineButton
        onClick={() => setIsOpen(true)}
        className="text-2xl my-2"
      >
        operators
      </UnderlineButton>
      <CoreDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalHeading="Operators"
      >
        <div className="grid grid-cols-3 md:grid-cols-5 flex-1 justify-around mt-4">
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
      </CoreDialog>
    </Fragment>
  );
};

export default OperatorsModal;
