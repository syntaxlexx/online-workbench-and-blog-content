import { getServerSession } from "next-auth";
import LoginButton from "./login-button";
import { redirect } from "next/navigation";

interface Props {}

const Page = async ({}: Props) => {
  const session = await getServerSession();

  if (session?.user) return redirect("/");

  return (
    <div className="flex flex-col items-center mt-[20vh]">
      <LoginButton />
    </div>
  );
};

export default Page;
