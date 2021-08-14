import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import AdminDashboardContainer from "../../../../../containers/AdminContainers/AdminDashboardContainer";
import { useFunctions } from "../../../../../firebase/firebase";
import { Nullable } from "../../../../../types";
import Artwork from "../../../../../types/Artwork";
import Loading from "../../../../../components/Loading";
import ErrorContainer from "../../../../../components/Error";

const ArtworkManagementPage = () => {
  const functions = useFunctions();
  const router = useRouter();
  const { uid, artworkId } = router.query;

  const [loaded, setIsLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [error, setError] = useState<Nullable<Error>>(null);

  const [artwork, setArtwork] = useState<Nullable<Artwork>>(null);

  useEffect(() => {
    function getData() {
      setErrored(false);
      const getArtwork = functions.httpsCallable("getArtwork");
      getArtwork({ projectId: uid, artworkId: artworkId })
        .then((result) => {
          console.log(result);
          const data = result.data as Artwork;
          return data;
        })
        .then((data) => {
          setArtwork(data);
          setIsLoaded(true);
          setErrored(false);
        })
        .catch((err) => {
          setArtwork(null);
          setIsLoaded(true);
          setErrored(true);
          setError(err);
          console.error(err);
        });
    }
    getData();
  }, [functions, uid, artworkId]);

  if (!loaded) {
    return (
      <AdminDashboardContainer
        pageTitle={"Manage Artwork - Loading..."}
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
        <Loading loadingMessage="Grabbing artwork details..." />
      </AdminDashboardContainer>
    );
  }

  if (errored) {
    return (
      <AdminDashboardContainer
        pageTitle={"Manage Artwork - Errored"}
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
        <ErrorContainer>
          <h2 className="text-xl font-semibold">Error Occured</h2>
          <h3 className="text-md font-regular text-grey-300">Error stack:</h3>
          {error && <div>{error.stack}</div>}
        </ErrorContainer>
      </AdminDashboardContainer>
    );
  }

  if (!artwork) {
    return (
      <AdminDashboardContainer
        pageTitle={"Manage Artwork - Errored"}
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
        <ErrorContainer>
          <h2 className="text-xl font-semibold">Error Occured</h2>
          <h3 className="text-md font-regular text-grey-300">
            Artwork cannot be found.
          </h3>
        </ErrorContainer>
      </AdminDashboardContainer>
    );
  }
  return (
    <AdminDashboardContainer
      pageTitle={`Manage Artwork - ${artwork.operator.name}`}
    >
      Manage Artworks here.
      <pre>{JSON.stringify(artwork, null, 2)}</pre>
    </AdminDashboardContainer>
  );
};

export default ArtworkManagementPage;
