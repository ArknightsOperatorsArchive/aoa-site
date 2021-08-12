import { useRouter } from "next/router";
import React from "react";
import AccountDropdown from "../../account/AccountDropdown";
import NavigationItem from "./Navigation";

interface StaticSidebarProps {
  navigationItems: NavigationItem[];
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const StaticSidebar: React.FC<StaticSidebarProps> = ({ navigationItems }) => {
  const router = useRouter();

  const currentPath = router.pathname;

  return (
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
              {navigationItems.map((item) => {
                const current = currentPath === item.href;
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
  );
};

export default StaticSidebar;
