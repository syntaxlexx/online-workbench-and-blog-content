"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Loader } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { combineName } from "@/lib/utils";

interface Props {}

const RecentPosts = ({}: Props) => {
  const posts = useQuery(api.posts.getRecentPosts);

  if (posts === null) {
    return null;
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Staff picks</CardTitle>
      </CardHeader>
      <CardContent>
        {!posts && <Loader className="size-4 animate-spin" />}

        <ul className="flex flex-col gap-y-2">
          {posts?.map((post) => (
            <li key={post._id}>
              <Link
                href={`/posts/${post.slug}`}
                className="block rounded-md p-2 hover:bg-muted">
                <div className="inline-flex items-center gap-2">
                  <Avatar className="size-5">
                    <AvatarImage
                      src={post.author?.imageUrl}
                      alt={combineName(post.author)}></AvatarImage>
                    <AvatarFallback>
                      {post.author?.firstName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <h2 className="text-xs font-medium">
                    {combineName(post.author)}
                  </h2>
                </div>
                <h3 className="text-sm font-semibold">{post.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href={`/`} className="text-xs font-light text-emerald-500">
          See the full list
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RecentPosts;
