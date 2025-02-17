import NewPostForm from "@/components/new-post-form";

interface Props {}

const Page = ({}: Props) => {
  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <div className="container">
        <h1 className="text-2xl font-semibold">New Post</h1>

        <NewPostForm />
      </div>
    </section>
  );
};

export default Page;
