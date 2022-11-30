import { createContext, useContext, useEffect, useState } from "react";
import { FirebaseContext } from "./FirebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { toast } from "react-toastify";
import male from "../assets/profile/male.svg";
import female from "../assets/profile/female.svg";
export const currentContext = createContext();
const CurrentUserProvider = ({ children }) => {
  const { auth, userCollection, users } = useContext(FirebaseContext);
  const [userData] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState([]);
  const query =
    userData?.uid && userCollection.where("uid", "==", userData.uid);
  const [currentUser, userLoading] = useCollectionData(query);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    if (currentUser?.length === 0) {
      userCollection.doc(userData.uid).set({
        uid: userData.uid,
        name: userData.displayName || userInfo.name,
        email: userData.email,
        photoUrl: userData.emailVerified
          ? userData.photoURL
          : userData.emailVerified === false && userInfo.gender.value == 1
          ? male
          : female,
        username: (userData.email || userInfo.email).split("@")[0],
        interests: userData.emailVerified
          ? []
          : userInfo.Interests
          ? userInfo.Interests
          : [],
        friends: [],
        sentRequests: [],
        receivedRequests: [],
        finishedChallenges: [],
        userBadge: "",
      });
    }
    setUserInfo([]);
  }, [currentUser]);

  const updateCurrentUser = (key, value, message) => {
    userCollection
      .doc(currentUser[0].uid)
      .set(
        {
          [key]: value,
        },
        { merge: true }
      )
      .then(() => {
        toast(message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };
  useEffect(() => {
    if (currentUser && userData) {
      const filteredUserFriends = [];
      currentUser[0]?.friends.forEach((friend) => {
        users.filter((user) => {
          if (user.uid === friend) {
            filteredUserFriends.push(user);
          }
        });
      });
      setFriends(filteredUserFriends);
    }
  }, [currentUser]);

  return (
    <currentContext.Provider
      value={{
        userData,
        setUserInfo,
        currentUser,
        userLoading,
        updateCurrentUser,
        friends,
      }}
    >
      {children}
    </currentContext.Provider>
  );
};

export default CurrentUserProvider;
