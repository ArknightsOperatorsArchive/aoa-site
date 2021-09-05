import React from "react";
import { useRouter } from "next/router";

import { akOperatorClasses } from "../../constants/classes";
import CoreContainer from "../../containers/main/CoreContainer";
import ErrorContainer from "../../containers/main/ErrorContainer";

const OperatorClassPage: React.FC = () => {
  const router = useRouter();

  const { operatorClass } = router.query;

  if (!akOperatorClasses.includes(operatorClass as string)) {
    return <ErrorContainer>Invalid operator class.</ErrorContainer>;
  }

  return <div>Hello!</div>;
};

export default OperatorClassPage;
