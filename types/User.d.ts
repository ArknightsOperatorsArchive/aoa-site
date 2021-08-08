import firebase from "firebase";

export interface AuthenticationContextState {
  /**
   * This value should be `true` once the initial loading of
   * the current authentication state has completed.
   */
  isLoaded: boolean;

  /**
   * The currently authenticated user if available.
   */
  user: Nullable<firebase.User>;
}

export interface UserData {
  uid: string;
  displayName: string;
  email: string;
  // is administrator
  isAdmin: boolean;
}

export interface UserContextState {
  isLoaded: boolean;

  userData: Nullable<UserData>;
}
