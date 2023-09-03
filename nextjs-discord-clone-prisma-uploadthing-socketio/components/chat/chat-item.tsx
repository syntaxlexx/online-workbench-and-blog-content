"use client";

import { roleIconMap } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile } from "@prisma/client";
import { Edit, FileIcon, Trash } from "lucide-react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import ActionTooltip from "../action-tooltip";
import UserAvatar from "../user-avatar";
import { EditChatRequest, EditChatSchema } from "@/lib/validators/chats";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import queryString from "query-string";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { useParams, useRouter } from "next/navigation";

interface Props {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const ChatItem: FC<Props> = ({
  content,
  currentMember,
  deleted,
  fileUrl,
  id,
  isUpdated,
  member,
  socketQuery,
  socketUrl,
  timestamp,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { onOpen } = useModal();
  const router = useRouter();
  const params = useParams();

  const fileType = fileUrl?.split(".").pop();

  const isAdmin = currentMember.role == MemberRole.ADMIN;
  const isModerator = currentMember.role == MemberRole.MODERATOR;
  const isOwner = currentMember.id == member.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isPdf = fileType === "pdf" && fileUrl;
  const isImage = !isPdf && fileUrl;

  const form = useForm<EditChatRequest>({
    resolver: zodResolver(EditChatSchema),
    defaultValues: {
      content: content,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onMemberClick = () => {
    if (member.id === currentMember.id) return;

    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  useEffect(() => {
    form.reset({
      content: content,
    });
  }, [content]);

  // handle escape key
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event?.key === "Escape" || event?.keyCode === 27) {
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const onSubmit = async (values: EditChatRequest) => {
    try {
      const url = queryString.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });

      await axios.patch(url, values);

      setIsEditing(false);
      form.reset();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div
          className="cursor-pointer hover:drop-shadow-md transition"
          onClick={onMemberClick}
        >
          <UserAvatar src={member.profile.imageUrl} />
        </div>

        <div className="flex flex-col w-full ">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p
                className="font-semibold text-sm hover:underline cursor-pointer"
                onClick={onMemberClick}
              >
                {member.profile.name}
              </p>
              <ActionTooltip label={member.role}>
                <span className="ml-2">{roleIconMap[member.role]}</span>
              </ActionTooltip>
            </div>

            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
          </div>

          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
            >
              <Image
                src={fileUrl}
                alt={content}
                fill
                className="object-cover"
              />
            </a>
          )}

          {isPdf && (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="nooopener noreferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                PDF File
              </a>
            </div>
          )}

          {!fileUrl && !isEditing && (
            <p
              className={cn("text-sm text-zinc-600 dark:text-zinc-300", {
                "italic text-zinc-500 dark:text-zinc-400 text-xs pt-1": deleted,
              })}
            >
              {content}

              {isUpdated && !deleted && (
                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </p>
          )}

          {!fileUrl && isEditing && (
            <Form {...form}>
              <form
                className="flex items-center w-full gap-x-2 pt-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            disabled={isLoading}
                            className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 w-full border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                            placeholder="Edit message"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button disabled={isLoading} size="sm" variant="primary">
                  Save
                </Button>
              </form>
              <span className="text-[10px] mt-1 text-zinc-400">
                Press escape to cancel, enter to save
              </span>
            </Form>
          )}
        </div>
      </div>

      {canDeleteMessage && (
        <div className="hidden group-hover:flex items-center gap-x-2 absolute -top-2 p-1 bg-white dark:bg-zinc-800 border rounded-sm right-5">
          {canEditMessage && (
            <ActionTooltip label="Edit">
              <Edit
                className="w-4 h-4 cursor-pointer ml-auto text-zinc-500  hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                onClick={() => setIsEditing(true)}
              />
            </ActionTooltip>
          )}

          <ActionTooltip label="Delete">
            <Trash
              className="w-4 h-4 cursor-pointer ml-auto text-zinc-500  hover:text-zinc-600 dark:hover:text-zinc-300 transition"
              onClick={() =>
                onOpen("deleteMessage", {
                  apiUrl: `${socketUrl}/${id}`,
                  query: socketQuery,
                })
              }
            />
          </ActionTooltip>
        </div>
      )}
    </div>
  );
};

export default ChatItem;
