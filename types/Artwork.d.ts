import AKOperator from "./AKOperator";
import Artist from "./Artist";

export default interface Artwork {
  uid?: string;
  artist: Artist;
  operator: AKOperator;
  status: status;
}

export type ArtworkStatus =
  | "Not Assigned"
  | "Assigned"
  | "Work in Progress"
  | "Finished";
