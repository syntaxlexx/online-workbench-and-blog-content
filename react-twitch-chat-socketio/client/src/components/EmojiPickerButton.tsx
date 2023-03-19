import { HiOutlineEmojiHappy } from "react-icons/all";
import EmojiPicker from "emoji-picker-react";
import useEmojiPicker from "../hooks/useEmojiPicker";


const EmojiPickerButton = ({
  onEmojiPick: handleEmojiPick
}: { onEmojiPick: (emoji: string) => void }) => {
  const { pickerRef, toggleEmojiPick, isOpen, handleEmojiClick} = useEmojiPicker(handleEmojiPick)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleEmojiPick}
        className="p-1 rounded hover:bg-gray-400/50">
        <HiOutlineEmojiHappy className="w-5 h-5 my-auto" />
      </button>

      {isOpen && (
        <div ref={pickerRef} className="absolute bottom-8 right-0">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            skinTonesDisabled={true}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerButton;
