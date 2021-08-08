import React, { useState } from "react";
import { useEffect } from "react";
import UserInfoContext from "../contexts/UserInfoContext";
import { useFunctions } from "../firebase/firebase";
import { Nullable } from "../types";
import { UserData } from "../types/User";

export const UserInfoProvider: React.FC = ({ children }) => {
  const functions = useFunctions();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [userData, setUserData] = useState<Nullable<UserData>>(null);

  useEffect(() => {
    console.log("Calling User Info Function...");
    const getUser = functions.httpsCallable("getUser");
    getUser()
      .then((res) => {
        console.log(res);
        const data = res.data as UserData;
        setUserData(data);
        setIsLoaded(true);
      })
      .catch((err) => {
        setUserData(null);
        setIsLoaded(true);
        console.error(err);
      });
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
