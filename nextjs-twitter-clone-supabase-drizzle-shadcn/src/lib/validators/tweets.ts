import { z } from "zod";

export const CreateTweetValidator = z.object({
    tweet: z.string().min(3).max(255)
})

export type CreateTweetRequest = z.infer<typeof CreateTweetValidator>

export const ReplyTweetValidator = z.object({
    reply: z.string().min(3).max(255)
})

export type ReplyTweetRequest = z.infer<typeof ReplyTweetValidator>
