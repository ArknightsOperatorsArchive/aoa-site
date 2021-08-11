import { useEffect, useState, Fragment } from "react";

import {
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,
  PencilIcon,
  RefreshIcon,
} from "@heroicons/react/solid";

import SocialTag from "../../components/SocialTag";

import AdminDashboardContainer from "../../containers/AdminContainers/AdminDashboardContainer";
import AddArtistModal from "../../containers/AdminContainers/modals/Artists/AddArtistModal";
import DeleteArtistModal from "../../containers/AdminContainers/modals/Artists/DeleteArtistModal";
import UpdateArtistModal from "../../containers/AdminContainers/modals/Artists/UpdateArtistModal";

import { useFunctions } from "../../firebase/firebase";
import { Nullable } from "../../types";
import Artist from "../../types/Artist";

import { paginate } from "../../utils/paginate";

const Artists = () => {
  const functions = useFunctions();
  const [loaded, setIsLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [artist, setArtist] = useState<Nullable<Artist>>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { startIndex, endIndex, totalItems, pages, totalPages } = paginate(
    artists.length,
    currentPage
  );

  const refresh = () => {
    setIsLoaded(false);
    const getUser = functions.httpsCallable("getArtists");
    getUser()
      .then((result) => {
        console.log(result);
        const data = result.data as Artist[];
        return data;
      })
      .then((data) => {
        const sortedData = data.sort((a, b) => {
          if (a.displayName > b.displayName) return 1;
          return -1;
        });
        setArtists(sortedData);
        setIsLoaded(true);
      })
      .catch((err) => {
        setArtists([]);
        setIsLoaded(true);
        console.error(err);
      });
  };
  useEffect(() => {
    function getData() {
      setIsLoaded(false);
      const getUser = functions.httpsCallable("getArtists");
      getUser()
        .then((result) => {
          console.log(result);
          const data = result.data as Artist[];
          return data;
        })
        .then((data) => {
          const sortedData = data.sort((a, b) => {
            if (a.displayName.toLowerCase() > b.displayName.toLowerCase())
              return 1;
            return -1;
          });
          setArtists(sortedData);
          setIsLoaded(true);
        })
        .catch((err) => {
          setArtists([]);
          setIsLoaded(true);
          console.error(err);
        });
    }
    getData();
  }, [functions]);

  if (!loaded) {
    return (
      <AdminDashboardContainer pageTitle="Manage Artists">
        <div className="mt-4 mb-2 flex items-center justify-center flex-col">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <div>Loading Artist Details...</div>
        </div>
      </AdminDashboardContainer>
    );
  }
  return (
    <Fragment>
      <AddArtistModal
        modalOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      {artist && (
        <UpdateArtistModal
          modalOpen={!!artist}
          artist={artist}
          onClose={() => setArtist(null)}
        />
      )}
      <AdminDashboardContainer
        pageTitle="Manage Artists"
        controls={
          <Fragment>
            <button
              type="button"
              onClick={() => refresh()}
              className="order-0 inline-flex items-center leading-4 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
              <RefreshIcon className="h-5 w-5" aria-hidden="true" />
              Refresh
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
              Add Artist
            </button>
          </Fragment>
        }
      >
        <ul className="divide-y divide-gray-200">
          {artists.slice(startIndex, endIndex + 1).map((artist, index) => {
            console.log(artist);
            return (
              <li key={artist.uid}>
                <div className="block hover:bg-gray-50">
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="min-w-0 flex-1 px-4 md:gap-4 flex flex-col">
                        <div>
                          <span className="text-sm font-medium text-gray-400">
                            Artist Display name
                          </span>
                          <p className="text-lg font-medium text-indigo-600 truncate">
                            {artist.displayName}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-400">
                            Artist Socials
                          </span>
                          {artist.socials.map((social, index) => {
                            return <SocialTag key={index} social={social} />;
                          })}
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        className="w-full inline-flex justify-center leading-4 rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setArtist(artist)}
                      >
                        <PencilIcon className="h-5 w-5" aria-hidden="true" />
                        Edit Artist
                      </button>

                      <DeleteArtistModal artist={artist} />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => {
                if (currentPage != 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => {
                if (currentPage === totalPages) {
                  setCurrentPage(currentPage + 1);
                }
              }}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">{endIndex + 1}</span> of{" "}
                <span className="font-medium">{totalItems}</span> results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => {
                    setCurrentPage(1);
                  }}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Back to Front</span>
                  <ChevronDoubleLeftIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
                <button
                  onClick={() => {
                    if (currentPage !== 1) {
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {pages.map((pageNumber) => {
                  return (
                    <button
                      onClick={() => setCurrentPage(pageNumber)}
                      key={pageNumber}
                      aria-current="page"
                      className={
                        currentPage === pageNumber
                          ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      }
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  onClick={() => {
                    if (currentPage !== totalPages) {
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => {
                    setCurrentPage(totalPages);
                  }}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Back to End</span>
                  <ChevronDoubleRightIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </AdminDashboardContainer>
    </Fragment>
  );
};

export default Artists;
