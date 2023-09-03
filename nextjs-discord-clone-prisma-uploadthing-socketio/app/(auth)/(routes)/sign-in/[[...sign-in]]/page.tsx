import { SignIn } from "@clerk/nextjs";

interface Props {}

const Page = async ({}: Props) => {
  return (
    <div>
      <SignIn />
    </div>
  );
};

export default Page;
