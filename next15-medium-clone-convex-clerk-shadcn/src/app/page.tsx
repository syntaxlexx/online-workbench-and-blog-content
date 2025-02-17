import Posts from "@/components/posts";
import RecentPosts from "@/components/recent-posts";
import RecommendedTopics from "@/components/recommended-topics";
import WhoToFollow from "@/components/who-to-follow";

export default function Home() {
  return (
    <section className="mt-[65px]">
      <div className="container">
        <div className="flex flex-col gap-x-16 gap-y-6 xl:flex-row xl:items-start">
          <main className="flex-1 pt-20 xl:py-20">
            <Posts />
          </main>

          <aside className=" flex w-full md:w-64 lg:w-72 flex-col justify-between gap-6 xl:sticky xl:top-[65px]">
            <RecentPosts />
            <RecommendedTopics />
            <WhoToFollow />
          </aside>
        </div>
      </div>
    </section>
  );
}
