"use client";

import { Video, VideoOff } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { FC } from "react";
import ActionTooltip from "../action-tooltip";

interface Props {}

const ChatVideoButton: FC<Props> = ({}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isVideo = searchParams?.get("isVideo");

  const Icon = isVideo ? VideoOff : Video;
  const tooltipLabel = isVideo ? "End vide call" : "Start video call";

  const onClick = () => {
    const url = queryString.stringifyUrl(
      {
        url: String(pathname),
        query: {
          video: isVideo ? undefined : true,
        },
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <ActionTooltip label={tooltipLabel} side="bottom">
      <button onClick={onClick} className="hover:opacity-75 transition mr-4">
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
      </button>
    </ActionTooltip>
  );
};

export default ChatVideoButton;
