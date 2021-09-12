import React, { Fragment, useState } from "react";

import { useRouter } from "next/router";

import AboutProjectModal from "../../containers/main/AboutProjectModal";
import OperatorsModal from "../../containers/main/OperatorClassDialog";
import CreditsModal from "../../containers/main/CreditsDialog";
import { MenuAlt2Icon, XIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";

export interface NavigationProps {
  type?: "default" | "compressed";
}

const Navigation: React.FC<NavigationProps> = ({ type }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <React.Fragment>
      <div className="flex">
        <div className="flex">
          <button
            type="button"
            className="px-4 border border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    <AboutProjectModal />
                    <OperatorsModal />
                    <CreditsModal />
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>
        {type === "compressed" ? (
          <div className="flex flex-col flex-wrap max-w-lg">
            <button
              onClick={() => router.push("/")}
              className="bg-black text-white py-2 md:py-4 px-4 md:px-4 ml-0 md:ml-10"
            >
              <h1 className="text-2xl leading-snug font-bold">{`Arknights: \n Operators \n Archives`}</h1>
            </button>
            <div className="ml-10 flex flex-col justify-end px-2 flex-wrap max-w-1/2 hidden md:block">
              <AboutProjectModal />
              <OperatorsModal />
              <CreditsModal />
            </div>
          </div>
        ) : (
          <div className="flex flex-row flex-wrap">
            <button
              onClick={() => router.push("/")}
              className="bg-black text-white pl-6 pr-12 pt-6 pb-14 ml-10 max-w-xs"
            >
              <h1 className="text-4xl leading-snug font-bold">{`Arknights: \n Operators \n Archives`}</h1>
            </button>
            <div className="ml-2 flex flex-col justify-end px-2 flex-wrap">
              <AboutProjectModal />
              <OperatorsModal />
              <CreditsModal />
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Navigation;
