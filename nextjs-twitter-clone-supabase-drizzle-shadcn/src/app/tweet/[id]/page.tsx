import { db } from "@/lib/db";
import { tweets } from "@/lib/db/schema";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface Props {
  params: {
    id: string;
  };
}

const Page = async ({ params: { id } }: Props) => {
  const tweet = db.select().from(tweets);

  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.auth.getUser();

  return <div></div>;
};

export default Page;
