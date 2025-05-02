"use client";

import Link from "next/link";
import { Search } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import CartSheet from "./CartSheet";
import { Button } from "./ui/button";
import SearchProduct from "./SearchProduct";

import { useSearchModalStore } from "@/lib/store/search-store";

export function RightNavMenu() {
  const { isOpen, toggleSearchModal } = useSearchModalStore();

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          {/* <NavigationMenuItem>
            <Link href="/events" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Events
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem> */}

          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {/* <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem> */}

          <NavigationMenuItem>
            <Link href="/blogs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Tape Blog
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Button variant="ghost" size="icon" onClick={toggleSearchModal}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <CartSheet />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <SearchProduct openSearch={isOpen} setOpenSearch={toggleSearchModal} />
    </>
  );
}
