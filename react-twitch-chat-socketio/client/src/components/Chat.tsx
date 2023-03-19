import React from "react";
import SendChatMessageForm from "./SendChatMessageForm";
import useChatMessages from "../hooks/useChatMessage";
import { MessageModel } from "../utils/models";
import ChatMessage from "./ChatMessage";
import useChatLiveModeScrolling from "../hooks/useChatLiveModeScrolling";
import ChatPausedAlert from "./ChatPausedAlert";

const Chat = () => {
  const { messages, send } = useChatMessages();
  const { chatMessagesBoxRef, isLiveModeEnabled, scrollNewMessages } = useChatLiveModeScrolling<HTMLDivElement>(messages);

  return (
    <div className="w-full max-w-[550px] px-4 py-3 rounded-lg bg-slate-900 opacity-80">
      <ChatMessagesBox ref={chatMessagesBoxRef} messages={messages} />
      {!isLiveModeEnabled && (
        <ChatPausedAlert
          onClick={scrollNewMessages}
          className="absolute inset-x-0 bottom-[22vh] mx-auto" />
      )}
      <SendChatMessageForm onSend={send} className="mt-4" />
    </div>
  );
};

const ChatMessagesBox = React.forwardRef<HTMLDivElement, { messages: MessageModel[] }>(({ messages }, ref) => {
  const MessageList = messages.map((message) => (
    <ChatMessage message={message} key={message.id} className="mb-1" />
  ));

  return <div ref={ref} className="h-[70vh] overflow-auto">{MessageList}</div>;
});

export default Chat;