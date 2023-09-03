import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { CreateChannelShema } from "@/lib/validators/channels"
import { MemberRole } from "@prisma/client"
import { NextResponse } from "next/server"

interface Props {
    params: {
        id: string,
    }
}

/**
 * update channel
 */
export async function PATCH(req: Request, { params: { id } }: Props) {
    try {
        const profile = await currentProfile()

        if (!profile) return new NextResponse("Unauthorized", { status: 401 })

        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get('serverId');

        if (!serverId) return new Response('ServerId Missing', { status: 400 })

        const body = await req.json()
        const { name, type } = CreateChannelShema.parse(body)

        if (name.toLowerCase() == 'general') {
            return new Response('Name caanot be "general"', { status: 400 })
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    update: {
                        where: {
                            id,
                            NOT: {
                                name: 'general'
                            }
                        },
                        data: {
                            name,
                            type,
                        }
                    }
                }
            }
        })

        return NextResponse.json(server)

    } catch (error) {
        console.log("[CHANNEL_ID_PATCH]", error);

        return new NextResponse("Internal Error", { status: 500 })
    }
}

/**
 * delete channel
 */
export async function DELETE(req: Request, { params: { id } }: Props) {
    try {
        const profile = await currentProfile()

        if (!profile) return new NextResponse("Unauthorized", { status: 401 })

        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get('serverId');

        if (!serverId) return new Response('ServerId Missing', { status: 400 })

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id,
                        name: {
                            not: 'general'
                        }
                    }
                }
            }
        })

        return NextResponse.json(server)

    } catch (error) {
        console.log("[CHANNEL_ID_DELETE]", error);

        return new NextResponse("Internal Error", { status: 500 })
    }
}
