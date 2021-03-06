import React, { Fragment, LegacyRef, MutableRefObject, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

interface CoreDialogProps {
  modalHeading: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  ref?: MutableRefObject<HTMLElement | null>;
}

const CoreDialog: React.FC<CoreDialogProps> = ({
  children,
  modalHeading,
  isOpen,
  setIsOpen,
  ref = undefined,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={ref}
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-20"
            leave="ease-in duration-200"
            leaveFrom="opacity-20"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-80" />
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
            enterTo="opacity-20 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-20 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-800 text-white shadow-xl rounded-2xl">
              <div className="flex flex-1 flex-wrap-reverse">
                <div className="font-black uppercase italic leading-6 flex-1">
                  <h2 className="text-7xl">{modalHeading}</h2>
                </div>
                <div className="mt-8 flex flex-col justify-start">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setIsOpen(false)}
                  >
                    <XIcon
                      className="-ml-0.5 mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    Okay
                  </button>
                </div>
              </div>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CoreDialog;
