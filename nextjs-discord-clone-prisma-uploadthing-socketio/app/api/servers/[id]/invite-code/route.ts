import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

interface Props {
    params: {
        id: string,
    }
}

export async function PATCH(req: Request, { params: { id } }: Props) {

    try {
        const profile = await currentProfile()

        if (!profile) return new NextResponse("Unauthorized", { status: 401 })

        // if they are the creator, it will be updated
        const server = await db.server.update({
            where: {
                id,
                profileId: profile.id,
            },
            data: {
                inviteCode: randomUUID()
            }
        });

        return NextResponse.json(server)

    } catch (error) {
        console.log("[SERVERS_POST]", error);

        return new NextResponse("Internal Error", { status: 500 })
    }
}