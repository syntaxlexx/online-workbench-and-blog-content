import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Props {
    params: {
        id: string,
    }
}

/**
 * edit member info
 */
export async function PATCH(req: Request, { params: { id } }: Props) {
    try {
        const profile = await currentProfile()

        if (!profile) return new NextResponse("Unauthorized", { status: 401 })

        const { searchParams } = new URL(req.url)
        const { role } = await req.json()

        const serverId = searchParams.get('serverId')

        if (!serverId) {
            return new NextResponse("Server ID missing", { status: 400 })
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    update: {
                        where: {
                            id,
                            // now prevent the admin from changing their role
                            profileId: {
                                not: profile.id,
                            }
                        },
                        data: {
                            role,
                        }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: 'asc'
                    }
                }
            }
        })

        return NextResponse.json(server)

    } catch (error) {
        console.log("[MEMBER_ID_POST]", error);

        return new NextResponse("Internal Error", { status: 500 })
    }
}

/**
 * remove a user from a server
 */
export async function DELETE(req: Request, { params: { id } }: Props) {
    try {
        const profile = await currentProfile()

        if (!profile) return new NextResponse("Unauthorized", { status: 401 })

        const { searchParams } = new URL(req.url)
        const serverId = searchParams.get('serverId')

        if (!serverId) {
            return new NextResponse("Server ID missing", { status: 400 })
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    deleteMany: {
                        id,
                        // now prevent the admin from deleting themselves
                        profileId: {
                            not: profile.id,
                        }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: 'asc'
                    }
                }
            }
        })

        return NextResponse.json(server)

    } catch (error) {
        console.log("[MEMBER_ID_DELETE]", error);

        return new NextResponse("Internal Error", { status: 500 })
    }
}