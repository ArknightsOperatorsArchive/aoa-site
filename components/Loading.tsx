import React from "react";

interface LoadingComponentProps {
  loadingMessage?: string;
}
const Loading: React.FC<LoadingComponentProps> = ({
  loadingMessage = "Loading...",
}) => {
  return (
    <div className="mt-4 mb-2 flex items-center justify-center flex-col">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      <div>{loadingMessage}</div>
    </div>
  );
};

export default Loading;
