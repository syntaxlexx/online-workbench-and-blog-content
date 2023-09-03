import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { EditChatSchema } from "@/lib/validators/chats";
import { NextApiResponseServerIo } from "@/types/common";
import { MemberRole } from "@prisma/client";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (req.method !== 'DELETE' && req.method !== 'PATCH') {
        return res.status(405).json({ error: "MEthod not allowed!" })
    }

    try {
        const profile = await currentProfilePages(req)

        const { directMessageId, conversationId } = req.query

        if (!directMessageId) return res.status(400).json({
            message: "DirectMessage ID missing"
        })

        if (!conversationId) return res.status(400).json({
            message: "Conversation ID missing"
        })

        if (!profile) return res.status(401).json({
            message: "Unauthorized"
        })

        const conversation = await db.conversation.findFirst({
            where: {
                id: String(conversationId),
                OR: [
                    {
                        memberOne: {
                            profileId: profile.id,
                        }
                    },
                    {
                        memberTwo: {
                            profileId: profile.id,
                        }
                    }
                ]
            },
            include: {
                memberOne: {
                    include: {
                        profile: true,
                    }
                },
                memberTwo: {
                    include: {
                        profile: true,
                    }
                }
            }
        })

        if (!conversation) return res.status(404).json({
            message: "Conversation Not Found"
        })

        const member = conversation.memberOne.profileId === profile.id ? conversation.memberOne : conversation.memberTwo

        if (!member) return res.status(404).json({
            message: "Member Not Found"
        })

        let message = await db.directMessage.findFirst({
            where: {
                id: String(directMessageId),
                conversationId: String(conversationId),
            },
            include: {
                member: {
                    include: {
                        profile: true,
                    }
                }
            }
        })

        if (!message || message.deleted) return res.status(404).json({
            message: "Message Not Found"
        })


        const isMessageOwner = message.memberId === member.id;
        const isAdmin = member.role === MemberRole.ADMIN
        const isModerator = member.role === MemberRole.MODERATOR
        const canModify = isMessageOwner || isAdmin || isModerator

        if (!canModify) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        if (req.method === 'DELETE') {
            message = await db.directMessage.update({
                where: {
                    id: message.id,
                },
                data: {
                    fileUrl: null,
                    content: "This message has been deleted.",
                    deleted: true,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                }
            })
        }

        if (req.method === 'PATCH') {
            if (!isMessageOwner) return res.status(401).json({
                message: "Unauthorized"
            })

            const { content } = EditChatSchema.parse(req.body)

            message = await db.directMessage.update({
                where: {
                    id: message.id,
                },
                data: {
                    content,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                }
            })
        }

        const updateKey = `chat:${conversation.id}:messages:update`

        res?.socket?.server?.io?.emit(updateKey, message)

        return res.status(200).json(message)

    } catch (error) {
        console.log("[MESSAGES_ID]", error);
        return res.status(500).json({
            message: "Internal Error"
        })
    }
}