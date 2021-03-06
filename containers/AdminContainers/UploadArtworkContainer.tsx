import React, { useCallback, useEffect, useState } from "react";
import {
  CheckCircleIcon,
  CloudUploadIcon,
  DocumentRemoveIcon,
} from "@heroicons/react/outline";
import Dropzone from "react-dropzone";
import { useStorage } from "../../firebase/firebase";
import ErrorComponent from "../../components/Error";
import Artwork from "../../types/Artwork";
import { Nullable } from "../../types";
import Loading from "../../components/Loading";
import DeleteConfirmationModal from "./modals/DeleteConfirmationModal";
import { useNotificationDispatch } from "../../contexts/NotificationProvider";
import router from "next/router";

interface UploadArtworkContainerProps {
  artwork: Artwork;
  projectId: string;
}

const UploadArtworkContainer: React.FC<UploadArtworkContainerProps> = ({
  artwork,
  projectId,
}) => {
  const storage = useStorage();
  const artworkId = artwork.uid;

  const [storageUrl, setStorageUrl] = useState<Nullable<string>>(null);
  const [artworkLoading, setArtworkLoading] = useState(false);

  const dispatchNotifcation = useNotificationDispatch();

  const targetArtworkRef = `/projects/${projectId}/artworkId/${artworkId}`;

  useEffect(() => {
    async function getData() {
      setArtworkLoading(true);
      if (artwork.fileExists) {
        const s = await storage.ref().child(targetArtworkRef).getDownloadURL();
        setStorageUrl(s);
      }
      setArtworkLoading(false);
    }
    getData();
  }, [storage]);

  if (!artworkId || !projectId) {
    return (
      <ErrorComponent>
        <h2 className="text-xl font-semibold">Error Occured</h2>
        <h3 className="text-md font-regular text-grey-300">
          Error container needs artworkId and projectId
        </h3>
      </ErrorComponent>
    );
  }

  if (artwork.fileExists) {
    if (artworkLoading) {
      return <Loading loadingMessage="Loading image..." />;
    }
    return (
      <div className="mt-10 flex flex-col">
        <img src={`${storageUrl}`} className="mx-auto w-1/2" />
        <DeleteConfirmationModal
          onDelete={async () => {
            await storage
              .ref()
              .child(targetArtworkRef)
              .delete()
              .then(() => {
                dispatchNotifcation({
                  type: "@@NOTIFICATION/PUSH",
                  notification: {
                    title: "Successfully deleted artwork!",
                    message: "Artwork has been successfully deleted!",
                    icon: (
                      <CheckCircleIcon
                        className="h-6 w-6 text-green-400"
                        aria-hidden="true"
                      />
                    ),
                  },
                });
              });
            router.reload();
          }}
          modalHeading="Delete Image"
          buttonLabel={
            <div className="flex items-center">
              <DocumentRemoveIcon className="h-5 w-5 mr-1" />{" "}
              <span>Remove Artwork</span>
            </div>
          }
        >
          Are you sure you want to remove this image?
        </DeleteConfirmationModal>
      </div>
    );
  }
  return (
    <Dropzone
      onDrop={async (acceptedFiles) => {
        const file = acceptedFiles[0];
        await storage
          .ref()
          .child(targetArtworkRef)
          .put(file)
          .then((snapshot) => snapshot);
        dispatchNotifcation({
          type: "@@NOTIFICATION/PUSH",
          notification: {
            title: "Successfully uploaded artwork!",
            message: "Artwork has been successfully uploaded!",
            icon: (
              <CheckCircleIcon
                className="h-6 w-6 text-green-400"
                aria-hidden="true"
              />
            ),
          },
        });
        router.back();
      }}
      onDropRejected={(err) => {
        console.error(err);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <section className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-3">
          <div {...getRootProps()} className="flex flex-col items-center">
            <input {...getInputProps()} accept="images/png, images/jpeg" />
            <CloudUploadIcon className="h-10 w-10" />
            <p className="mt-2">
              Drag 'n' drop some files here, or click to select files
            </p>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default UploadArtworkContainer;
