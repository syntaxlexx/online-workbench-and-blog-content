"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Loader } from "lucide-react";
import PostItem from "./post-item";

interface Props {}

const Posts = ({}: Props) => {
  const posts = useQuery(api.posts.getPosts);

  if (!posts) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader className="size-20 animate-spin" />
      </div>
    );
  }

  return (
    <ul>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </ul>
  );
};

export default Posts;
