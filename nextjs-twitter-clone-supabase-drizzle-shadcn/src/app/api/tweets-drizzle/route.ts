import { db } from "@/lib/db";
import { tweets } from "@/lib/db/schema";
import { errorResponse, successResponse, unauthenticatedResponse, validationErrorResponse } from "@/lib/utils";
import { CreateTweetValidator } from "@/lib/validators/tweets";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { ZodError } from "zod";

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const { tweet } = CreateTweetValidator.parse(body)

        const supabase = createServerComponentClient<Database>({ cookies });

        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError) {
            return unauthenticatedResponse("Please login to continue!")
        }

        const res = await db.insert(tweets).values({
            text: tweet.trim(),
            userId: userData.user.id,
            id: randomUUID(),
        })

        console.log("res", res);

        return successResponse()

    } catch (error) {
        if (error instanceof ZodError) {
            return validationErrorResponse(error.message)
        }

        // @ts-ignore
        return errorResponse(error?.message ?? "An error occurred")
    }
}