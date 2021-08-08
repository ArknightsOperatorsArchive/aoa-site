import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import AdminDashboardContainer from "../../containers/AdminContainers/AdminDashboardContainer";
import AddOperatorModal from "../../containers/AdminContainers/modals/AddOperatorModal";

const Operators = () => {
  let [modalOpen, setModalOpen] = useState(false);
  return (
    <Fragment>
      <AddOperatorModal
        modalOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
      <AdminDashboardContainer
        pageTitle="Manage Operators"
        controls={
          <Fragment>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
              Create
            </button>
          </Fragment>
        }
      ></AdminDashboardContainer>
    </Fragment>
  );
};

export default Operators;
