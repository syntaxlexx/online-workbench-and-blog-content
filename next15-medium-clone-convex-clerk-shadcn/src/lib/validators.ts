import { z } from "zod";
import { JSONContent } from "novel";

export const NewPostSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long" }),
  excerpt: z
    .string()
    .min(10, { message: "Excerpt must be at least 10 characters long" }),
  coverImageId: z.string().optional(),
  content: z.custom<JSONContent>(),
});

export type NewPostRequest = z.infer<typeof NewPostSchema>;
