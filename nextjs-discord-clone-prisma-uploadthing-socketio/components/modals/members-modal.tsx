"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { ExtendedServer } from "@/types/db";
import { MemberRole } from "@prisma/client";
import axios from "axios";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../user-avatar";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

interface Props {}

const MembersModal: FC<Props> = ({}) => {
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const [loadingId, setLoadingId] = useState<string>("");
  const router = useRouter();

  const isModalOpen = isOpen && type === "members";
  const { server } = data as { server: ExtendedServer };

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const resp = await axios.patch(url, { role });
      router.refresh();
      onOpen("members", { server: resp.data });
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingId("");
    }
  };

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const resp = await axios.delete(url);
      router.refresh();
      onOpen("members", { server: resp.data });
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Manage Members
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              {server?.members?.length} Members
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="mt-8 max-h-[420px] pr-6">
            {server?.members?.map((member) => (
              <div key={member.id} className="flex items-center gap-x-2 mb-6">
                <UserAvatar src={member.profile.imageUrl} />
                <div className="flex flex-col gap-y-1">
                  <div className="text-xs font-semibold flex items-center gap-x-1">
                    {member.profile.name}
                    {roleIconMap[member.role]}
                  </div>
                  <p className="text-xs text-zinc-500">
                    {member.profile.email}
                  </p>
                </div>
                {server.profileId !== member.profileId &&
                  loadingId !== member.id && (
                    <div className="ml-auto">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical className="h-4 w-4 text-zinc-500"></MoreVertical>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="left">
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="flex items-center">
                              <ShieldQuestion className="w-4 h-4 mr-2"></ShieldQuestion>
                              <span>Role</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem
                                  onClick={() =>
                                    onRoleChange(member.id, "GUEST")
                                  }
                                >
                                  <Shield className="w-4 h-4 mr-2"></Shield>
                                  Guest
                                  {member.role === MemberRole.GUEST && (
                                    <Check className="w-4 h-4 ml-auto" />
                                  )}
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() =>
                                    onRoleChange(member.id, "MODERATOR")
                                  }
                                >
                                  <ShieldCheck className="w-4 h-4 mr-2"></ShieldCheck>
                                  Moderator
                                  {member.role === MemberRole.MODERATOR && (
                                    <Check className="w-4 h-4 ml-auto" />
                                  )}
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator></DropdownMenuSeparator>
                          <DropdownMenuItem onClick={() => onKick(member.id)}>
                            <Gavel className="w-4 h-4 mr-2"></Gavel>
                            Kick
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                {loadingId === member.id && (
                  <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4"></Loader2>
                )}
              </div>
            ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MembersModal;
