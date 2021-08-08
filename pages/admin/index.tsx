import React from "react";
import AdminAuthenticatedContainer from "../../containers/AdminContainers/AdminAuthenticatedContainer";
import AdminAuthorisedContainer from "../../containers/AdminContainers/AdminAuthorisedContainer";
import { doSignInWithGoogle } from "../../firebase/firebase";

const AdminHomePage: React.FC = () => {
  return (
    <AdminAuthenticatedContainer>
      <AdminAuthorisedContainer>
        <div>"Hello World from Admin!"</div>
      </AdminAuthorisedContainer>
    </AdminAuthenticatedContainer>
  );
};

export default AdminHomePage;
