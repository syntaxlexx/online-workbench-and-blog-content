"use client";

import { Post } from "@/lib/types";
import { combineName, formatDate } from "@/lib/utils";
import { Sparkle, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  return (
    <li className="mb-4 pb-7 sm:border-b dark:hover:border-gray-700">
      <Link href={`/posts/${post.slug}`} className="block">
        {/* author */}
        <div className="inline-flex items-center gap-3">
          <Avatar className="size-6">
            <AvatarImage
              src={post.author?.imageUrl}
              alt={combineName(post.author)}
            />
            <AvatarFallback>{post.author?.firstName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-sm">{combineName(post.author)}</h2>
          </div>
        </div>

        <div className="mt-2 flex flex-col-reverse gap-x-10 sm:mt-4 sm:flex-row">
          {/* post details */}
          <div className="mt-4 w-full sm:mt-0 sm:w-3/4">
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.excerpt}</p>
            </div>

            <div className="mt-7 flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <Sparkle className="size-4 fill-yellow-500 text-yellow-500" />
                <span>{formatDate(post._creationTime)}</span>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <ThumbsUp className="size-4" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </div>
          </div>

          {/* cover image */}
          <div className="relative aspect-video w-full sm:w-1/4">
            {post.coverImageUrl && (
              <Image
                src={post.coverImageUrl}
                alt="Cover Image"
                fill
                className="h-full w-full rounded-md object-cover"
              />
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
