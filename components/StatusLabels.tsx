import React from "react";
import { ArtworkStatus } from "../types/Artwork";

interface StatusLabelsProps {
  status: ArtworkStatus;
}

const StatusBadgeBase: React.FC<{ color: string }> = ({ color, children }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}
    >
      {children}
    </span>
  );
};

const StatusLabels: React.FC<StatusLabelsProps> = ({ status }) => {
  switch (status) {
    case "Assigned":
      return <StatusBadgeBase color="blue">Assigned</StatusBadgeBase>;
    case "Not Assigned":
      return <StatusBadgeBase color="gray">Not Assigned</StatusBadgeBase>;
    case "Work in Progress":
      return <StatusBadgeBase color="yellow">WIP</StatusBadgeBase>;
    case "Finished":
      return <StatusBadgeBase color="green">Finished</StatusBadgeBase>;
    default:
      return null;
  }
};

export default StatusLabels;
