"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface Props {}

const Navbar: FC<Props> = ({}) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    if (confirm("Logout?")) {
      await signOut();
      router.refresh();
    }
  };

  return (
    <nav className="py-4 shadow w-full">
      <div className="container flex flex-wrap items-center justify-between gap-5">
        <div className="flex flex-wrap gap-5 items-center">
          <Image
            src="/next.svg"
            alt="logo"
            className="w-auto h-[30px]"
            width={300}
            height={30}
          />
          <h2>Home</h2>
          <h2>Favourite</h2>
        </div>
        <div className="flex bg-gray-100  p-[6px] rounded-md w-[40%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            placeholder="Search"
            className="bg-transparent outline-none w-full pl-3"
          />
        </div>
        <div className="flex gap-2 items-center">
          {session?.user && (
            <Image
              src={session?.user.image}
              alt="Avatar"
              className="rounded-full"
              width={40}
              height={40}
            />
          )}

          {session?.user ? (
            <h2
              className="hover:underline cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </h2>
          ) : (
            <Link href="/login">
              <h2 className="hover:underline cursor-pointer">Sign In</h2>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
