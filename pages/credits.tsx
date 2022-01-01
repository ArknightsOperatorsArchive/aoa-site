import React from "react";
import CoreContainer from "../containers/main/CoreContainer";
import { useArtistState } from "../contexts/ArtistsContext";

const AboutPage = () => {
  const artists = useArtistState();
  return (
    <CoreContainer>
      <div className="py-4 px-2">
        <div className="font-black uppercase italic leading-6 flex-1">
          <h2 className="text-7xl">credits</h2>
        </div>
        <div className="mt-4">
          <div className="mt-4">
            <h2 className="font-semibold text-2xl">Organisers</h2>
            <ul className="mt-2">
              <li>bweng</li>
              <li>zero</li>
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="font-semibold text-2xl">Special thanks to</h2>
            <ul className="mt-2">
              <li>
                <b>Sushisamaou</b> for designing the website
              </li>
              <li>
                <b>kanadechiii</b> for designing the logo and artbook covers
              </li>
              <li>
                <b>EliseMosser</b> for making the NPC logo
              </li>
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
        </div>
      </div>
    </CoreContainer>
  );
};

export default AboutPage;
