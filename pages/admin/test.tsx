import React, { useEffect } from "react";
import AdminDashboardContainer from "../../containers/AdminContainers/AdminDashboardContainer";
import { useFirestore } from "../../firebase/firebase";

const TestPage: React.FC = () => {
  const firestore = useFirestore();

  useEffect(() => {
    function getData() {
      const artistId = "9HMInPOlAbKfpcvIxNHZ";
      firestore
        .collectionGroup("artworks")
        .where("artist.uid", "==", artistId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
          });
        });
    }
    getData();
  }, [firestore]);
  return (
    <AdminDashboardContainer pageTitle="Test Page">
      Hello World!
    </AdminDashboardContainer>
  );
};

export default TestPage;
