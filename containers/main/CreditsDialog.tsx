import React, { Fragment, useContext, useRef, useState } from "react";

import UnderlineButton from "../../components/UnderlineButton";
import { useArtistState } from "../../contexts/ArtistsContext";
import CoreDialog from "./CoreDialog";

const CreditsModal: React.FC = () => {
  let [isOpen, setIsOpen] = useState(false);

  const artists = useArtistState();

  const ref = useRef(null);

  return (
    <Fragment>
      <UnderlineButton
        onClick={() => setIsOpen(true)}
        className="text-2xl my-2"
      >
        credits
      </UnderlineButton>
      <CoreDialog isOpen={isOpen} setIsOpen={setIsOpen} ref={ref}>
        <div className="font-black uppercase italic leading-6 max-w-xs">
          <h2 className="text-7xl" ref={ref}>
            Credits
          </h2>
        </div>
        <div className="mt-4">
          <h2 className="font-semibold text-2xl">Organisers</h2>
          <ul className="mt-2">
            <li>bweng</li>
            <li>zero</li>
          </ul>
        </div>
        <div className="mt-4">
          <h2 className="font-semibold text-2xl">Artists</h2>
          {!artists.isLoaded && !artists.artists ? (
            <div>Loading...</div>
          ) : (
            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-200 gap-2">
              {artists.artists.map((artist) => {
                return <div key={artist.uid}>{artist.displayName}</div>;
              })}
            </div>
          )}
        </div>
      </CoreDialog>
    </Fragment>
  );
};

export default CreditsModal;
