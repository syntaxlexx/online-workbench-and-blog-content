import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Props {
  params: {
    inviteCode: string;
  };
}

const Page = async ({ params: { inviteCode } }: Props) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) return redirect(`/servers/${existingServer.id}`);

  const server = await db.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) return redirect(`/servers/${server.id}`);
  return <div>Invite Code: {inviteCode} </div>;
};

export default Page;
