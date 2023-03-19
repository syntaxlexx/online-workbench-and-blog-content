import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { CreateApiData } from "@/types/api";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";
import z, { ZodError } from "zod";
import { withMethods } from "@/lib/api-middlewares/with-methods";

const handler = async (req: NextApiRequest, res: NextApiResponse<CreateApiData>) => {
    try {
        const user = await getServerSession(req, res, authOptions).then(r => r?.user)

        if (!user) {
            return res.status(401).json({
                error: 'unauthorized to perform this action.',
                createdApiKey: null
            })
        }

        const existingApiKey = await db.apiKey.findFirst({
            where: {
                userId: user.id,
                enabled: true,
            }
        })

        if (existingApiKey) {
            return res.status(400).json({
                error: 'You already have a valid API key',
                createdApiKey: null
            })
        }

        const createdApiKey = await db.apiKey.create({
            data: {
                userId: user.id,
                key: nanoid()
            }
        })

        return res.status(200).json({
            error: null,
            createdApiKey: createdApiKey
        })

    } catch (err) {
        if(err instanceof ZodError) {
            return res.status(400).json({
                error: err.issues,
                createdApiKey: null
            })
        }

        return res.status(400).json({
            error: 'An error occurred',
            createdApiKey: null,
        })
    }
}

export default withMethods(['GET'], handler);
