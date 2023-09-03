import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { CreateServerShema } from "@/lib/validators/servers";
import { NextResponse } from "next/server";

/**
 * upddate server
 */
interface Props {
    params: {
        id: string,
    }
}

export async function PATCH(req: Request, { params: { id } }: Props) {
    try {
        const body = await req.json();
        const { imageUrl, name } = CreateServerShema.parse(body)

        const profile = await currentProfile()

        if (!profile) return new NextResponse("Unauthorized", { status: 401 })

        const server = await db.server.update({
            where: {
                id,
                profileId: profile.id,
            },
            data: {
                name,
                imageUrl,
            }
        })

        return NextResponse.json(server)

    } catch (error) {
        console.log("[SERVER_ID_PATCH]", error);

        return new NextResponse("Internal Error", { status: 500 })
    }
}

/**
 * delete server
 */
export async function DELETE(req: Request, { params: { id } }: Props) {
    try {
        const profile = await currentProfile()

        if (!profile) return new NextResponse("Unauthorized", { status: 401 })

        await db.server.delete({
            where: {
                id,
                profileId: profile.id,
            },
        })

        return NextResponse.json({
            message: 'Deleted'
        })

    } catch (error) {
        console.log("[SERVER_ID_DELETE]", error);

        return new NextResponse("Internal Error", { status: 500 })
    }
}
