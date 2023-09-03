import { cn } from "@/lib/utils";
import { BsSearch } from "react-icons/bs";

interface Props {
  className?: string;
}

const RightSidebar = async ({ className }: Props) => {
  return (
    <div className={cn("sticky top-2 ", className)}>
      <div className="w-full overflow-y-scroll flex flex-col items-stretch h-screen px-6 pt-2">
        <div className="">
          <div className="relative h-full w-full ">
            <input
              type="text"
              id="searchBox"
              className="peer w-full h-full rounded-full py-4 pl-12 pr-4  border-2 border-transparent focus:border-primary outline-none bg-transparent bg-neutral-900 "
              placeholder="Search Twitter"
            />
            <label
              className="absolute top-0 left-0 h-full flex items-center text-gray-500 peer-focus:text-primary"
              htmlFor="searchBox"
            >
              <BsSearch className="w-5 h-5 ml-4 " />
            </label>
          </div>
        </div>

        {/* whats ahppening */}
        <div className="flex flex-col rounded-xl bg-neutral-900 my-4 pt-4">
          <h3 className="font-bold text-2xl my-2 px-4">
            What&apos;s happening?
          </h3>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="hover:bg-white/10 py-2 px-4 cursor-pointer transition duration-200 last:rounded-b-xl"
            >
              <div className="font-bold text-lg">#trending item {i}</div>
              <div className="text-xs text-neutral-400">34.8k</div>
            </div>
          ))}
        </div>

        {/* who to follow */}
        <div className="flex flex-col rounded-xl bg-neutral-900 my-4 pt-4">
          <h3 className="font-bold text-2xl my-2 px-4">Who to Follow</h3>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="hover:bg-white/10 py-2 px-4 cursor-pointer transition duration-200 last:rounded-b-xl flex items-center space-x-4 w-full"
            >
              <div>
                <div className="w-10 h-10 bg-neutral-600 rounded-full"></div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="font-bold text-lg">Other User</div>
                <div className="text-xs text-neutral-400">@otheruser123</div>
              </div>
              <div className="">
                <button className="rounded-full px-6 py-1.5 bg-white text-neutral-950">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
