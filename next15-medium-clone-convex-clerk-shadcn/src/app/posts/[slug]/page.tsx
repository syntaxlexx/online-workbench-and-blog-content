import Content from "./content";

interface Props {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;

  return <Content slug={slug} />;
};

export default Page;
