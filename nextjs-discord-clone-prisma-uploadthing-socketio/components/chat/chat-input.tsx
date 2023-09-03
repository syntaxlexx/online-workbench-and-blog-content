"use client";

import { useModal } from "@/hooks/use-modal-store";
import { CreateChatRequest, CreateChatSchema } from "@/lib/validators/chats";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FC } from "react";
import { useForm } from "react-hook-form";
import EmojiPicker from "../emoji-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface Props {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

const ChatInput: FC<Props> = ({ apiUrl, name, query, type }) => {
  const { onOpen } = useModal();
  const router = useRouter();

  const form = useForm<CreateChatRequest>({
    resolver: zodResolver(CreateChatSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: CreateChatRequest) => {
    try {
      const url = queryString.stringifyUrl({
        url: apiUrl,
        query,
      });

      const resp = await axios.post(url, values);
      form.reset();
      router.refresh();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 transition rounded-full p-1 flex items-center justify-center"
                    onClick={() => onOpen("messageFile", { apiUrl, query })}
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>
                  <Input
                    disabled={isLoading}
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder={`Message ${
                      type === "conversation" ? name : "#" + name
                    }`}
                    {...field}
                  />
                  <div className="absolute top-7 right-8">
                    <EmojiPicker
                      onChange={(emoji) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChatInput;
