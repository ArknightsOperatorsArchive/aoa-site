import AKOperator from "./AKOperator";
import Artist from "./Artist";

export default interface Artwork {
  uid?: string;
  artist: Artist;
  artists?: Artist[];
  operator: AKOperator;
  status: status;
  fileExists?: boolean;
}

export type ArtworkStatus =
  | "Not Assigned"
  | "Assigned"
  | "Work in Progress"
  | "Finished";
