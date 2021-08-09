import React, { Fragment, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

import AdminDashboardContainer from "../../containers/AdminContainers/AdminDashboardContainer";
import AddOperatorModal from "../../containers/AdminContainers/modals/AddOperatorModal";
import AKOperator from "../../types/AKOperator";
import { useFunctions } from "../../firebase/firebase";
import { paginate } from "../../utils/paginate";
import DeleteOperatorModal from "../../containers/AdminContainers/modals/DeleteOperatorModal";

const Operators = () => {
  const functions = useFunctions();
  let [modalOpen, setModalOpen] = useState(false);
  const [loaded, setIsLoaded] = useState(false);
  const [arknightsOperators, setArknightsOperators] = useState<AKOperator[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);

  const { startIndex, endIndex, totalItems, pages, totalPages } = paginate(
    arknightsOperators.length,
    currentPage
  );

  console.log(startIndex, endIndex, totalItems, pages, totalPages);

  useEffect(() => {
    function getData() {
      setIsLoaded(false);
      const getUser = functions.httpsCallable("getOperators");
      getUser()
        .then((result) => {
          console.log(result);
          const data = result.data as AKOperator[];
          return data;
        })
        .then((data) => {
          const sortedData = data.sort((a, b) => {
            if (a.name > b.name) return 1;
            return -1;
          });
          setArknightsOperators(sortedData);
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
          const getUser = functions.httpsCallable("getOperators");
          getUser()
            .then((result) => {
              console.log(result);
              const data = result.data as AKOperator[];
              setArknightsOperators(data);
              setIsLoaded(true);
            })
            .catch((err) => {
              setArknightsOperators([]);
              setIsLoaded(true);
              console.error(err);
            });
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
              Add Operator
            </button>
          </Fragment>
        }
      >
        {!loaded ? (
          <div>Loading...</div>
        ) : (
          <>
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
                </tr>
              </thead>
              <tbody>
                {arknightsOperators
                  .slice(startIndex, endIndex + 1)
                  .map((operator, index) => {
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
                        <td>
                          <DeleteOperatorModal operator={operator} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </a>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{startIndex + 1}</span> to{" "}
                    <span className="font-medium">{endIndex + 1}</span> of{" "}
                    <span className="font-medium">{totalItems}</span> results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => {
                        if (currentPage != 1) {
                          setCurrentPage(currentPage - 1);
                        }
                      }}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {pages.map((pageNumber) => {
                      return (
                        <button
                          onClick={() => setCurrentPage(pageNumber)}
                          key={pageNumber}
                          aria-current="page"
                          className={
                            currentPage === pageNumber
                              ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                          }
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => {
                        if (currentPage === totalPages) {
                          setCurrentPage(currentPage + 1);
                        }
                      }}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
      </AdminDashboardContainer>
    </Fragment>
  );
};

export default Operators;
