"use client";

import { cn } from "@/lib/utils";
import { Server } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FC } from "react";
import ActionTooltip from "../action-tooltip";

interface Props {
  server: Server;
}

const NavigationItem: FC<Props> = ({ server }) => {
  const params = useParams();

  return (
    <ActionTooltip label={server.name} side="right" align="center">
      <Link
        href={`/servers/${server.id}`}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            {
              "h-[8px] group-hover:h-[20px]": params?.serverId !== server.id,
              "h-[20px]": params?.serverId === server.id,
            }
          )}
        ></div>
        <div
          className={cn(
            "relative group-flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            {
              "bg-primary/10 text-primary rounded-[16px]":
                params?.serverId === server.id,
            }
          )}
        >
          <Image fill src={server.imageUrl} alt="channel" />
        </div>
      </Link>
    </ActionTooltip>
  );
};

export default NavigationItem;
