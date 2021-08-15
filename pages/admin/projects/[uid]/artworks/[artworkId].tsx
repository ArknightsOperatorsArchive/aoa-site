import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";

import ErrorContainer from "../../../../../components/Error";
import Loading from "../../../../../components/Loading";
import AdminDashboardContainer from "../../../../../containers/AdminContainers/AdminDashboardContainer";
import UploadArtworkContainer from "../../../../../containers/AdminContainers/UploadArtworkContainer";

import { useFunctions } from "../../../../../firebase/firebase";

import { useArtistState } from "../../../../../contexts/ArtistsContext";

import classNames from "../../../../../utils/classNames";

import { Nullable } from "../../../../../types";
import Artist from "../../../../../types/Artist";
import Artwork, { ArtworkStatus } from "../../../../../types/Artwork";

const artworkStatus: ArtworkStatus[] = [
  "Not Assigned",
  "Assigned",
  "Work in Progress",
  "Finished",
];

const ArtworkManagementPage = () => {
  const functions = useFunctions();
  const router = useRouter();
  const { uid, artworkId } = router.query;

  const [loaded, setIsLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [error, setError] = useState<Nullable<Error>>(null);

  const [artwork, setArtwork] = useState<Nullable<Artwork>>(null);
  const {
    artists,
    isLoaded: artistsLoaded,
    errored: artistsErrored,
    error: artistsError,
  } = useArtistState();

  const [selectedArtist, setSelectedArtist] = useState<Nullable<Artist>>(
    artists[0]
  );

  const [selectedArtworkStatus, setSelectedArtworkStatus] =
    useState<Nullable<ArtworkStatus>>(null);

  useEffect(() => {
    function getData() {
      setErrored(false);
      const getArtwork = functions.httpsCallable("getArtwork");
      getArtwork({ projectId: uid, artworkId: artworkId })
        .then((result) => {
          console.log(result);
          const data = result.data as Artwork;
          return {
            ...data,
            uid: artworkId as StringConstructor,
          };
        })
        .then((data) => {
          setArtwork(data);
          setIsLoaded(true);
          setErrored(false);
          setSelectedArtworkStatus(data.status);
          setSelectedArtist(data.artist);
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

  if (!loaded && !artistsLoaded) {
    return (
      <AdminDashboardContainer pageTitle={"Manage Artwork - Loading..."}>
        <Loading loadingMessage="Grabbing artwork details..." />
      </AdminDashboardContainer>
    );
  }

  if (errored) {
    return (
      <AdminDashboardContainer pageTitle={"Manage Artwork - Errored"}>
        <ErrorContainer>
          <h2 className="text-xl font-semibold">Error Occured</h2>
          <h3 className="text-md font-regular text-grey-300">Error stack:</h3>
          {error && <div>{error.stack}</div>}
        </ErrorContainer>
      </AdminDashboardContainer>
    );
  }

  if (artistsErrored) {
    return (
      <AdminDashboardContainer pageTitle={"Manage Artwork - Errored"}>
        <ErrorContainer>
          <h2 className="text-xl font-semibold">Error Occured</h2>
          <h3 className="text-md font-regular text-grey-300">Error stack:</h3>
          {artistsError && <div>{artistsError.stack}</div>}
        </ErrorContainer>
      </AdminDashboardContainer>
    );
  }

  if (!artwork) {
    return (
      <AdminDashboardContainer pageTitle={"Manage Artwork - Errored"}>
        <ErrorContainer>
          <h2 className="text-xl font-semibold">Error Occured</h2>
          <h3 className="text-md font-regular text-grey-300">
            Artwork cannot be found.
          </h3>
        </ErrorContainer>
      </AdminDashboardContainer>
    );
  }

  console.log(artists, artistsLoaded);
  return (
    <AdminDashboardContainer
      pageTitle={`Manage Artwork - ${artwork.operator.name}`}
    >
      <div className="py-3 px-2">
        {artistsLoaded ? (
          <Listbox value={selectedArtist} onChange={setSelectedArtist}>
            {({ open }) => (
              <div className="mt-3 z-30">
                <Listbox.Label className="block z-10 text-sm font-medium text-gray-700">
                  Artist
                </Listbox.Label>
                <div className="mt-1 relative">
                  <Listbox.Button className="bg-white z-10 relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate">
                      {selectedArtist?.displayName}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      style={{ zIndex: 100 }}
                      className="absolute z-100 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                    >
                      {artists.map((artist, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-white bg-indigo-600"
                                : "text-gray-900",
                              "cursor-default select-none relative py-2 pl-3 pr-9"
                            )
                          }
                          style={{
                            zIndex: 100,
                          }}
                          value={artist}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "block truncate font-lg"
                                )}
                              >
                                {artist.displayName}
                              </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </div>
            )}
          </Listbox>
        ) : (
          <div>Loading...</div>
        )}
        <Listbox
          value={selectedArtworkStatus}
          onChange={setSelectedArtworkStatus}
        >
          {({ open }) => (
            <div className="mt-3 z-30">
              <Listbox.Label className="block z-10 text-sm font-medium text-gray-700">
                Status
              </Listbox.Label>
              <div className="mt-1 relative">
                <Listbox.Button className="bg-white z-10 relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <span className="block truncate">
                    {selectedArtworkStatus}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options
                    style={{ zIndex: 100 }}
                    className="absolute z-100 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                  >
                    {artworkStatus.map((status, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "text-white bg-indigo-600"
                              : "text-gray-900",
                            "cursor-default select-none relative py-2 pl-3 pr-9"
                          )
                        }
                        style={{
                          zIndex: 100,
                        }}
                        value={status}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "block truncate font-lg"
                              )}
                            >
                              {status}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </div>
          )}
        </Listbox>
        {artwork && uid && (
          <UploadArtworkContainer artwork={artwork} projectId={uid as string} />
        )}
      </div>
    </AdminDashboardContainer>
  );
};

export default ArtworkManagementPage;
