import React, { useEffect, useState } from "react";
import ProjectsContext from "../contexts/ProjectsContext";
import { useFunctions } from "../firebase/firebase";

import Project from "../types/Project";

export const ProjectProvider: React.FC = ({ children }) => {
  const functions = useFunctions();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function getData() {
      setIsLoaded(false);
      console.log("Calling getProjects Info Function...");
      const getUser = functions.httpsCallable("getProjects");
      await getUser()
        .then((result) => {
          const data = result.data as Project[];
          console.log(data);
          setProjects(data);
          setIsLoaded(true);
        })
        .catch((err) => {
          setProjects([]);
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
