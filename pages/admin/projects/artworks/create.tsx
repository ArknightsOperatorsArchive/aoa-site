import React, { Fragment, useContext, useEffect, useState } from "react";
import { Transition, Listbox } from "@headlessui/react";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid";

import { useFunctions } from "../../../../firebase/firebase";
import Artist, { ArtistSocials } from "../../../../types/Artist";
import AKOperator from "../../../../types/AKOperator";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";
import Loading from "../../../../components/Loading";
import AdminDashboardContainer from "../../../../containers/AdminContainers/AdminDashboardContainer";
import classNames from "../../../../utils/classNames";
import ProjectsContext from "../../../../contexts/ProjectsContext";
import Artwork from "../../../../types/Artwork";

import {
  useArtistDispatch,
  useArtistState,
} from "../../../../contexts/ArtistsContext";
import router from "next/router";

const CreateArtwork: React.FC = () => {
  const projectsContext = useContext(ProjectsContext);
  const [loaded, setIsLoaded] = useState(false);
  const [arknightsOperators, setArknightsOperators] = useState<AKOperator[]>(
    []
  );
  const { artists } = useArtistState();
  const dispatch = useArtistDispatch();

  const [selectedOperator, setSelectedOperator] = useState(
    arknightsOperators[0]
  );
  const [selectedProject, setSelectProject] = useState(
    projectsContext.projects[0]
  );
  const [selectedArtist, setSelectedArtist] = useState(artists[0]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);

  const functions = useFunctions();

  useEffect(() => {
    async function getData() {
      setIsLoaded(false);
      const getOperators = functions.httpsCallable("getOperators");

      await getOperators()
        .then((result) => {
          console.log(result);
          const data = result.data as AKOperator[];
          return data;
        })
        .then((data) => {
          const sortedData = data.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return -1;
          });
          setArknightsOperators(sortedData);
          setSelectedOperator(sortedData[0]);
          setIsLoaded(true);
        })
        .catch((err) => {
          setArknightsOperators([]);
          setIsLoaded(true);
          console.error(err);
        });
    }
    getData();
  }, [functions]);

  useEffect(() => {
    console.log("updating selected project...");
    if (projectsContext.isLoaded) {
      setSelectProject(projectsContext.projects[0]);
    }
  }, [projectsContext.isLoaded]);

  const setData = () => {
    const data: {
      projectId: string;
      art: Artwork;
    } = {
      projectId: selectedProject.uid,
      art: {
        operator: selectedOperator,
        artist: selectedArtist,
        status: "Assigned",
      },
    };
    setIsSubmitting(true);
    setHasSubmitted(false);
    setHasErrored(false);
    const addArtwork = functions.httpsCallable("addArtworks");
    addArtwork(data)
      .then(() => {
        console.log("Success!");
        setIsSubmitting(false);
        setHasErrored(false);
        setHasSubmitted(true);
      })
      .catch((err) => {
        console.error(err);
        setIsSubmitting(false);
        setHasErrored(true);
        setHasSubmitted(false);
      });
  };

  const tearDown = () => {
    setIsSubmitting(false);
    setHasSubmitted(false);
    setHasErrored(false);
  };

  console.log(selectedOperator, arknightsOperators);
  console.log(projectsContext.isLoaded, loaded, arknightsOperators.length > 0);
  const isDataFullyLoaded =
    projectsContext.isLoaded && loaded && arknightsOperators.length > 0;
  if (!isDataFullyLoaded) {
    return <Loading />;
  }
  console.log(selectedProject);
  return (
    <AdminDashboardContainer pageTitle="Create Artwork">
      <div className="px-2 py-4">
        <div className="mt-2">
          This allows you to create a new artwork to the database
        </div>
        {isSubmitting ? (
          <div className="mt-4 mb-2 flex items-center justify-center flex-col">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <div>Adding Artwork...</div>
          </div>
        ) : hasSubmitted ? (
          <div className="mt-4 mb-2 flex items-center justify-center flex-col">
            <div>
              <CheckCircleIcon className="h-10 w-10 text-green-500" />
            </div>
            <div>Successfully added Artwork!</div>
          </div>
        ) : hasErrored ? (
          <div className="mt-4 mb-2 flex items-center justify-center flex-col">
            <div>
              <ExclamationCircleIcon className="h-10 w-10 text-red-500" />
            </div>
            <div>Something went wrong, check console for details!</div>
          </div>
        ) : (
          <div className="mt-2">
            {isDataFullyLoaded ? (
              <Fragment>
                <Listbox value={selectedProject} onChange={setSelectProject}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="block text-sm font-medium text-gray-700">
                        Project
                      </Listbox.Label>
                      <div className="mt-1 relative">
                        <Listbox.Button className="bg-white z-10 relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <span className="block truncate">
                            {selectedProject.projectTitle}
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
                            {projectsContext.projects.map((project) => (
                              <Listbox.Option
                                key={project.uid}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "text-white bg-indigo-600"
                                      : "text-gray-900",
                                    "cursor-default select-none relative py-2 pl-3 pr-9"
                                  )
                                }
                                value={project}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "block truncate font-lg"
                                      )}
                                    >
                                      {project.projectTitle}
                                    </span>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-indigo-600",
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
                    </>
                  )}
                </Listbox>
                <Listbox
                  value={selectedOperator}
                  onChange={setSelectedOperator}
                >
                  {({ open }) => (
                    <div className="mt-3 z-20">
                      <Listbox.Label className="block text-sm font-medium text-gray-700">
                        Operator
                      </Listbox.Label>
                      <div className="mt-1 relative">
                        <Listbox.Button className="bg-white z-10 relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <span className="block truncate">
                            {selectedOperator.name}
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
                            className="absolute z-100 mt-1 w-full bg-white shadow-lg max-h-100 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                            style={{ zIndex: 100 }}
                          >
                            {arknightsOperators.map((opreator) => (
                              <Listbox.Option
                                key={opreator.uid}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "text-white bg-indigo-600"
                                      : "text-gray-900",
                                    "cursor-default select-none relative py-2 pl-3 pr-9"
                                  )
                                }
                                value={opreator}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "block truncate font-lg"
                                      )}
                                    >
                                      {opreator.name}
                                    </span>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-indigo-600",
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
                <Listbox value={selectedArtist} onChange={setSelectedArtist}>
                  {({ open }) => (
                    <div className="mt-3 z-30">
                      <Listbox.Label className="block z-10 text-sm font-medium text-gray-700">
                        Artist
                      </Listbox.Label>
                      <div className="mt-1 relative">
                        <Listbox.Button className="bg-white z-10 relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <span className="block truncate">
                            {selectedArtist.displayName}
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
                            {artists.map((artist) => (
                              <Listbox.Option
                                key={artist.uid}
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
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "block truncate font-lg"
                                      )}
                                    >
                                      {artist.displayName}
                                    </span>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-indigo-600",
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
              </Fragment>
            ) : (
              <Loading />
            )}
          </div>
        )}

        <div className="mt-4">
          {!hasSubmitted && !hasErrored && (
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onClick={() => {
                setData();
              }}
              disabled={isSubmitting}
            >
              Add Artwork
            </button>
          )}

          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            onClick={() => {
              tearDown();
              router.back();
            }}
            disabled={isSubmitting}
          >
            Close
          </button>
        </div>
      </div>
    </AdminDashboardContainer>
  );
};

export default CreateArtwork;
