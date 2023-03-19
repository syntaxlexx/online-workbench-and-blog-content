import { useState } from "react";
import EmojiPickerButton from "./EmojiPickerButton";

type SendMessageFormProps = {
  onSend: (message: string) => void,
  className?: string
}

const MAX_MESSAGE_LENGTH = 255;

const SendChatMessageForm = ({
  onSend,
  className
}: SendMessageFormProps) => {
  const [ message, setMessage ] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredMessage = message.trim().slice(0, MAX_MESSAGE_LENGTH);

    if (filteredMessage) {
      onSend(filteredMessage);
    }

    setMessage("");
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="relative">
        <input
          placeholder="Send a chat message"
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="w-full p-2 rounded bg-slate-700 focus:outline-none focus:ring-purple-500 focus:ring-2"
        />
        <div className="absolute top-0 inset-y-0 right-2 inline-flex items-center bg-slate-700">
          <EmojiPickerButton
            onEmojiPick={(emoji) => setMessage((msg) => msg.concat(emoji))}
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-purple-600 p-2 float-right mt-2 rounded-md">
        Chat
      </button>
    </form>
  );
};

export default SendChatMessageForm;
