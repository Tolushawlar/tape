import { Bell, ChevronDown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
      </div>
      <div className="flex items-center space-x-4">
        {/* <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>AT</AvatarFallback>
          </Avatar>

          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <ChevronDown className="w-5 h-5" />
          </Button> 
        </div>*/}
      </div>
    </header>
  );
}
