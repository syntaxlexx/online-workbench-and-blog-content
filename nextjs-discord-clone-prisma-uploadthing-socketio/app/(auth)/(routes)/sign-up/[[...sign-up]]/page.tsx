import { SignUp } from "@clerk/nextjs";

interface Props {}

const Page = async ({}: Props) => {
  return (
    <div>
      <SignUp />
    </div>
  );
};

export default Page;
