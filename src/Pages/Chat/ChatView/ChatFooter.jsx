import React, { useState } from "react";
import { useContext } from "react";
import { FirebaseContext } from "../../../context/FirebaseContext";
import { currentContext } from "../../../context/CurrentUser";
import { SecondUserContext } from "../../../context/SecondUserContext";
import { IoSend } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";

import Picker from "@emoji-mart/react";

const ChatFooter = () => {
  const { messageCollection } = useContext(FirebaseContext);
  const { userData } = useContext(currentContext);
  const { secondUser } = useContext(SecondUserContext);
  const [msgContent, setMsgContent] = useState("");

  const [showEmojis, setShowEmojis] = useState(false);
  const handleSendMsg = (e) => {
    e.preventDefault();
    if (msgContent) {
      messageCollection.add({
        msg: msgContent,
        createdBy: userData.uid,
        sentTo: secondUser.uid,
        createdAt: new Date(),
        relation: `${userData.uid}/${secondUser.uid}`,
      });
      setMsgContent("");

      const lastMessage = document.querySelector(".chat-area-main").lastChild;
      lastMessage.scrollIntoView(false);
    }
  };
  let addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setMsgContent(msgContent + emoji);
  };
  return (
    <div className="chat-area-footer chat-input">
      <form
        className=" d-flex p-2 gap-4 bg-pri justify-content-center "
        onSubmit={handleSendMsg}
      >
        <div className="w-50 position-relative input-continer d-flex align-items-center py-2 bg-light border border-light ">
          {showEmojis && (
            <div className="emoji">
              <Picker onEmojiSelect={addEmoji} />
            </div>
          )}
          <button
            className="emoji-btn "
            onClick={() => setShowEmojis(!showEmojis)}
          >
            <MdOutlineEmojiEmotions
              style={showEmojis && { color: "#a48e41" }}
            />
          </button>
          <input
            className=" outline-none text-white flex-grow-1 bg-transparent"
            type="text"
            value={msgContent}
            onChange={(e) => setMsgContent(e.target.value)}
            placeholder="Type something here..."
          />
          <button
            className="btn bg-primary d-flex justify-content-center align-items-center p-2 msg-send"
            type="submit"
          >
            <IoSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatFooter;
