import React, { useEffect, useState } from "react";
import UserInfoContext from "../contexts/UserInfoContext";
import { useFunctions } from "../firebase/firebase";

import { Nullable } from "../types";
import { UserData } from "../types/User";

export const UserInfoProvider: React.FC = ({ children }) => {
  const functions = useFunctions();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [userData, setUserData] = useState<Nullable<UserData>>(null);

  useEffect(() => {
    function getData() {
      console.log("Calling User Info Function...");
      const getUser = functions.httpsCallable("getUser");
      getUser()
        .then((result) => {
          console.log(result);
          const data = result.data as UserData;
          setUserData(data);
          setIsLoaded(true);
        })
        .catch((err) => {
          setUserData(null);
          setIsLoaded(true);
          console.error(err);
        });
    }
    if (!isLoaded) {
      getData();
    }
  }, [functions]);

  return (
    <UserInfoContext.Provider
      value={{
        isLoaded,
        userData,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};
