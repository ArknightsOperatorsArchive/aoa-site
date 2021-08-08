import React, { useContext } from "react";
import { useRouter } from "next/router";
import UserInfoContext from "../../contexts/UserInfoContext";

const AdminAuthorisedContainer: React.FC = ({ children }) => {
  const { isLoaded, userData } = useContext(UserInfoContext);
  const router = useRouter();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isLoaded) {
    if (!userData) {
      router.push("/admin/401");
    }
    if (userData && !userData.isAdmin) {
      router.push("/admin/403");
    }
  }

  return <div>{children}</div>;
};

export default AdminAuthorisedContainer;
