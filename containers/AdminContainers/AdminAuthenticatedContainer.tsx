import React, { useContext } from "react";
import { useRouter } from "next/router";
import AuthenticationContext from "../../contexts/AuthenticationContext";
import { useEffect } from "react";

const AdminAuthenticatedContainer: React.FC = ({ children }) => {
  const { isLoaded, user } = useContext(AuthenticationContext);
  const router = useRouter();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/admin/401");
    }
  });
  return (
    <div>
      <div>{`${isLoaded}, ${JSON.stringify(user)}`}</div>
      {children}
    </div>
  );
};

export default AdminAuthenticatedContainer;
