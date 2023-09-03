import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

interface Props {
    params: {
        id: string,
    }
}

/**
 * leave server
 */
export async function PATCH(req: Request, { params: { id } }: Props) {

    try {
        const profile = await currentProfile()

        if (!profile) return new NextResponse("Unauthorized", { status: 401 })

        const server = await db.server.update({
            where: {
                id,
                // admin cannot leave themselves
                profileId: {
                    not: profile.id
                },
                // only server members can leave
                members: {
                    some: {
                        profileId: profile.id,
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id,
                    }
                }
            }
        });

        return NextResponse.json(server)

    } catch (error) {
        console.log("[SERVERS_LEAVE_PATCH]", error);

        return new NextResponse("Internal Error", { status: 500 })
    }
}