import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { CreateServerShema } from "@/lib/validators/servers";
import { MemberRole } from "@prisma/client";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

/**
 * create server
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { imageUrl, name } = CreateServerShema.parse(body)

        const profile = await currentProfile()

        if (!profile) return new NextResponse("Unauthorized", { status: 401 })

        const server = await db.server.create({
            data: {
                name,
                imageUrl,
                profileId: profile.id,
                inviteCode: randomUUID(),
                channels: {
                    create: [
                        {
                            name: 'general',
                            profileId: profile.id,
                        }
                    ]
                },
                members: {
                    create: [
                        {
                            profileId: profile.id,
                            role: MemberRole.ADMIN,
                        }
                    ]
                }
            }
        })

        return NextResponse.json(server)

    } catch (error) {
        console.log("[SERVERS_POST]", error);

        return new NextResponse("Internal Error", { status: 500 })
    }
}