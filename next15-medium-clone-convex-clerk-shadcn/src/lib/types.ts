import { Id } from "../../convex/_generated/dataModel";

export type Post = {
  _id: Id<"posts">;
  _creationTime: number;
  coverImageId?: string;
  coverImageUrl?: string | null;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorId: Id<"users">;
  likes: number;
  author: {
    _id: Id<"users">;
    _creationTime: number;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    posts?: Id<"posts">[];
    email: string;
    clearkUserId?: string;
  } | null;
};
