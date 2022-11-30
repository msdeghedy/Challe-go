import { useContext } from "react";
import { SecondUserContext } from "../../../context/SecondUserContext";
import { FaBackspace } from "react-icons/fa";
const ChatTitle = () => {


  const { secondUser } = useContext(SecondUserContext);
  return (
    <div className="chat-area-header w-100 ps-3 d-flex align-items-center ">
      <button
        className="btn text-white fs-3 p-0  pe-5 pb-1 mobile-close-chat"
        onClick={() => {
          document
            .querySelector("#fwe1fa")
            .classList.remove("chat-area-active");
        }}
      >
        <FaBackspace />
      </button>
      <div className="chat-area-title">{secondUser?.name}</div>
    </div>
  );
};

export default ChatTitle;
