import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import AdminDashboardContainer from "../../containers/AdminContainers/AdminDashboardContainer";
import AddOperatorModal from "../../containers/AdminContainers/modals/AddOperatorModal";
import AKOperator from "../../types/AKOperator";
import { useFunctions } from "../../firebase/firebase";

const Operators = () => {
  const functions = useFunctions();
  let [modalOpen, setModalOpen] = useState(false);
  const [loaded, setIsLoaded] = useState(false);
  const [arknightsOperators, setArknightsOperators] = useState<AKOperator[]>(
    []
  );

  useEffect(() => {
    function getData() {
      const getUser = functions.httpsCallable("getOperators");
      getUser()
        .then((result) => {
          console.log(result);
          const data = result.data as UserData;
          setArknightsOperators(data);
          setIsLoaded(true);
        })
        .catch((err) => {
          setArknightsOperators([]);
          setIsLoaded(true);
          console.error(err);
        });
    }
    getData();
  }, [functions]);

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
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Class
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {arknightsOperators.map((operator, index) => {
              const lowercaseClass =
                operator.class.charAt(0).toLowerCase() +
                operator.class.slice(1);
              return (
                <tr
                  key={operator.uid}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {operator.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                    <img
                      className="h-6 w-6"
                      src={`/images/classes/icon_profession_${lowercaseClass}_large.png`}
                      alt={`${lowercaseClass} logo`}
                    />
                    <span className="ml-1">{operator.class}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </AdminDashboardContainer>
    </Fragment>
  );
};

export default Operators;
