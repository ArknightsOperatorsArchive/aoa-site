import React, { useContext } from "react";
import AuthenticationContext from "../contexts/AuthenticationContext";

const AdminAuthenticatedContainer: React.FC = ({ children }) => {
  const { isLoaded, user } = useContext(AuthenticationContext);
  return (
    <div>
      <div>{`${isLoaded}, ${JSON.stringify(user)}`}</div>
      {children}
    </div>
  );
};

export default AdminAuthenticatedContainer;
