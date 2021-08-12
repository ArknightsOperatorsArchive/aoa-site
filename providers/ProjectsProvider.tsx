import React, { useEffect, useState } from "react";
import ProjectsContext from "../contexts/ProjectsContext";
import { useFunctions } from "../firebase/firebase";

import Project from "../types/Project";

export const ProjectProvider: React.FC = ({ children }) => {
  const functions = useFunctions();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    function getData() {
      console.log("Calling getProjects Info Function...");
      const getUser = functions.httpsCallable("getProjects");
      getUser()
        .then((result) => {
          console.log(result);
          const data = result.data as Project[];
          setProjects(data);
          setIsLoaded(true);
        })
        .catch((err) => {
          setProjects([]);
          setIsLoaded(true);
          console.error(err);
        });
    }
    if (!isLoaded) {
      getData();
    }
  }, [functions]);

  return (
    <ProjectsContext.Provider
      value={{
        isLoaded,
        projects: projects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
