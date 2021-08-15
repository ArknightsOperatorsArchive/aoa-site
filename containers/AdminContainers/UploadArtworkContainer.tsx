import React, { useCallback, useEffect, useState } from "react";
import { CloudUploadIcon, DocumentRemoveIcon } from "@heroicons/react/outline";
import Dropzone from "react-dropzone";
import { useStorage } from "../../firebase/firebase";
import ErrorContainer from "../../components/Error";
import Artwork from "../../types/Artwork";
import { Nullable } from "../../types";
import Loading from "../../components/Loading";
import DeleteConfirmationModal from "./modals/DeleteConfirmationModal";

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

  const targetArtworkRef = `/projects/${projectId}/artworkId/${artworkId}`;

  console.log(artwork);

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
      <ErrorContainer>
        <h2 className="text-xl font-semibold">Error Occured</h2>
        <h3 className="text-md font-regular text-grey-300">
          Error container needs artworkId and projectId
        </h3>
      </ErrorContainer>
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
          onDelete={() => {
            async () => {
              await storage.ref().child(targetArtworkRef).delete();
            };
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
        console.log(storage);
      }}
      onDropRejected={(err) => {
        console.error;
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
