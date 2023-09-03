import { MainFeed } from "@/components";
import AuthModal from "@/components/auth-modal";
import type { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface Props {}

const Page = async ({}: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.auth.getUser();

  return (
    <div>
      {error?.status == 401 && <AuthModal />}

      {/* timeline */}
      <MainFeed />
    </div>
  );
};

export default Page;
