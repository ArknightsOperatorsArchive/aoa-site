import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  HomeIcon,
  ViewListIcon,
  XIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import AdminAuthenticatedContainer from "./AdminAuthenticatedContainer";
import AdminAuthorisedContainer from "./AdminAuthorisedContainer";
import AccountDropdown from "../account/AccountDropdown";
import { useRouter } from "next/router";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const navigation = [
  { name: "Home", href: "/admin", icon: HomeIcon },
  {
    name: "Manage Operators",
    href: "/admin/operators",
    icon: ViewListIcon,
  },
  {
    name: "Manage Artists",
    href: "/admin/artists",
    icon: PencilIcon,
  },
];

export interface AdminDashboardContainerProps {
  pageTitle: string;
  controls?: React.ReactElement;
}
const AdminDashboardContainer: React.FC<AdminDashboardContainerProps> = ({
  children,
  controls,
  pageTitle,
}) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentPath = router.pathname;
  return (
    <AdminAuthenticatedContainer>
      <AdminAuthorisedContainer>
        <div className="relative h-screen flex overflow-hidden bg-white">
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              static
              className="fixed inset-0 flex z-40 lg:hidden"
              open={sidebarOpen}
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
                <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
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
                    <h2>AoA Dashboard</h2>
                  </div>
                  <div className="mt-5 flex-1 h-0 overflow-y-auto">
                    <nav className="px-2">
                      <div className="space-y-1">
                        {navigation.map((item) => {
                          const current = currentPath === item.href;
                          console.log(currentPath, current);
                          return (
                            <button
                              key={item.name}
                              onClick={() => {
                                router.push(item.href);
                              }}
                              className={classNames(
                                current
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                                "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                              )}
                              aria-current={current ? "page" : undefined}
                            >
                              <item.icon
                                className={classNames(
                                  current
                                    ? "text-gray-500"
                                    : "text-gray-400 group-hover:text-gray-500",
                                  "mr-3 flex-shrink-0 h-6 w-6"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </button>
                          );
                        })}
                      </div>
                    </nav>
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-gray-100">
              <div className="flex items-center flex-shrink-0 px-6">
                <h2>AoA Dashboard</h2>
              </div>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="h-0 flex-1 flex flex-col overflow-y-auto">
                {/* User account dropdown */}
                <AccountDropdown />
                {/* Navigation */}
                <nav className="px-3 mt-6">
                  <div className="space-y-1">
                    {navigation.map((item) => {
                      const current = currentPath === item.href;
                      console.log(currentPath, current);
                      return (
                        <button
                          key={item.name}
                          onClick={() => {
                            router.push(item.href);
                          }}
                          className={classNames(
                            current
                              ? "bg-gray-200 text-gray-900"
                              : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
                          )}
                          aria-current={current ? "page" : undefined}
                        >
                          <item.icon
                            className={classNames(
                              current
                                ? "text-gray-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-3 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </nav>
              </div>
            </div>
          </div>
          {/* Main column */}
          <div className="flex flex-col w-0 flex-1 overflow-y-scroll">
            <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                  {pageTitle}
                </h1>
              </div>
              <div className="mt-4 flex sm:mt-0 sm:ml-4">{controls}</div>
            </div>
            {children}
          </div>
        </div>
      </AdminAuthorisedContainer>
    </AdminAuthenticatedContainer>
  );
};

export default AdminDashboardContainer;
