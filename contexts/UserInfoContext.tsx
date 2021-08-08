import React from "react";
import { UserContextState } from "../types/User";

const UserInfoContext = React.createContext<UserContextState>({
  isLoaded: false,
  userData: null,
});

export default UserInfoContext;
