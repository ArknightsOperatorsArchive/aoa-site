import React from "react";
import { useFunctions } from "../../firebase/firebase";
import CoreContainer from "../../containers/main/CoreContainer";

import Artwork from "../../types/Artwork";
import { NextPageContext } from "next";
import SocialTag from "../../components/SocialTag";

interface ArtworksPageProps {
  data: Artwork;
}

const ArtworksPage: React.FC<ArtworksPageProps> = ({ data }) => {
  console.log(data);

  return (
    <CoreContainer>
      <div className="flex flex-1 flex-col min-w-10">
        <div
          className="flex flex-1"
          style={{
            minHeight: "5rem",
          }}
        >
          {data.fileExists ? (
            <div>Artwork here</div>
          ) : (
            <div className="flex-1 bg-gray-100 flex justify-center items-center">
              No artwork
            </div>
          )}
        </div>
        <div className="bg-gray-900 text-white text-center py-1.5 px-2">
          <h2 className="text-2xl">{data.operator.name}</h2>
          <h3 className="text-xl">{`By ${data.artist.displayName}`}</h3>
          {data.artist.socials.map((social) => {
            return <SocialTag social={social} />;
          })}
        </div>
      </div>
    </CoreContainer>
  );
};

export default ArtworksPage;

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { query } = ctx;

  const functions = useFunctions();
  const getArtworkById = functions.httpsCallable("getArtwork");
  const results = await getArtworkById({
    projectId: "main",
    artworkId: query.artworkId,
  })
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.error(err);
    });
  if (!results) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: results || null,
    },
  };
};
