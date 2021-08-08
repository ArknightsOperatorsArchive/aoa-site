import React from "react";
import AdminDashboardContainer from "../../containers/AdminContainers/AdminDashboardContainer";

const AdminHomePage: React.FC = () => {
  return (
    <AdminDashboardContainer pageTitle="Home">
      <div>"Hello World from Admin!"</div>
    </AdminDashboardContainer>
  );
};

export default AdminHomePage;
