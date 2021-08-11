import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  MinusIcon,
} from "@heroicons/react/solid";

import { useFunctions } from "../../../../firebase/firebase";
import Artist, { ArtistSocials } from "../../../../types/Artist";
import SocialTag from "../../../../components/SocialTag";

export interface UpdateArtistModalProps {
  artist: Artist;
  modalOpen: boolean;
  onClose?: () => void;
}

const UpdateArtistModal: React.FC<UpdateArtistModalProps> = ({
  artist,
  modalOpen,
  onClose = () => {},
}) => {
  const [artistName, setArtistName] = useState("");
  const [socials, setSocials] = useState<ArtistSocials[]>([]);

  const [socialProvider, setSocialProvider] = useState("");
  const [username, setUsername] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);

  const functions = useFunctions();

  useEffect(() => {
    setArtistName(artist.displayName);
    setSocials(artist.socials);
  }, [artist]);

  const setData = () => {
    setIsSubmitting(true);
    setHasSubmitted(false);
    setHasErrored(false);
    const addArtist = functions.httpsCallable("updateArtist");
    addArtist({
      uid: artist.uid,
      displayName: artistName,
      socials: socials,
    })
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
    setArtistName("");
    setSocials([]);
    onClose();
  };

  return (
    <Transition appear show={modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={tearDown}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {`Update Artist - ${artist.displayName}`}
              </Dialog.Title>
              <div className="mt-2">
                This allows you to add artists to the database, simply type in
                the artist's name and select the operator class.
              </div>
              {isSubmitting ? (
                <div className="mt-4 mb-2 flex items-center justify-center flex-col">
                  <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                  <div>Updating Artist...</div>
                </div>
              ) : hasSubmitted ? (
                <div className="mt-4 mb-2 flex items-center justify-center flex-col">
                  <div>
                    <CheckCircleIcon className="h-10 w-10 text-green-500" />
                  </div>
                  <div>Successfully updated Artist!</div>
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
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Artist Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={artistName}
                        onChange={(e) => setArtistName(e.currentTarget.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="bweng pog"
                      />
                    </div>
                  </div>
                  <div className="mt-8">
                    <span className="block text-md font-medium text-gray-700">
                      Socials
                    </span>
                    <div>
                      <div className="mt-1 flex">
                        <div className="flex-1">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Social Provider
                          </label>
                          <input
                            type="text"
                            name="social"
                            id="social"
                            value={socialProvider}
                            onChange={(e) =>
                              setSocialProvider(e.currentTarget.value)
                            }
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Twitter"
                          />
                        </div>
                        <div className="flex-1">
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Username
                          </label>
                          <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.currentTarget.value)}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Twitter"
                          />
                        </div>
                        <div>
                          <button
                            type="button"
                            className="inline-flex mt-auto justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            onClick={() => {
                              const newSocials = [
                                ...socials,
                                {
                                  provider: socialProvider,
                                  username: username,
                                },
                              ];
                              setSocials(newSocials);
                              setSocialProvider("");
                              setUsername("");
                            }}
                            disabled={isSubmitting}
                          >
                            Add Social
                          </button>
                        </div>
                      </div>
                    </div>
                    {socials.map((social, index) => {
                      return (
                        <div key={index} className="flex items-center">
                          <SocialTag social={social} />
                          <button
                            onClick={() => {
                              const newSocials = [
                                ...socials.slice(0, index),
                                ...socials.slice(index + 1, socials.length),
                              ];
                              setSocials(newSocials);
                            }}
                            type="button"
                            className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <MinusIcon className="h-3 w-3" aria-hidden="true" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
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
                    Update Artist
                  </button>
                )}

                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={tearDown}
                  disabled={isSubmitting}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateArtistModal;
