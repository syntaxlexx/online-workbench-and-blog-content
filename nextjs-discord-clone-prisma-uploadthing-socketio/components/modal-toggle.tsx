import { Profile } from "@prisma/client";
import { Menu } from "lucide-react";
import NavigationSidebar from "./navigation/navigation-sidebar";
import ServerSidebar from "./server/server-sidebar";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface Props {
  serverId: string;
  profile: Profile;
}

const ModalToggle = async ({ serverId, profile }: Props) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0">
        <div className="w-[72px]">
          <NavigationSidebar />
        </div>
        <ServerSidebar serverId={serverId} profile={profile} />
      </SheetContent>
    </Sheet>
  );
};

export default ModalToggle;
