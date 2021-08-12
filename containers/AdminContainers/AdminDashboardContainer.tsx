import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  HomeIcon,
  ViewListIcon,
  XIcon,
  PencilIcon,
  BriefcaseIcon,
  MenuAlt1Icon,
} from "@heroicons/react/outline";
import AdminAuthenticatedContainer from "./AdminAuthenticatedContainer";
import AdminAuthorisedContainer from "./AdminAuthorisedContainer";
import AccountDropdown from "../account/AccountDropdown";
import { useRouter } from "next/router";
import { ProjectProvider } from "../../providers/ProjectsProvider";
import MobileSidebar from "./sidebars/MobileSidebar";
import StaticSidebar from "./sidebars/StaticSidebar";

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
  {
    name: "Manage Projects",
    href: "/admin/projects",
    icon: BriefcaseIcon,
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
        <ProjectProvider>
          <div className="relative h-screen flex overflow-hidden bg-white">
            <MobileSidebar
              navigationItems={navigation}
              onClose={() => {
                setSidebarOpen(false);
              }}
              sidebarOpen={sidebarOpen}
            />

            <StaticSidebar navigationItems={navigation} />

            {/* Main column */}
            <div className="flex flex-col w-0 flex-1 overflow-y-scroll">
              <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="flex-1 min-w-0 flex items-center">
                  <button
                    className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <span className="sr-only">Open sidebar</span>
                    <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <h1 className="text-lg font-medium leading-6 ml-4 text-gray-900 sm:truncate">
                    {pageTitle}
                  </h1>
                </div>
                <div className="mt-4 flex sm:mt-0 sm:ml-4">{controls}</div>
              </div>
              {children}
            </div>
          </div>
        </ProjectProvider>
      </AdminAuthorisedContainer>
    </AdminAuthenticatedContainer>
  );
};

export default AdminDashboardContainer;
