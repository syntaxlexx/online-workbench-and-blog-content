import { SignIn } from "@clerk/nextjs";

interface Props {}

const Page = ({}: Props) => {
  return (
    <div className="container pt-24">
      <div className="">
        <SignIn />
      </div>
    </div>
  );
};

export default Page;
