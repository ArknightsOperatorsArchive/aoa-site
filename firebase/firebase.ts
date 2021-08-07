import firebase from "./";
import "firebase/auth";
import authProviders from "./authProviders";

export const useAuth = () => firebase.auth();

export const useFirestore = () => firebase.firestore();

export const useStorage = () => firebase.storage();

export const useFunctions = () => firebase.functions();
export const doSignInWithGoogle = () => {
  return firebase.auth().signInWithRedirect(authProviders.googleAuthProvider);
};

export const doSignOut = () => firebase.auth().signOut();
