const ChatMessage = ({ owner, msgData, photoUrl, date }) => {
  return (
    <div
      className={`chat-msg chat-message d-flex gap-2 align-items-center p-2 ps-3 ${
        owner && "owner"
      }`}
    >
      <div className="chat-msg-profile">
        <img className="chat-msg-img rounded-circle" src={photoUrl} alt="" />
      </div>
      <div className="chat-msg-content">
        <div className="chat-msg-text bg-tranparent  message p-1 px-2 mt-3">
          {msgData}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
