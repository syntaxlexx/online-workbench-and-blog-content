import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { ChannelType, MemberRole } from "@prisma/client";

export const iconMap = {
  [ChannelType.TEXT]: <Hash className="w-4 h-4" />,
  [ChannelType.AUDIO]: <Mic className="w-4 h-4" />,
  [ChannelType.VIDEO]: <Video className="w-4 h-4" />,
};

export const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="w-4 h-4 text-indigo-500" />,
  [MemberRole.ADMIN]: <ShieldAlert className="w-4 h-4 text-rose-500" />,
};
