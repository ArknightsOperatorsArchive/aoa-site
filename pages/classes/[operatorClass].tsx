import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useRouter } from "next/router";
import Link from "next/link";

import { akOperatorClasses } from "../../constants/classes";
import CoreContainer from "../../containers/main/CoreContainer";
import ErrorContainer from "../../containers/main/ErrorContainer";
import { useFunctions } from "../../firebase/firebase";
import { useNotificationDispatch } from "../../contexts/NotificationProvider";
import Artwork from "../../types/Artwork";
import Loading from "../../components/Loading";
import classNames from "../../utils/classNames";
import { OperatorRarity } from "../../types/AKOperator";
import { range } from "../../utils/maths";

const OperatorClassPage: React.FC = () => {
  const router = useRouter();
  const functions = useFunctions();
  const notifcations = useNotificationDispatch();

  const [operatorArtworks, setOperatorArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);

  const [currentRarity, setRarity] = useState<OperatorRarity>(-1)

  const { operatorClass } = router.query;

  const validClass =
    (operatorClass as string) &&
    akOperatorClasses.includes(operatorClass as string);

  useEffect(() => {
    if (validClass) {
      setHasErrored(false);
      setIsLoading(true);
      console.info("magic");
      console.log("Getting artworks by operator class...");
      const getArtworksByClass = functions.httpsCallable("getArtworksByClass");

      getArtworksByClass({
        projectId: "main",
        operatorClass: operatorClass as string,
      })
        .then((resp) => {
          setOperatorArtworks(resp.data as Artwork[]);
          setHasErrored(false);
          setIsLoading(false);
        })
        .catch((err: Error) => {
          console.error(err);
          notifcations({
            type: "@@NOTIFICATION/PUSH",
            notification: {
              title: "An Error Occured (see console for more details)",
              message: err.message,
            },
          });
          setHasErrored(true);
          setIsLoading(false);
        });
    }
  }, [validClass]);

  if (!validClass) {
    return <ErrorContainer>Invalid operator class.</ErrorContainer>;
  }

  let displayedOperators: Artwork[] = []


  console.log(operatorArtworks)

  if (currentRarity === -1) {
    displayedOperators = operatorArtworks
  } else {
    displayedOperators = operatorArtworks.filter(artwork => {
      return artwork.operator.rarity === currentRarity
    })
  }


  return (
    <CoreContainer navigationProps={{ type: "compressed" }}>
      <div className="flex flex-1 flex-col items-center">
        <h2 className="text-4xl font-bold">{operatorClass}</h2>
        {hasErrored && (
          <ErrorContainer>
            An error happened, see console for details
          </ErrorContainer>
        )}
        {isLoading && (
          <Loading loadingMessage={`Loading artworks from ${operatorClass}`} />
        )}

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              Rarity
              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item onClick={() => setRarity(-1)}>
                  <div className="block px-4 py-2 text-sm">
                    All
                  </div>
                </Menu.Item>
                <Menu.Item onClick={() => setRarity(0)}>
                  <div className="block px-4 py-2 text-sm">
                    Other
                  </div>
                </Menu.Item>
                <Menu.Item onClick={() => setRarity(6)}>
                  <div className="block px-4 py-2 text-sm">
                    6*
                  </div>
                </Menu.Item>
                <Menu.Item onClick={() => setRarity(5)}>
                  <div className="block px-4 py-2 text-sm">
                    5*
                  </div>
                </Menu.Item>
                <Menu.Item onClick={() => setRarity(4)}>
                  <div className="block px-4 py-2 text-sm">
                    4*
                  </div>
                </Menu.Item>
                <Menu.Item onClick={() => setRarity(3)}>
                  <div className="block px-4 py-2 text-sm">
                    3*
                  </div>
                </Menu.Item>
                <Menu.Item onClick={() => setRarity(2)}>
                  <div className="block px-4 py-2 text-sm">
                    2*
                  </div>
                </Menu.Item>
                <Menu.Item onClick={() => setRarity(1)}>
                  <div className="block px-4 py-2 text-sm">
                    1*
                  </div>
                </Menu.Item>

              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <div className="grid xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 w-full px-4 grid-flow-rows min-w-20">
          {!isLoading &&
            !hasErrored &&
            displayedOperators
              .sort((a, b) => {
                return (b.operator.rarity || 0) - (a.operator.rarity || 0);
              })
              .map((artwork) => {
                return (
                  <Link key={artwork.uid} href={`/artworks/${artwork.uid}`}>
                    <div className="flex flex-1 flex-col min-w-10">
                      <div
                        className="flex flex-1"
                        style={{
                          minHeight: "5rem",
                        }}
                      >
                        {artwork.fileExists ? (
                          <div>Artwork here</div>
                        ) : (
                          <div className="flex-1 bg-gray-100 flex justify-center items-center">
                            No artwork
                          </div>
                        )}
                      </div>
                      <div className="bg-gray-900 text-white text-center py-1.5 px-2">
                        {artwork.operator.name}
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </CoreContainer>
  );
};

export default OperatorClassPage;
