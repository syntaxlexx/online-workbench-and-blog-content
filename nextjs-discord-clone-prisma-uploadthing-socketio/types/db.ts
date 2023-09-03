import { Channel, Member, Message, Profile, Server } from "@prisma/client";

export type ExtendedMember = Member & { profile: Profile }

export type ExtendedServer = Server & {
    members: ExtendedMember[],
    channels: Channel[]
}

export type ExtendedMessage = Message & {
    member: Member & {
        profile: Profile
    },
}