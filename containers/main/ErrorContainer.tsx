import React from "react";

import { ExclamationCircleIcon } from "@heroicons/react/outline";

import CoreContainer from "./CoreContainer";

interface ErrorContainerProps {
  heading?: string;
}

const ErrorContainer: React.FC<ErrorContainerProps> = ({
  children,
  heading = "An Error Occured",
}) => {
  return (
    <CoreContainer>
      <div className="flex-1 py-12 px-12">
        <div className="flex items-center">
          <ExclamationCircleIcon className="h-10 w-10 text-red-500" />
          <h1 className="text-3xl font-semibold ml-2">{heading}</h1>
        </div>
        <div className="mt-2">
          <h2 className="text-2xl">{children}</h2>
        </div>
      </div>
    </CoreContainer>
  );
};

export default ErrorContainer;
