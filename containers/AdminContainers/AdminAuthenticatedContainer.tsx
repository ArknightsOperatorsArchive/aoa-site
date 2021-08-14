import React, { useContext } from "react";
import { useRouter } from "next/router";
import AuthenticationContext from "../../contexts/AuthenticationContext";
import Loading from "../../components/Loading";

const AdminAuthenticatedContainer: React.FC = ({ children }) => {
  const { isLoaded, user } = useContext(AuthenticationContext);
  const router = useRouter();

  if (!isLoaded) {
    return <Loading loadingMessage="Loading Auth Details..." />;
  }

  if (isLoaded && !user) {
    router.push("/admin/401");
  }
  return <div>{children}</div>;
};

export default AdminAuthenticatedContainer;
