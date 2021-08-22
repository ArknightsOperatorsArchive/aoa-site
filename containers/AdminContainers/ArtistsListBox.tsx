import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";

import { Nullable } from "../../types";

import Artist from "../../types/Artist";
import classNames from "../../utils/classNames";

interface ArtistsListBoxProps {
  artists: Artist[];
  selectedArtist: Nullable<Artist>;
  onChange: (artist: Artist) => void;
}

const ArtistsListBox: React.FC<ArtistsListBoxProps> = ({
  artists,
  selectedArtist,
  onChange,
}) => {
  const regex = /[$-/:-?{-~!"^_`\/\[\]/]/;
  const sortedArtists = artists.sort((a, b) => {
    return a.displayName.split(regex)[0].replace(regex, "").toLowerCase() >
      b.displayName
        .split(regex)[0]
        .replace(regex, "")
        .split("/")[0]
        .toLowerCase()
      ? 1
      : -1;
  });
  return (
    <Listbox value={selectedArtist} onChange={onChange}>
      {({ open }) => (
        <div className="mt-3 z-30 flex-1">
          <Listbox.Label className="block z-10 text-sm font-medium text-gray-700">
            Artist
          </Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="bg-white z-10 relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="block truncate">
                {selectedArtist?.displayName}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                style={{ zIndex: 100 }}
                className="absolute z-100 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              >
                {sortedArtists.map((artist, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    style={{
                      zIndex: 100,
                    }}
                    value={artist}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate font-lg"
                          )}
                        >
                          {artist.displayName}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
};

export default ArtistsListBox;
