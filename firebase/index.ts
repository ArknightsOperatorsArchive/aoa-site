import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import "firebase/messaging";

import AuthProviders from "./authProviders";

const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

export const fbApp = firebase.initializeApp(FirebaseCredentials);

export const useAuth = () => fbApp.auth();

export const useFirestore = () => fbApp.firestore();

export const useStorage = () => fbApp.storage();

export const useFunctions = () => fbApp.functions();
export const doSignInWithGoogle = () => {
  return fbApp.auth().signInWithRedirect(AuthProviders.googleAuthProvider);
};

export const doSignOut = () => fbApp.auth().signOut();
