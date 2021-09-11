import React from "react";

import Navigation, { NavigationProps } from "../../components/core/Navigation";

import styles from "../../styles/Home.module.css";

interface CoreContainerProps {
  navigationProps?: NavigationProps;
}

const CoreContainer: React.FC<CoreContainerProps> = ({
  children,
  navigationProps,
}) => {
  return (
    <div className={styles.container}>
      <div className="w-screen flex flex-col min-h-screen p-0 justify-center">
        <Navigation {...navigationProps} />
        <div className="flex-1 flex justify-cente p-2">
          <h1
            className="hidden md:block text-8xl font-black italic text-center uppercase select-none"
            style={{
              fontFamily: "DDin-Bold",
              writingMode: "vertical-lr",
              textOrientation: "sideways",
            }}
          >
            Operator
          </h1>
          <div className="flex-1 flex flex-col py-12 px-8">{children}</div>
          <h1
            className="hidden md:block flex text-8xl font-black italic text-center uppercase select-none"
            style={{
              fontFamily: "DDin-Bold",
              writingMode: "vertical-rl",
              textOrientation: "sideways",
            }}
          >
            Archives
          </h1>
        </div>
        <div className="self-center justify-self-flex-end w-full bg-black text-white p-4 text-center">
          This is a fan-initiated project and all rights belongs to Yostar Inc
          and HYPERGRYPH
        </div>
      </div>
    </div>
  );
};

export default CoreContainer;
