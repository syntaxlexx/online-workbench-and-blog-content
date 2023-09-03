import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { CreateChatSchema } from "@/lib/validators/chats";
import { NextApiResponseServerIo } from "@/types/common";
import { NextApiRequest } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: "Method not allowed!"
        })
    }

    try {
        const profile = await currentProfilePages(req)

        if (!profile) return res.status(401).json({
            message: "Unauthorized"
        })

        const { content, fileUrl, } = CreateChatSchema.parse(req.body)
        const { serverId, channelId } = req.query

        if (!serverId) return res.status(400).json({
            message: "Server ID missing"
        })

        if (!channelId) return res.status(400).json({
            message: "Channel ID missing"
        })

        const server = await db.server.findFirst({
            where: {
                id: String(serverId),
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            include: {
                members: true,
            }
        })

        if (!server) return res.status(404).json({
            message: "Server Not Found"
        })

        const channel = await db.channel.findFirst({
            where: {
                id: String(channelId),
                serverId: server.id
            }
        })

        if (!channel) return res.status(404).json({
            message: "Channel Not Found"
        })

        const member = server.members.find(it => it.profileId === profile.id)

        if (!member) return res.status(404).json({
            message: "Member Not Found"
        })

        const message = await db.message.create({
            data: {
                content: String(content),
                fileUrl,
                channelId: channel.id,
                memberId: member.id,
            },
            include: {
                member: {
                    include: {
                        profile: true
                    }
                }
            }
        })

        // now alert socket
        const channelKey = `chat:${channelId}:messages`

        res?.socket?.server?.io?.emit(channelKey, message)

        return res.status(200).json(message)

    } catch (error) {
        console.log("[MESSAGES_POST]", error);
        return res.status(500).json({
            message: "Internal Error"
        })
    }
}