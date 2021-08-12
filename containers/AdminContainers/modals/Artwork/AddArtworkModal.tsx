import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  MinusIcon,
} from "@heroicons/react/solid";

import { useFunctions } from "../../../../firebase/firebase";
import { ArtistSocials } from "../../../../types/Artist";
import SocialTag from "../../../../components/SocialTag";

export interface AddArtworkModalProps {
  modalOpen: boolean;
  onClose?: () => void;
}

const AddArtworkModal: React.FC<AddArtworkModalProps> = ({
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
    async function getData() {}
    getData();
  }, []);

  const setData = () => {
    setIsSubmitting(true);
    setHasSubmitted(false);
    setHasErrored(false);
    const addArtist = functions.httpsCallable("addArtists");
    addArtist({
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
                Add Artwork
              </Dialog.Title>
              <div className="mt-2">
                This allows you to add artworks to the database
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
                <div className="mt-2"></div>
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
                    Add Artist
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

export default AddArtworkModal;
