import { getTweets } from "@/lib/supabase/queries";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ComposeTweet from "../compose-tweet";
import TweetCard from "../tweet-card";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cookies } from "next/headers";

interface Props {}

const MainFeed = async ({}: Props) => {
  const supabaseClient = createServerComponentClient<Database>({ cookies });

  const { data: userData, error: userError } =
    await supabaseClient.auth.getUser();

  const res = await getTweets(userData.user?.id);

  if (res.error)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error fetching tweets!</CardTitle>
        </CardHeader>
        <CardContent className="px-6">{res?.error}</CardContent>
      </Card>
    );

  return (
    <div className="flex h-full flex-col border-l-[0.5px] border-r-[0.5px] border-gray-700 min-h-screen">
      <h1 className="font-bold text-2xl p-6 backdrop-blur bg-black/10 sticky top-0">
        Home
      </h1>

      {/* tweetbox */}
      <div className="border-t-[0.5px] border-b-[0.5px] border-gray-700 py-4 px-6">
        <ComposeTweet />
      </div>

      {/* tweets */}
      {res.data?.map((tweet) => (
        <div
          key={tweet.tweet.id}
          className="border-b-[0.5px] border-gray-700 hover:bg-white/10 px-6 py-4 transition duration-300 cursor-pointer"
        >
          <TweetCard tweet={tweet} />
        </div>
      ))}
    </div>
  );
};

export default MainFeed;
