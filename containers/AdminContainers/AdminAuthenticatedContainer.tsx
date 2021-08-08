import React, { useContext } from "react";
import { useRouter } from "next/router";
import AuthenticationContext from "../../contexts/AuthenticationContext";

const AdminAuthenticatedContainer: React.FC = ({ children }) => {
  const { isLoaded, user } = useContext(AuthenticationContext);
  const router = useRouter();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isLoaded && !user) {
    router.push("/admin/401");
  }
  return <div>{children}</div>;
};

export default AdminAuthenticatedContainer;
