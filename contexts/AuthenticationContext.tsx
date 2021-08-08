import React from "react";
import { AuthenticationContextState } from "../types/User";

const AuthenticationContext = React.createContext<AuthenticationContextState>({
  isLoaded: false,
  user: null,
});

export default AuthenticationContext;
