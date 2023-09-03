"use client";

import { FC } from "react";
import { toast } from "./ui/use-toast";

interface Props {}

const TweetButton: FC<Props> = ({}) => {
  return (
    <div>
      <button
        className="w-[90%] rounded-full text-2xl text-center bg-twitter p-4 m-4 hover:bg-opacity-70"
        onClick={() => {
          console.log("toasting");
          toast({
            title: "Coming Soon",
          });
        }}
      >
        TWEET
      </button>
    </div>
  );
};

export default TweetButton;
