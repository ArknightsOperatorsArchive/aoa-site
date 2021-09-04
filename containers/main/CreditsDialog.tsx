import React, { Fragment, useContext, useState } from "react";

import UnderlineButton from "../../components/UnderlineButton";
import { useArtistState } from "../../contexts/ArtistsContext";
import chunkArray from "../../utils/chunkArray";
import CoreDialog from "./CoreDialog";

const CreditsModal: React.FC = () => {
  let [isOpen, setIsOpen] = useState(false);

  const artists = useArtistState();

  return (
    <Fragment>
      <UnderlineButton
        onClick={() => setIsOpen(true)}
        className="text-2xl my-2"
      >
        credits
      </UnderlineButton>
      <CoreDialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="font-black uppercase italic leading-6 max-w-xs">
          <h2 className="text-7xl">Credits</h2>
        </div>
        <div className="mt-4">
          <h2>Organisers</h2>
          <ul>
            <li>bweng</li>
            <li>zero</li>
          </ul>
        </div>
        <div className="mt-4">
          <h2>Artists</h2>
          {!artists.isLoaded ? (
            <div>Loading...</div>
          ) : (
            chunkArray(
              artists.artists,
              Math.ceil(artists.artists.length / 3)
            ).map((col, index) => {
              console.log(col);
              return (
                <div key={index}>
                  <ul>
                    {col.map((artist) => {
                      return <li key={artist.uid}>{artist.displayName}</li>;
                    })}
                  </ul>
                </div>
              );
            })
          )}
        </div>
      </CoreDialog>
    </Fragment>
  );
};

export default CreditsModal;
