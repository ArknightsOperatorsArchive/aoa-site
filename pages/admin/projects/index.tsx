import { useEffect, useState } from "react";
import AdminDashboardContainer from "../../../containers/AdminContainers/AdminDashboardContainer";
import { useFunctions } from "../../../firebase/firebase";
import Project from "../../../types/Project";
import { paginate } from "../../../utils/paginate";

const Projects = () => {
  const functions = useFunctions();
  const [modalOpen, setModalOpen] = useState(false);
  const [loaded, setIsLoaded] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { startIndex, endIndex, totalItems, pages, totalPages } = paginate(
    projects.length,
    currentPage
  );

  useEffect(() => {
    function getData() {
      setIsLoaded(false);
      const getUser = functions.httpsCallable("getProjects");
      getUser()
        .then((result) => {
          console.log(result);
          const data = result.data as Project[];
          return data;
        })
        .then((data) => {
          const sortedData = data.sort((a, b) => {
            if (a.projectTitle.toLowerCase() > b.projectTitle.toLowerCase())
              return 1;
            return -1;
          });
          setProjects(sortedData);
          setIsLoaded(true);
        })
        .catch((err) => {
          setProjects([]);
          setIsLoaded(true);
          console.error(err);
        });
    }
    getData();
  }, [functions]);

  return (
    <AdminDashboardContainer pageTitle="Manage Projects">
      <div>Projects</div>
      {`${JSON.stringify(projects, null, 2)}`}
    </AdminDashboardContainer>
  );
};

export default Projects;
