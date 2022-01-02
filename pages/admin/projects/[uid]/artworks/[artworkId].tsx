import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Listbox, Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  CheckIcon,
  ChevronRightIcon,
  ExclamationCircleIcon,
  HomeIcon,
  MinusIcon,
  SelectorIcon,
} from "@heroicons/react/outline";

import ErrorComponent from "../../../../../components/Error";
import Loading from "../../../../../components/Loading";
import AdminDashboardContainer from "../../../../../containers/AdminContainers/AdminDashboardContainer";
import UploadArtworkContainer from "../../../../../containers/AdminContainers/UploadArtworkContainer";

import { useFunctions } from "../../../../../firebase/firebase";

import { useArtistState } from "../../../../../contexts/ArtistsContext";

import classNames from "../../../../../utils/classNames";

import { Nullable } from "../../../../../types";
import Artist from "../../../../../types/Artist";
import Artwork, { ArtworkStatus } from "../../../../../types/Artwork";
import DeleteConfirmationModal from "../../../../../containers/AdminContainers/modals/DeleteConfirmationModal";
import { useNotificationDispatch } from "../../../../../contexts/NotificationProvider";

import ArtistsListBox from "../../../../../containers/AdminContainers/ArtistsListBox";

const artworkStatus: ArtworkStatus[] = [
  "Not Assigned",
  "Assigned",
  "Work in Progress",
  "Finished",
];

