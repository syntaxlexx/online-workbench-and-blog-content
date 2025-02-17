"use client";

import { combineName } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Loader } from "lucide-react";
import { api } from "../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

interface Props {}

const WhoToFollow = ({}: Props) => {
  const users = useQuery(api.users.getRecentUsers);

  if (users === null) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Who to follow</CardTitle>
      </CardHeader>
      <CardContent>
        {!users && <Loader className="size-4 animate-spin" />}

        <ul>
          {users?.map((user) => (
            <li key={user._id}>
              <Link href={`/users/${user._id}`} className="block">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2">
                    <Avatar className="size-5">
                      <AvatarImage
                        src={user.imageUrl}
                        alt={combineName(user)}
                      />
                      <AvatarFallback>
                        {user.firstName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-sm font-medium">{combineName(user)}</h2>
                  </div>

                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className="rounded-full font-light">
                    Follow
                  </Button>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href={`/`} className="text-xs font-light text-emerald-500">
          See more suggestions
        </Link>
      </CardFooter>
    </Card>
  );
};

export default WhoToFollow;
