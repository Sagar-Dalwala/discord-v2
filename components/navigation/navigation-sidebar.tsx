import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";

import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";
import Image from "next/image";
// import imageurl from "../../public/ai.png";
import imageurl from "../../public/Discord neon icon.jpeg";
import { ActionTooltip } from "../action-tooltip";
import Link from "next/link";

export const NavigationSideBar = async () => {
  const profile = await currentProfile();
  let serverId;

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3 bg-[#E3E5E8]">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => {
          serverId = server.id;
          return (
            <div key={server.id} className="mb-4">
              <NavigationItem
                id={server.id}
                imageUrl={server.imageUrl}
                name={server.name}
              />
            </div>
          );
        })}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-3">
        <ActionTooltip side="right" align="center" label="Discord Nitro">
          <Link href={`/servers/${serverId}/conversations`}>
            <Image
              src={imageurl}
              alt="Discord Nitro"
              width={30}
              className="h-[48px] w-[48px] rounded-xl mr-3 ms-3"
            />
          </Link>
        </ActionTooltip>
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px] rounded-full",
            },
          }}
        />
      </div>
    </div>
  );
};
