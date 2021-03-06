import { useContext } from "react";
import { useRouter } from "next/router";

import Loading from "../../../components/Loading";
import AdminDashboardContainer from "../../../containers/AdminContainers/AdminDashboardContainer";

import ProjectsContext from "../../../contexts/ProjectsContext";

const Projects = () => {
  const { isLoaded, projects } = useContext(ProjectsContext);
  const router = useRouter();

  return (
    <AdminDashboardContainer pageTitle="Manage Projects">
      {!isLoaded ? (
        <Loading loadingMessage="Loading projects..." />
      ) : (
        <div className="flow-root mt-6 px-4 py-3">
          <ul className="-my-5 divide-y divide-gray-200">
            {projects.map((project, index) => {
              return (
                <li key={project.uid} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {project.projectTitle}
                      </p>
                      {!project.released ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Unreleased
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Released
                        </span>
                      )}
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          router.push(`/admin/projects/${project.uid}`);
                        }}
                        className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </AdminDashboardContainer>
  );
};

export default Projects;
