import { z } from "zod";

export const CreateChatSchema = z.object({
    content: z.string(),
    fileUrl: z.string().optional()
})

export type CreateChatRequest = z.infer<typeof CreateChatSchema>

export const EditChatSchema = z.object({
    content: z.string(),

})

export type EditChatRequest = z.infer<typeof EditChatSchema>

