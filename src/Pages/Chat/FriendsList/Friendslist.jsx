import { useContext } from "react";
import { FirebaseContext } from "../../../context/FirebaseContext";
import { currentContext } from "../../../context/CurrentUser";
import { useCollectionData } from "react-firebase-hooks/firestore";
import FriendInbox from "./FriendInbox";

const FriendList = () => {
  const { userCollection } = useContext(FirebaseContext);
  const [users] = useCollectionData(userCollection);
  const { friends } = useContext(currentContext);

  return (
    <div className="conversation-area  chat-sidebar bg-body pt-1">
      {friends?.map((user) => {
        return <FriendInbox active key={user.uid} user={user} />;
      })}
    </div>
  );
};

export default FriendList;
