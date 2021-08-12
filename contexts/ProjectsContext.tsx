import React from "react";
import Project from "../types/Project";

export interface ProjectContextState {
  isLoaded: boolean;
  projects: Project[];
}

const ProjectsContext = React.createContext<ProjectContextState>({
  isLoaded: false,
  projects: [],
});

export default ProjectsContext;
