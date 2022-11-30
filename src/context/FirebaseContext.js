import { createContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  firebase.initializeApp({
    apiKey: "AIzaSyBniO851wfnruePpcFWCAsrWmP1qABOoLc",
    authDomain: "challe-go.firebaseapp.com",
    projectId: "challe-go",
    storageBucket: "challe-go.appspot.com",
    messagingSenderId: "819653236879",
    appId: "1:819653236879:web:1ad1503cedd013e41478fa",
  });
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const userCollection = firestore.collection("users");
  const messageCollection = firestore.collection("messages");
  const challengeCollection = firestore.collection("challenges");
  const [users] = useCollectionData(userCollection);

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        auth,
        userCollection,
        messageCollection,
        challengeCollection,
        firestore,
        users,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
