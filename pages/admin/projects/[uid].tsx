import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminDashboardContainer from "../../../containers/AdminContainers/AdminDashboardContainer";
import AddArtworkModal from "../../../containers/AdminContainers/modals/Artwork/AddArtworkModal";
import { useFunctions } from "../../../firebase/firebase";

import Artwork from "../../../types/Artwork";
import { Nullable } from "../../../types";
import StatusLabels from "../../../components/StatusLabels";

const ProjectPage = () => {
  const [addArtworkModalOpen, setAddArtworkModalOpen] = useState(false);
  const functions = useFunctions();
  const router = useRouter();
  const { uid } = router.query;

  const [loaded, setIsLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<Nullable<Error>>(null);
  const [projectArtworks, setProjectArtworks] =
    useState<Nullable<Artwork[]>>(null);

  useEffect(() => {
    function getData() {
      const getAllArtworks = functions.httpsCallable("getAllArtworks");
      getAllArtworks({ projectId: uid })
        .then((result) => {
          console.log(result);
          const data = result.data as Artwork[];
          return data;
        })
        .then((data) => {
          const sortedData = data.sort((a, b) => {
            if (a.operator.name.toLowerCase() > b.operator.name.toLowerCase())
              return 1;
            return -1;
          });
          setProjectArtworks(sortedData);
          setIsLoaded(true);
        })
        .catch((err) => {
          setProjectArtworks([]);
          setIsLoaded(true);
          setError(err);
          console.error(err);
        });
    }
    getData();
  }, [functions]);

  return (
    <React.Fragment>
      <AddArtworkModal
        modalOpen={addArtworkModalOpen}
        onClose={() => setAddArtworkModalOpen(false)}
      />
      <AdminDashboardContainer
        pageTitle={"Manage Project"}
        controls={
          <Fragment>
            <button
              type="button"
              onClick={() => router.push("/admin/projects/artworks/create")}
              className="order-0 inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md text-blue-900 border-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
              Add Artwork
            </button>
          </Fragment>
        }
      >
        <div className="flex-1 min-w-0 px-3 py-2">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Artworks
          </h2>
          {projectArtworks && (
            <ul className="mt-3 -my-5 divide-y divide-gray-200">
              {projectArtworks.map((artwork) => (
                <li key={artwork.uid} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900 truncate mr-2">
                          {artwork.operator.name}
                        </p>
                        <StatusLabels status={artwork.status} />
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {artwork.artist.displayName}
                      </p>
                    </div>
                    <div>
                      <a
                        href="#"
                        className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </AdminDashboardContainer>
    </React.Fragment>
  );
};

export default ProjectPage;
