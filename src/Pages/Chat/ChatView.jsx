import ChatFooter from "./ChatView/ChatFooter";
import ChatContent from "./ChatView/ChatContent";
import ChatTitle from "./ChatView/ChatTitle";
import FriendList from "./FriendsList/Friendslist";
import "./Chat.scss";
import { useContext } from "react";
import { SecondUserContext } from "../../context/SecondUserContext";
// import chatchathello from "../../assets/chat/Chathello.webm"

const ChatView = () => {
  const { secondUser } = useContext(SecondUserContext);
  return (
    <>
      <div className="wrapper chat bg-body d-flex vw-100 align-items-center justify-content-center text-white">
        <div className="row container-chat vw-100 h-100 g-0">
          <div className="conversation-area col-4 col-md-4 col-lg-3">
            <FriendList />
          </div>
          <div
            id="fwe1fa"
            className="chat-area bg-body col-8 col-md-8 col-lg-9"
          >
            {secondUser ? (
              <>
                <div>
                  <ChatTitle />
                </div>
                <>
                  <ChatContent />
                </>
                <div>
                  <ChatFooter />
                </div>
              </>
            ) : (
              <div>
                <div className="welcome-msg text-white text-center mt-5 fw-bold fs-2">
                  Welcome In Our Chat{" "}
                </div>
                {/* <video  width="320" height="240" autoplay src={chatchathello} /> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatView;
