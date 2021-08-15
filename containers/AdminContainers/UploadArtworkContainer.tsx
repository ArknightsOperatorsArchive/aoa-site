import React, { useCallback } from "react";
import { CloudUploadIcon } from "@heroicons/react/outline";
import Dropzone from "react-dropzone";
import { useStorage } from "../../firebase/firebase";
import ErrorContainer from "../../components/Error";

interface UploadArtworkContainerProps {
  artworkId: string;
  projectId: string;
}

const UploadArtworkContainer: React.FC<UploadArtworkContainerProps> = ({
  artworkId,
  projectId,
}) => {
  const storage = useStorage();

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
  return (
    <Dropzone
      onDrop={async (acceptedFiles) => {
        const file = acceptedFiles[0];
        await storage
          .ref()
          .child(`/projects/${projectId}/artworkId/${artworkId}`)
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
