import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import AdminDashboardContainer from "../../../../containers/AdminContainers/AdminDashboardContainer";
import StatusLabels from "../../../../components/StatusLabels";
import Loading from "../../../../components/Loading";
import ErrorComponent from "../../../../components/Error";

import { useFunctions } from "../../../../firebase/firebase";
import Artwork from "../../../../types/Artwork";
import { Nullable } from "../../../../types";

const ProjectPage = () => {
  const functions = useFunctions();
  const router = useRouter();

  const { uid } = router.query;

  const [loaded, setIsLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [error, setError] = useState<Nullable<Error>>(null);
  const [projectArtworks, setProjectArtworks] =
    useState<Nullable<Artwork[]>>(null);

  useEffect(() => {
    function getData() {
      console.info("Getting Artworks Data!");
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
          setErrored(false);
        })
        .catch((err) => {
          setProjectArtworks([]);
          setIsLoaded(true);
          setErrored(true);
          setError(err);
          console.error(err);
        });
    }
    getData();
  }, [functions, uid]);

  if (!loaded) {
    return (
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
        <Loading loadingMessage="Grabbing latest artworks and project details..." />
      </AdminDashboardContainer>
    );
  }

  if (errored) {
    return (
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
        <ErrorComponent>
          <h2 className="text-xl font-semibold">Error Occured</h2>
          <h3 className="text-md font-regular text-grey-300">Error stack:</h3>
          {error && <div>{error.stack}</div>}
        </ErrorComponent>
      </AdminDashboardContainer>
    );
  }

  return (
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
                    <button
                      onClick={() => {
                        router.push(
                          `/admin/projects/${uid}/artworks/${artwork.uid}`
                        );
                      }}
                      className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminDashboardContainer>
  );
};

export default ProjectPage;
