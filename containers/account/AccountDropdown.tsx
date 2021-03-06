import React, { Fragment, useContext } from "react";
import firebase from "firebase";
import { Menu, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import AuthenticationContext from "../../contexts/AuthenticationContext";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const AccountDropdown = () => {
  const { isLoaded, user } = useContext(AuthenticationContext);
  if (!isLoaded || !user) {
    return null;
  }
  const userDisplay: firebase.User = user;
  return (
    <Menu as="div" className="px-3 mt-6 relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
              <span className="flex w-full justify-between items-center">
                <span className="flex min-w-0 items-center justify-between space-x-3">
                  {userDisplay.photoURL ? (
                    <img
                      className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                      src={userDisplay.photoURL}
                      alt=""
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0">
                      {userDisplay.displayName
                        ? userDisplay.displayName[0]
                        : "A"}
                    </div>
                  )}
                  <span className="flex-1 flex flex-col min-w-0">
                    <span className="text-gray-900 text-sm font-medium truncate">
                      {userDisplay.displayName}
                    </span>
                    <span className="text-gray-500 text-sm truncate">
                      {userDisplay.email}
                    </span>
                  </span>
                </span>
                <SelectorIcon
                  className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </span>
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
            >
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      View profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Notifications
                    </a>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/auth/logout"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Logout
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default AccountDropdown;
