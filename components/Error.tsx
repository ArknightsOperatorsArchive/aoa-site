import { ExclamationCircleIcon } from "@heroicons/react/outline";
import React from "react";

const ErrorComponent: React.FC = ({ children }) => {
  return (
    <div className="mt-4 mb-2 flex items-center justify-center flex-col text-center">
      <div>
        <ExclamationCircleIcon className="h-10 w-10 text-red-500" />
      </div>
      <div className="flex-1 items-center px-1 py-1 justify-center">
        {children}
      </div>
    </div>
  );
};

export default ErrorComponent;