const ArtworkManagementPage = () => {
  const functions = useFunctions();
  const router = useRouter();
  const dispatchNotifications = useNotificationDispatch();
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

  const [additionalArtists, setAdditionalArtists] = useState<Artist[]>([]);

  const [selectedAdditionalArtist, setSelectedAdditionalArtist] = useState<
    Nullable<Artist>
  >(artists[0]);

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
            uid: artworkId as string,
          };
        })
        .then((data) => {
          setArtwork(data);
          setIsLoaded(true);
          setErrored(false);
          setSelectedArtworkStatus(data.status);
          setSelectedArtist(data.artist);
          setAdditionalArtists(data.artists || []);
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

  const update = () => {
    const updateArtwork = functions.httpsCallable("updateArtwork");
    updateArtwork({
      projectId: uid,
      artworkId: artworkId,
      art: {
        artist: selectedArtist,
        status: selectedArtworkStatus,
        artists: additionalArtists,
      },
    })
      .then((result) => {
        console.log(result);
        const data = result.data as Artwork;
        dispatchNotifications({
          type: "@@NOTIFICATION/PUSH",
          notification: {
            title: "Successfully updated artwork",
            message: "Artwork has been update.",
            icon: (
              <CheckCircleIcon
                className="h-6 w-6 text-green-400"
                aria-hidden="true"
              />
            ),
          },
        });
        return {
          ...data,
          uid: artworkId as string,
        };
      })
      .catch((err: Error) => {
        setArtwork(null);
        setIsLoaded(true);
        setErrored(true);
        setError(err);
        console.error(err);
        dispatchNotifications({
          type: "@@NOTIFICATION/PUSH",
          notification: {
            title: "An error happened when updating artwork",
            message: err.message,
            icon: (
              <ExclamationCircleIcon
                className="h-6 w-6 text-red-400"
                aria-hidden="true"
              />
            ),
          },
        });
      });
  };
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
        <ErrorComponent>
          <h2 className="text-xl font-semibold">Error Occured</h2>
          <h3 className="text-md font-regular text-grey-300">Error stack:</h3>
          {error && <div>{error.stack}</div>}
        </ErrorComponent>
      </AdminDashboardContainer>
    );
  }

  if (artistsErrored) {
    return (
      <AdminDashboardContainer pageTitle={"Manage Artwork - Errored"}>
        <ErrorComponent>
          <h2 className="text-xl font-semibold">Error Occured</h2>
          <h3 className="text-md font-regular text-grey-300">Error stack:</h3>
          {artistsError && <div>{artistsError.stack}</div>}
        </ErrorComponent>
      </AdminDashboardContainer>
    );
  }

  if (!artwork) {
    return (
      <AdminDashboardContainer pageTitle={"Manage Artwork - Errored"}>
        <ErrorComponent>
          <h2 className="text-xl font-semibold">Error Occured</h2>
          <h3 className="text-md font-regular text-grey-300">
            Artwork cannot be found.
          </h3>
        </ErrorComponent>
      </AdminDashboardContainer>
    );
  }

  console.log(artists, artistsLoaded);
  const pages = [
    { name: "Projects", href: "/admin/projects", current: false },
    { name: uid, href: `/admin/projects/${uid}`, current: false },
    {
      name: artwork.operator.name,
      href: `/admin/projects/${uid}/artworks/${artworkId}`,
      current: true,
    },
  ];

  return (
    <AdminDashboardContainer
      pageTitle={`Manage Artwork - ${artwork.operator.name}`}
      controls={
        <Fragment>
          <DeleteConfirmationModal
            modalHeading="Delete Artwork"
            onDelete={() => {
              const deleteArtwork = functions.httpsCallable("deleteArtwork");
              deleteArtwork({ projectId: uid, artworkId: artworkId })
                .then((result) => {
                  console.log(result);
                  dispatchNotifications({
                    type: "@@NOTIFICATION/PUSH",
                    notification: {
                      title: "Successfully deleted artwork",
                      message: "Artwork has been deleted.",
                    },
                  });
                  router.back();
                })
                .catch((err) => {
                  setArtwork(null);
                  setIsLoaded(true);
                  setErrored(true);
                  setError(err);
                  console.error(err);
                });
            }}
          >
            Are you sure you want to delete this artwork? Doing this is
            irreversible
          </DeleteConfirmationModal>
        </Fragment>
      }
    >
      <div className="py-3 px-2">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <HomeIcon
                    className="flex-shrink-0 h-5 w-5"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Home</span>
                </a>
              </div>
            </li>
            {pages.map((page) => (
              <li key={page.href}>
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <button
                    onClick={() => router.push(page.href)}
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                    aria-current={page.current ? "page" : undefined}
                  >
                    {page.name}
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <div className="py-3 px-2 divide-y divide-grey-500">
        <div>
          {artistsLoaded ? (
            <ArtistsListBox
              artists={artists}
              selectedArtist={selectedArtist}
              onChange={setSelectedArtist}
            />
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
          <div className="mt-2 flex flex-col">
            <h2 className="block z-10 text-sm font-medium text-gray-700">
              Manage Additional Artists
            </h2>
            <div className="flex">
              {artistsLoaded ? (
                <ArtistsListBox
                  artists={artists}
                  selectedArtist={selectedAdditionalArtist}
                  onChange={setSelectedAdditionalArtist}
                />
              ) : (
                <div>Loading...</div>
              )}
              <div className="flex flex-col justify-reverse">
                <div>
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium border-blue-800 text-blue-900 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:text-sm"
                    onClick={() => {
                      const newAdditionalArtists = [
                        ...additionalArtists,
                        selectedAdditionalArtist as Artist,
                      ];
                      setAdditionalArtists(newAdditionalArtists);
                    }}
                  >
                    Add Artist
                  </button>
                </div>
              </div>
            </div>
            <div>
              <ul className="divide-y divide-gray-200">
                {additionalArtists.map((artist, index) => {
                  console.log(artist);
                  return (
                    <li key={artist.uid}>
                      <div className="block hover:bg-gray-50">
                        <div className="flex items-center px-4 py-4 sm:px-6">
                          <div className="min-w-0 flex-1 flex items-center">
                            <div className="min-w-0 flex-1 px-4 md:gap-4 flex ">
                              <div className="flex flex-1 flex-col">
                                <span className="text-sm font-medium text-gray-400">
                                  Artist Display name
                                </span>
                                <p className="text-lg font-medium text-indigo-600 truncate">
                                  {artist.displayName}
                                </p>
                              </div>
                              <div className="flex flex-col">
                                <button
                                  onClick={() => {
                                    const newAdditionalArtists = [
                                      ...additionalArtists.slice(0, index),
                                      ...additionalArtists.slice(
                                        index + 1,
                                        additionalArtists.length
                                      ),
                                    ];
                                    setAdditionalArtists(newAdditionalArtists);
                                  }}
                                  type="button"
                                  className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  <MinusIcon
                                    className="h-3 w-3"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="mt-4 flex">
            <div className="flex-1" />
            <button
              className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium border-blue-800 text-blue-900 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:text-sm"
              onClick={() => {
                update();
              }}
            >
              Update Artwork
            </button>
          </div>
        </div>
        <div className="mt-4 py-2">
          <h2 className="text-lg font-semibold font-black-500">
            Current Artwork
          </h2>
          {artwork && uid && (
            <UploadArtworkContainer
              artwork={artwork}
              projectId={uid as string}
            />
          )}
        </div>
      </div>
    </AdminDashboardContainer>
  );
};

export default ArtworkManagementPage;
