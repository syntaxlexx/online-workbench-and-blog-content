"use client";

import { roleIconMap } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { ExtendedMember } from "@/types/db";
import { MemberRole, Server } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import UserAvatar from "../user-avatar";

interface Props {
  member: ExtendedMember;
  server: Server;
  role?: MemberRole;
}

const ServerMember: FC<Props> = ({ member, server, role }) => {
  const router = useRouter();
  const params = useParams();

  const onClick = () => {
    router.push(`/servers/${server.id}/conversations/${member.id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        {
          "bg-zinc-700/20 dark:bg-zinc-700": params?.memberId === member.id,
        }
      )}
    >
      <UserAvatar
        src={member.profile.imageUrl}
        className="h-8 w-8 md:h-8 md:w-8"
      />
      <p
        className={cn(
          "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          {
            "text-primary dark:text-zinc-200 dark:group-hover:text-white":
              params?.memberId === member.id,
          }
        )}
      >
        {member.profile.name}
      </p>
      <span className="mr-2">{roleIconMap[member.role]}</span>
    </button>
  );
};

export default ServerMember;
