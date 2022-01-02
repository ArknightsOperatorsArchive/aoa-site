import React, { useContext, useEffect, useState } from "react";
import Head from 'next/head'
import { motion } from "framer-motion";

import Navigation, { NavigationProps } from "../../components/core/Navigation";
import LoadingMessage from "../../components/LoadingMessage";
import { useArtistState } from "../../contexts/ArtistsContext";
import ProjectsContext from "../../contexts/ProjectsContext";

import styles from "../../styles/Home.module.css";

interface CoreContainerProps {
  pageTitle?: string
  navigationProps?: NavigationProps;
}

const CoreContainer: React.FC<CoreContainerProps> = ({
  children,
  pageTitle = "",
  navigationProps,
}) => {
  const [loadedProgress, setLoadedProgress] = useState(10);

  const artistsGlobalState = useArtistState();
  const projectsGlobalState = useContext(ProjectsContext);

  const title = `Arknights Operators Archive${pageTitle && " - " + pageTitle}`

  useEffect(() => {
    let progress = 0;
    if (artistsGlobalState.isLoaded) {
      progress += 50;
    }
    if (projectsGlobalState.isLoaded) progress += 50;
    setLoadedProgress(progress);
  }, [artistsGlobalState, projectsGlobalState]);


  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta property="og:description"
          content="Hi! We're a group of artists who are fans of Arknights, and we aim to create an artbook featuring every single operator in the game!" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/icons/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <div className={styles.container}>
        <div className="w-screen flex flex-col min-h-screen p-0 justify-center">
          {loadedProgress < 100 ? (
            <div className=" flex-1 flex flex-col">
              <motion.div className="h-2 w-full bg-gray-100 justify-self-start self-start">
                <motion.div
                  className="h-2 w-full bg-blue-400 justify-self-start self-start"
                  style={{
                    width: `${loadedProgress}%`,
                  }}
                ></motion.div>
              </motion.div>
              <div className="flex-1 flex justify-center p-2">
                <div className="animate-pulse flex flex-col justify-center items-center">
                  <h2 className="text-xl md:text-2xl font-semibold uppercase">
                    Arknights: Operators Archive
                  </h2>
                  <motion.h3 className="text-2xl md:text-6xl font-black uppercase italic mt-3">
                    <LoadingMessage durationMs={2500} />
                  </motion.h3>
                </div>
              </div>
            </div>
          ) : (
            <React.Fragment>
              <Navigation {...navigationProps} />
              <div className="flex-1 flex justify-center p-2">
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
                <div className="flex-1 flex flex-col py-12 px-2">{children}</div>

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
            </React.Fragment>
          )}
          <div className="self-center justify-self-flex-end w-full bg-black text-white p-4 text-center">
            This is a fan-initiated project and all rights belongs to Yostar Inc
            and HYPERGRYPH
          </div>
        </div>
      </div></React.Fragment>
  );
};

export default CoreContainer;
