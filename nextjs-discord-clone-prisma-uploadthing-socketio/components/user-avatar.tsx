"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";

interface Props {
  className?: string;
  src?: string;
}

const UserAvatar: FC<Props> = ({ className, src }) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src}></AvatarImage>
    </Avatar>
  );
};

export default UserAvatar;
