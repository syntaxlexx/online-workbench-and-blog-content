"use client";

import {
  CreateTweetRequest,
  CreateTweetValidator,
} from "@/lib/validators/tweets";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FC, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { toast } from "./ui/use-toast";

interface Props {}

const ComposeTweet: FC<Props> = ({}) => {
  const router = useRouter();

  const form = useForm<CreateTweetRequest>({
    // @ts-ignore
    resolver: zodResolver(CreateTweetValidator),
  });

  const { mutate: submit, isLoading } = useMutation({
    mutationFn: async ({ tweet }: CreateTweetRequest) => {
      const payload: CreateTweetRequest = {
        tweet,
      };

      // Change this between api/tweets and api/tweets-drizzle
      const { data } = await axios.post(`/api/tweets-drizzle`, payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status == 401) {
          return toast({
            title: "Login to Post Tweet",
            description: err.response?.data?.message ?? "An error occurred",
            variant: "destructive",
          });
        }

        return toast({
          title: "There was a problem",
          description: err.response?.data?.message ?? "An error occurred",
          variant: "destructive",
        });
      }

      return toast({
        title: "There was a problem",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: "Tweet Posted",
      });
      form.reset();
      form.setValue("tweet", "");
      router.refresh();
    },
  });

  return (
    <div className="flex items-stretch  space-x-2 relative">
      <div className="w-10 h-10 bg-slate-400 rounded-full flex-none"></div>

      <Form {...form}>
        <form
          className="flex flex-col w-full h-full"
          onSubmit={form.handleSubmit((e) => submit(e))}
        >
          <FormField
            control={form.control}
            name="tweet"
            render={({ field }) => (
              <FormItem className="md:grid md:grid-cols-6 md:space-y-0 md:gap-4 w-full">
                <div className="md:col-span-5">
                  <FormControl>
                    <input
                      type="text"
                      placeholder="Write your tweet"
                      {...field}
                      className="w-full h-full bg-transparent border-b-[0.5px] border-gray-700 outline-none border-none text-2xl placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="w-full justify-between items-center flex">
            <div></div>
            <div className="w-full max-w-[100px]">
              <Button
                type="submit"
                className="w-full rounded-full text-lg text-center bg-twitter px-4 py-2 hover:bg-opacity-70"
                isLoading={isLoading}
              >
                Tweet
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ComposeTweet;
