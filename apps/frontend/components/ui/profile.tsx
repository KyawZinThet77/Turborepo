"use client";
import { UserIcon } from "@heroicons/react/24/outline";

import * as Avatar from "@radix-ui/react-avatar";
import * as Popover from "@radix-ui/react-popover";
import { userType } from "@/lib/session";
import { ArrowRightStartOnRectangleIcon, ListBulletIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import SignOutButton from "./signoutButton";

type Props = {
  user: userType | null;
};

export default function Profile({ user }: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="flex items-center gap-2">
          <Avatar.Root>
            <Avatar.Image
              src={user?.avatar || "/default-avatar.png"}
              alt={`${user?.name || "User"}'s avatar`}
              className="w-8 h-8 rounded-full cursor-pointer"
            /> 
            <Avatar.Fallback className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
           
                <UserIcon className="w-4 h-4 text-gray-600 cursor-pointer" />
            
            </Avatar.Fallback>
          </Avatar.Root>

          <span className="text-sm font-medium">{user?.name || "User"}</span>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
  align="end"
  sideOffset={8}
  className="w-64 rounded-xl border bg-white p-2 shadow-lg"
>
  <div className="border-b pb-3 mb-2">
    <p className="font-medium">{user?.name}</p>
    <p className="text-sm text-muted-foreground truncate">
      {user?.email}
    </p>
  </div>

  <div className="space-y-1">
    <Link
      href="/user/create-post"
      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
    >
      <PencilSquareIcon className="h-5 w-5" />
      Create Post
    </Link>

    <Link
      href="/user/posts"
      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
    >
      <ListBulletIcon className="h-5 w-5" />
      View Posts
    </Link>

    <div className="border-t my-2" />

    {/* Sign Out Button */}
    <SignOutButton />
  </div>
</Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

