import { ExtendedServer } from "@/types/db";
import { ChannelType, Profile } from "@prisma/client";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import ServerChannel from "./server-channel";
import ServerHeader from "./server-header";
import ServerSearch from "./server-search";
import ServerSection from "./server-section";
import { iconMap, roleIconMap } from "@/lib/icons";
import ServerMember from "./server-member";
import { db } from "@/lib/db";

interface Props {
  serverId: ExtendedServer | string;
  profile: Profile;
}

const ServerSidebar = async ({ serverId, profile }: Props) => {
  const server: ExtendedServer | null =
    typeof serverId === "string"
      ? await db.server.findUnique({
          where: {
            id: serverId,
          },
          include: {
            members: {
              include: {
                profile: true,
              },
            },
            channels: true,
          },
        })
      : serverId;

  if (!server) return null;

  const textChannels = server.channels.filter(
    (c) => c.type == ChannelType.TEXT
  );

  const audioChannels = server.channels.filter(
    (c) => c.type == ChannelType.AUDIO
  );

  const videoChannels = server.channels.filter(
    (c) => c.type == ChannelType.VIDEO
  );

  const members = server.members.filter((m) => m.profileId !== profile.id);
  const role = server.members.find((m) => m.profileId === profile.id)?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader server={server} role={role}></ServerHeader>

      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />

        {!!textChannels?.length && (
          <div className="mb-2 ">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              server={server}
              label="Text Channels"
            />

            {textChannels?.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                server={server}
                role={role}
              />
            ))}
          </div>
        )}

        {!!audioChannels?.length && (
          <div className="mb-2 ">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              server={server}
              label="Audio Channels"
            />

            <div className="space-y-[2px]">
              {audioChannels?.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}

        {!!videoChannels?.length && (
          <div className="mb-2 ">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              server={server}
              label="Video Channels"
            />

            <div className="space-y-[2px]">
              {videoChannels?.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                  role={role}
                />
              ))}
            </div>
          </div>
        )}

        {!!members?.length && (
          <div className="mb-2 ">
            <ServerSection
              sectionType="members"
              role={role}
              server={server}
              label="Members"
            />

            <div className="space-y-[2px]">
              {members?.map((member) => (
                <ServerMember
                  key={member.id}
                  server={server}
                  role={role}
                  member={member}
                />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
