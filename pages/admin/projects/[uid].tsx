import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminDashboardContainer from "../../../containers/AdminContainers/AdminDashboardContainer";
import AddArtworkModal from "../../../containers/AdminContainers/modals/Artwork/AddArtworkModal";

const ProjectPage = () => {
  const [addArtworkModalOpen, setAddArtworkModalOpen] = useState(false);
  const router = useRouter();
  const { uid } = router.query;

  useEffect(() => {});
  return (
    <React.Fragment>
      <AddArtworkModal
        modalOpen={addArtworkModalOpen}
        onClose={() => setAddArtworkModalOpen(false)}
      />
      <AdminDashboardContainer
        pageTitle={"Manage Project"}
        controls={
          <Fragment>
            <button
              type="button"
              onClick={() => setAddArtworkModalOpen(true)}
              className="order-0 inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md text-blue-900 border-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
              Add Artwork
            </button>
          </Fragment>
        }
      >
        <div className="flex-1 min-w-0 px-3 py-2">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"></h2>
        </div>
      </AdminDashboardContainer>
    </React.Fragment>
  );
};

export default ProjectPage;
