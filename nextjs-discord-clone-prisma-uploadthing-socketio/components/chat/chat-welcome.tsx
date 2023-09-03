"use client";

import { Hash } from "lucide-react";
import { FC } from "react";

interface Props {
  type: "channel" | "conversation";
  name: string;
}

const ChatWelcome: FC<Props> = ({ name, type }) => {
  return (
    <div className="space-y-2 px-4 mb-4">
      {type === "channel" && (
        <div className="h-[75px] w-[75px] rounded-full flex items-center justify-center bg-zinc-500 dark:bg-zinc-700">
          <Hash className="h-12 w-12 text-white" />
        </div>
      )}

      <p className="text-xl md:text-3xl font-bold">
        {type === "channel" ? "Welcome to #" : ""}
        {name}
      </p>

      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        {type === "channel"
          ? `This is the start of the #${name} channel.`
          : `This is the start of the conversation with ${name}.`}
      </p>
    </div>
  );
};

export default ChatWelcome;
