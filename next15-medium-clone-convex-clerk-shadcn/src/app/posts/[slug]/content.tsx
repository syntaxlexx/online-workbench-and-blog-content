"use client";

import { api } from "@/../convex/_generated/api";
import Editor from "@/components/editor/editor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { combineName, formatDate } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { Loader, MessageSquare, ThumbsUp } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  slug: string;
}

const Content = ({ slug }: Props) => {
  const post = useQuery(api.posts.getPostBySlug, { slug });
  const likePost = useMutation(api.posts.likePost);

  if (post === null) {
    notFound();
  }

  if (!post) {
    return (
      <section className="pb-24 pt-32 sm:pt-40">
        <div className="container flex max-w-3xl items-center justify-center">
          <Loader className="size-20 animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <div className="container max-w-3xl">
        <h1 className="font-serif text-3xl font-bold">{post.title}</h1>
        <p className="mt-3 text-muted-foreground">{post.excerpt}</p>

        {/* author */}
        <div className="mt-6 inline-flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={post.author?.imageUrl}
              alt={combineName(post.author)}
            />
            <AvatarFallback>{post.author?.firstName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium">{combineName(post.author)}</h2>
            <p className="text-sm font-light text-muted-foreground">
              {formatDate(post._creationTime)}
            </p>
          </div>
        </div>

        {/* metadata */}
        <div className="mt-6 flex w-full items-center justify-between border-b border-t px-4 py-3">
          <div className="flex items-center space-x-6">
            <button
              className="flex items-center gap-2 font-light text-muted-foreground hover:text-foreground"
              onClick={async () => await likePost({ slug: post.slug })}>
              <ThumbsUp className="size-5" strokeWidth={1.5} />
              <span>{post.likes}</span>
            </button>

            <button className="flex items-center gap-2 font-light text-muted-foreground hover:text-foreground">
              <MessageSquare className="size-5" strokeWidth={1.5} />
              <span>28</span>
            </button>
          </div>
        </div>

        {/* cove rimage */}
        {post.coverImageUrl && (
          <div className="mt-6">
            <img src={post.coverImageUrl} alt={post.title} />
          </div>
        )}

        {/* content */}
        <div className="mt-10">
          <Editor
            initialValue={post.content ? JSON.parse(post.content) : undefined}
            editable={false}
          />
        </div>
      </div>
    </section>
  );
};

export default Content;
