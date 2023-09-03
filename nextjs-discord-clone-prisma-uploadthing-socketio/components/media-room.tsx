"use client";

import { FC, useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

interface Props {
  chatId: string;
  video: boolean;
  audio: boolean;
}

const MediaRoom: FC<Props> = ({ audio, chatId, video }) => {
  const { user } = useUser();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (!user?.firstName) return;

    const name = `${user.firstName} ${user.lastName}`;

    (async () => {
      try {
        const resp = await fetch(
          `/api/get-participant-token?room=${chatId}&username=${name}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [user?.firstName, user?.lastName, chatId]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
      style={{ height: "100dvh" }}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};

export default MediaRoom;
