import React, { useEffect, useReducer, useState } from "react";
import firebase from "firebase";

import { useFunctions } from "../firebase/firebase";

import Artist from "../types/Artist";

type Action =
  | {
      type: "@@ARTIST_DISPATCH/UPDATE_ARTIST";
      artists: Artist[];
    }
  | {
      type: "@@ARTIST_DISPATCH/UPDATE_ISLOADED";
      isLoaded: boolean;
    }
  | {
      type: "@@ARTIST_DISPATCH/UPDATE_ERRORED";
      errored: boolean;
      error: Error;
    };

type Dispatch = (action: Action) => void;

export interface ProjectContextState {
  isLoaded: boolean;
  errored: boolean;
  artists: Artist[];
  error?: Error;
}

const ArtistsContext = React.createContext<ProjectContextState | undefined>(
  undefined
);

const ArtistDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

const reducer = (state: ProjectContextState, action: Action) => {
  console.log(`Updating state with action \n
   ${JSON.stringify(action, null, 2)}
  `);
  switch (action.type) {
    case "@@ARTIST_DISPATCH/UPDATE_ARTIST":
      return {
        artists: [...action.artists],
        isLoaded: state.isLoaded,
        errored: state.errored,
        error: state.error,
      };
    case "@@ARTIST_DISPATCH/UPDATE_ISLOADED":
      return {
        isLoaded: action.isLoaded,
        artists: state.artists,
        errored: state.errored,
        error: state.error,
      };
    case "@@ARTIST_DISPATCH/UPDATE_ERRORED":
      return {
        isLoaded: state.isLoaded,
        artists: state.artists,
        errored: action.errored,
        error: action.error,
      };
    default:
      return { ...state };
  }
};

export const ArtistProvider: React.FC = ({ children }) => {
  const functions = useFunctions();
  const [state, dispatch] = useReducer(reducer, {
    isLoaded: false,
    artists: [],
    errored: false,
  });

  useEffect(() => {
    async function getData() {
      dispatch({
        type: "@@ARTIST_DISPATCH/UPDATE_ISLOADED",
        isLoaded: false,
      });
      console.log("Calling getArtists Info Function from ArtistProvider...");
      const getArtists = functions.httpsCallable("getArtists");
      await getArtists()
        .then((result) => {
          const data = result.data as Artist[];
          console.log(`Get data results in ${JSON.stringify(data, null, 2)}`);
          dispatch({
            type: "@@ARTIST_DISPATCH/UPDATE_ARTIST",
            artists: data,
          });
          dispatch({
            type: "@@ARTIST_DISPATCH/UPDATE_ISLOADED",
            isLoaded: true,
          });
        })
        .catch((err) => {
          dispatch({
            type: "@@ARTIST_DISPATCH/UPDATE_ARTIST",
            artists: [],
          });
          dispatch({
            type: "@@ARTIST_DISPATCH/UPDATE_ISLOADED",
            isLoaded: true,
          });
          dispatch({
            type: "@@ARTIST_DISPATCH/UPDATE_ERRORED",
            errored: true,
            error: err,
          });
          console.error(err);
        });
    }
    if (!state.isLoaded) {
      getData();
    }
  }, [functions]);

  return (
    <ArtistsContext.Provider value={state}>
      <ArtistDispatchContext.Provider value={dispatch}>
        {children}
      </ArtistDispatchContext.Provider>
    </ArtistsContext.Provider>
  );
};

function useArtistState() {
  const context = React.useContext(ArtistsContext);
  if (context === undefined) {
    throw new Error("useArtist must be used within a NotificationProvider");
  }
  return context;
}

function useArtistDispatch() {
  const context = React.useContext(ArtistDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useArtistDispatch must be used within a NotificationProvider"
    );
  }
  return context;
}

async function updateArtistData(
  dispatch: Dispatch,
  functions: firebase.functions.Functions
) {
  dispatch({
    type: "@@ARTIST_DISPATCH/UPDATE_ISLOADED",
    isLoaded: false,
  });
  console.log("Calling getProjects Info Function...");
  const getArtists = functions.httpsCallable("getArtists");
  await getArtists()
    .then((result) => {
      const data = result.data as Artist[];
      console.log(data);
      dispatch({
        type: "@@ARTIST_DISPATCH/UPDATE_ARTIST",
        artists: data,
      });
      dispatch({
        type: "@@ARTIST_DISPATCH/UPDATE_ISLOADED",
        isLoaded: true,
      });
    })
    .catch((err) => {
      dispatch({
        type: "@@ARTIST_DISPATCH/UPDATE_ARTIST",
        artists: [],
      });
      dispatch({
        type: "@@ARTIST_DISPATCH/UPDATE_ISLOADED",
        isLoaded: true,
      });
      dispatch({
        type: "@@ARTIST_DISPATCH/UPDATE_ERRORED",
        errored: true,
        error: err,
      });
      console.error(err);
    });
}

function useArtist() {
  return [useArtistState(), useArtistDispatch(), updateArtistData];
}

export { useArtist, useArtistState, useArtistDispatch, updateArtistData };
