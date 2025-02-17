import { SignUp } from "@clerk/nextjs";

interface Props {}

const Page = ({}: Props) => {
  return (
    <div className="container pt-24">
      <SignUp />
    </div>
  );
};

export default Page;
