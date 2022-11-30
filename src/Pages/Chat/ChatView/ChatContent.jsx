import { useContext, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { currentContext } from "../../../context/CurrentUser";
import { FirebaseContext } from "../../../context/FirebaseContext";
import { SecondUserContext } from "../../../context/SecondUserContext";
import ChatMessage from "./ChatMessage";
const ChatContent = () => {
  const { messageCollection } = useContext(FirebaseContext);
  const [sortedMessages, setSortedMessages] = useState([]);
  const { userData, currentUser } = useContext(currentContext);
  const { secondUser } = useContext(SecondUserContext);

  const query =
    secondUser?.uid &&
    messageCollection
      .where("relation", "in", [
        `${userData.uid}/${secondUser.uid}`,
        `${secondUser.uid}/${userData.uid}`,
      ])
      .limit(25);
  const [messages] = useCollectionData(query);
  useEffect(() => {
    if (messages) {
      setSortedMessages(messages.sort((a, b) => a.createdAt - b.createdAt));
    }
  }, [messages]);

  return (
    <div className="chat-area-main chat-section py-3 px-5">
      {sortedMessages.map((data, index) => {
        return (
          <ChatMessage
            owner={userData.uid === data.createdBy}
            key={index}
            msgData={data.msg}
            photoUrl={
              userData.uid === data.createdBy
                ? currentUser[0]?.photoUrl
                : secondUser.photoUrl
            }
          />
        );
      })}
    </div>
  );
};

export default ChatContent;
