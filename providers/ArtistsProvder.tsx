import React, { useEffect, useState } from "react";

import { useFunctions } from "../firebase/firebase";

import ArtistsContext from "../contexts/ArtistsContext";
import Artist from "../types/Artist";

export const ArtistProvider: React.FC = ({ children }) => {
  const functions = useFunctions();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    async function getData() {
      setIsLoaded(false);
      console.log("Calling getProjects Info Function...");
      const getArtists = functions.httpsCallable("getArtists");
      await getArtists()
        .then((result) => {
          const data = result.data as Artist[];
          console.log(data);
          setArtists(data);
          setIsLoaded(true);
        })
        .catch((err) => {
          setArtists([]);
          setIsLoaded(true);
          console.error(err);
          return [];
        });
    }
    if (!isLoaded) {
      getData();
    }
    console.log(isLoaded);
  }, [functions]);

  return (
    <ArtistsContext.Provider
      value={{
        isLoaded,
        artists,
      }}
    >
      {children}
    </ArtistsContext.Provider>
  );
};
