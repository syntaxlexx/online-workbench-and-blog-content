import Link from "next/link";
import { BiHomeCircle, BiUser } from "react-icons/bi";
import {
  BsBell,
  BsBookmark,
  BsEnvelope,
  BsThreeDots,
  BsTwitter,
} from "react-icons/bs";
import { HiOutlineHashtag } from "react-icons/hi";
import TweetButton from "../tweet-button";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Twitter",
    href: "/",
    icon: BsTwitter,
    hidden: true,
  },
  {
    title: "Home",
    href: "/",
    icon: BiHomeCircle,
  },
  {
    title: "Explore",
    href: "/explore",
    icon: HiOutlineHashtag,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: BsBell,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: BsEnvelope,
  },
  {
    title: "Bookmarks",
    href: "/bookmarks",
    icon: BsBookmark,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: BiUser,
  },
];

interface Props {
  className?: string;
}

const LeftSidebar = async ({ className }: Props) => {
  return (
    <div
      className={cn("sticky top-0 flex flex-col h-screen pr-4 pb-4", className)}
    >
      <div className="flex flex-col space-y-4 mt-4 items-stretch h-full w-full">
        {navItems.map((item, i) => (
          <Link
            key={i}
            className="hover:bg-white/10 transition duration-200 text-2xl flex items-center justify-start w-fit space-x-2 rounded-3xl py-2 px-6"
            href={item.href}
          >
            <div>
              <item.icon />
            </div>
            {!item.hidden && <div>{item.title}</div>}
          </Link>
        ))}

        <TweetButton />
      </div>

      <div>
        <button className="rounded-full flex items-center justify-between text-center bg-transparent p-4 hover:bg-white/10 transition duration-200 w-full">
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-slate-400 w-12 h-12"></div>
            <div className="text-left">
              <div className="text-sm font-semibold">Club of Coders</div>
              <div className="text-xs text-gray-400">@clubofcoders</div>
            </div>
          </div>
          <div>
            <BsThreeDots />
          </div>
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;
