import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { doSignOut } from "../../../firebase/firebase";

const LogoutPage: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    doSignOut().then(() => router.push("/"));
  });

  return <div>Logging you out...</div>;
};

export default LogoutPage;
