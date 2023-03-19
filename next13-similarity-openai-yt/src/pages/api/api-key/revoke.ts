import { NextApiRequest, NextApiResponse } from "next";
import { withMethods } from "@/lib/api-middlewares/with-methods";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { RevokeApiData } from "@/types/api";
import { db } from "@/lib/db";
import z from "zod";

const handler = async(req: NextApiRequest, res: NextApiResponse<RevokeApiData>) => {
    try {
        const user = await getServerSession(req, res, authOptions).then(r => r?.user)

        if(! user) {
            return res.status(401).json({
                error: 'Unauthorized',
                success: false,
            })
        }

        const validApiKey = await db.apiKey.findFirst({
            where: {
                userId: user.id,
                enabled: true,
            }
        })

        if(! validApiKey) {
            return res.status(500).json({
                error: 'This api key could not be revokes',
                success: false,
            })
        }

        // invalidate api key
        await db.apiKey.update({
            where: {
                id: validApiKey.id,
            },
            data: {
                enabled: false,
            }
        })

        return res.status(200).json({
            error: null,
            success: true,
        })
    } catch (err) {
        if(err instanceof z.ZodError) {
            return res.status(400).json({
                error: err.issues,
                success: false
            })
        }

        return res.status(500).json({
            error: 'An error occurred',
            success: false,
        })

    }
}

export default withMethods(['POST'], handler)