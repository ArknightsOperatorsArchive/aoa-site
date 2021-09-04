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
      <CoreDialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex flex-row items-center flex-1 justify-around">
          {akOperatorClasses.map((operatorClass, index) => {
            const lowercaseClass =
              operatorClass.charAt(0).toLowerCase() + operatorClass.slice(1);
            return (
              <img
                src={`/images/classes/icon_profession_${lowercaseClass}_large.png`}
                alt=""
                className="flex-shrink-0 h-20 w-20 rounded-lg"
              />
            );
          })}
        </div>
      </CoreDialog>
    </Fragment>
  );
};

export default OperatorsModal;
