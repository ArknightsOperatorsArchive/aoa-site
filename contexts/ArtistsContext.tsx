import React from "react";
import Artist from "../types/Artist";

export interface ProjectContextState {
  isLoaded: boolean;
  artists: Artist[];
}

const ArtistsContext = React.createContext<ProjectContextState>({
  isLoaded: false,
  artists: [],
});

export default ArtistsContext;
