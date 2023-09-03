"use client";

import { likeTweet, replyToTweet, unlikeTweet } from "@/actions/tweet-actions";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn, fromNow } from "@/lib/utils";
import {
  ReplyTweetRequest,
  ReplyTweetValidator,
} from "@/lib/validators/tweets";
import { ExtendedTweet } from "@/types/db";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { FC, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { IoMdShare, IoMdStats } from "react-icons/io";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  tweet: ExtendedTweet;
}

const TweetCard: FC<Props> = ({ tweet }) => {
  const [user, setUser] = useState<User | null>(null);
  const [supabase] = useState(() => createClientComponentClient());
  const router = useRouter();

  useEffect(() => {
    const initialiseUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        // not logged in
      } else {
        setUser(data?.user);
      }
    };

    initialiseUser();
  }, [supabase]);

  const viewTweet = () => router.push(`/tweet/${tweet.tweet.id}`);

  return (
    <>
      <div className="flex space-x-4 ">
        <div>
          <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
        </div>
        <div className="flex-1 flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className="font-bold">{tweet.profile.fullName}</div>
              <div className="text-gray-500">@{tweet.profile.username}</div>
              <div className="text-gray-500">
                <BsDot />
              </div>
              <div className="text-gray-500">
                {fromNow(tweet.tweet.createdAt)}
              </div>
            </div>
            <div>
              <BsThreeDots />
            </div>
          </div>
          <div className="text-white text-base" onClick={viewTweet}>
            {tweet.tweet.text}
          </div>
          <div
            className="bg-slate-400 aspect-square w-full h-96 rounded-xl"
            onClick={viewTweet}
          ></div>
          <div className="flex items-center justify-around">
            <RetweetButton tweet={tweet} user={user} />

            <div className="rounded-full hover:bg-white/20 transition duration-200 cursor-pointer p-3">
              <AiOutlineRetweet />
            </div>
            <LikeButton
              className="rounded-full hover:bg-white/20 transition duration-200 cursor-pointer p-3"
              user={user}
              tweetId={tweet.tweet.id}
              likesCount={tweet.likes.length}
              hasLikedTweet={Boolean(tweet.hasLiked)}
            />
            <div className="rounded-full hover:bg-white/20 transition duration-200 cursor-pointer p-3">
              <IoMdStats />
            </div>
            <div className="rounded-full hover:bg-white/20 transition duration-200 cursor-pointer p-3">
              <IoMdShare />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const LikeButton = ({
  tweetId,
  className,
  user,
  likesCount,
  hasLikedTweet,
}: {
  tweetId: string;
  className: string;
  user: User | null;
  likesCount: number;
  hasLikedTweet: boolean;
}) => {
  const [isLikePending, startTransition] = useTransition();

  return (
    <button
      className={cn("flex items-center gap-2", className, {
        "text-rose-500 ": hasLikedTweet,
      })}
      onClick={() => {
        if (!user) {
          return toast({
            title: "Login to like tweets",
          });
        }

        if (hasLikedTweet) {
          startTransition(() => unlikeTweet({ id: tweetId, userId: user.id }));
        } else {
          startTransition(() => likeTweet({ id: tweetId, userId: user.id }));
        }
      }}
    >
      {hasLikedTweet ? (
        <AiFillHeart className="w-5 h-5" />
      ) : (
        <AiOutlineHeart className="w-5 h-5" />
      )}
      <span>{likesCount}</span>
    </button>
  );
};

const RetweetButton = ({
  tweet,
  user,
}: {
  tweet: ExtendedTweet;
  user: User | null;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isReplyPending, startTransition] = useTransition();

  const form = useForm<ReplyTweetRequest>({
    resolver: zodResolver(ReplyTweetValidator),
    defaultValues: {
      reply: "",
    },
  });

  const submit = ({ reply }: { reply: string }) => {
    if (!user) {
      return toast({
        title: "Login to reply to tweet",
      });
    }

    startTransition(() =>
      replyToTweet({ id: tweet.tweet.id, userId: user.id, reply })
        .then(() => setOpen(false))
        .catch((err) => {
          toast({
            title: "Error",
            description: "Could not reply to tweet",
            variant: "destructive",
          });
        })
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="rounded-full hover:bg-white/20 transition duration-200 cursor-pointer p-3">
          <BsChat />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <div className="flex space-x-4">
          <div>
            <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
          </div>
          <div className="flex-1 flex flex-col space-y-2 ">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <div className="font-bold">{tweet.profile.fullName}</div>
                <div className="text-gray-500">@{tweet.profile.username}</div>
                <div className="text-gray-500">
                  <BsDot />
                </div>
                <div className="text-gray-500">
                  {fromNow(tweet.tweet.createdAt)}
                </div>
              </div>
            </div>
            <div className="text-white text-base">{tweet.tweet.text}</div>
            <div className="mt-4 text-sm text-gray-300">
              Replying to{" "}
              <span className="text-blue-400">@{tweet.profile.username}</span>
            </div>
            <div className="mt-4 pt-4">
              <Form {...form}>
                <form
                  className="flex flex-col w-full h-full"
                  onSubmit={form.handleSubmit((e) => submit(e))}
                >
                  <FormField
                    control={form.control}
                    name="reply"
                    render={({ field }) => (
                      <FormItem className="md:grid md:grid-cols-6 md:space-y-0 md:gap-4 w-full">
                        <div className="md:col-span-5">
                          <FormControl>
                            <textarea
                              rows={4}
                              placeholder="Write your reply"
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
                        isLoading={isReplyPending}
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TweetCard;
