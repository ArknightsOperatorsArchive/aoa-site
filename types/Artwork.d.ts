export default interface Artwork {
  uid?: string;
  artistId: string;
  operatorId: string;
  status: "Not Assigned" | "Assigned" | "Work in Progress" | "Finished";
}
