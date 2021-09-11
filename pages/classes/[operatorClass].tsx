import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { akOperatorClasses } from "../../constants/classes";
import CoreContainer from "../../containers/main/CoreContainer";
import ErrorContainer from "../../containers/main/ErrorContainer";
import { useFunctions } from "../../firebase/firebase";
import { useNotificationDispatch } from "../../contexts/NotificationProvider";
import Artwork from "../../types/Artwork";
import Loading from "../../components/Loading";

const OperatorClassPage: React.FC = () => {
  const router = useRouter();
  const functions = useFunctions();
  const notifcations = useNotificationDispatch();

  const [operatorArtworks, setOperatorArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);

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
        <div className="grid grid-cols-6 gap-4 mt-4 flex flex-1 w-full px-4 grid-flow-rows min-w-20">
          {!isLoading &&
            !hasErrored &&
            operatorArtworks
              .sort((a, b) => {
                return (b.operator.rarity || 0) - (a.operator.rarity || 0);
              })
              .map((artwork) => {
                return (
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
                );
              })}
        </div>
      </div>
    </CoreContainer>
  );
};

export default OperatorClassPage;
