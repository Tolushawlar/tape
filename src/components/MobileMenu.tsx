"use client";

import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import CartSheet from "./CartSheet";

import { sectionData } from "@/constants";
import { useSearchModalStore } from "@/lib/store/search-store";

const MobileMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { toggleSearchModal } = useSearchModalStore();

  return (
    <>
      <div className="md:hidden flex justify-between items-center">
        <Sheet open={openMenu} onOpenChange={setOpenMenu}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Menu />
              <span className="sr-only">Menu trigger</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="w-[300px]">
            <AccordionMenu setOpenMenu={setOpenMenu} />
            <Link
              href="/blogs"
              className="block mt-4 hover:scale-[1.02] transition-transform duration-300"
            >
              Tape Blog
            </Link>
          </SheetContent>
        </Sheet>

        <Link href="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleSearchModal}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <CartSheet />
        </div>
      </div>
    </>
  );
};

export default MobileMenu;

interface AccordionMenuProps {
  setOpenMenu: (openMenu: boolean) => void;
}

export function AccordionMenu({ setOpenMenu }: AccordionMenuProps) {
  return (
    <Accordion type="single" collapsible className="w-full mt-4">
      {sectionData.map((section) => (
        <AccordionItem key={section.label} value={section.label}>
          <AccordionTrigger>{section.label}</AccordionTrigger>
          <AccordionContent>
            <ul>
              {section.categories.map((category) => (
                <li key={category.label} className="my-4 ml-3">
                  <Link href={category.href} onClick={() => setOpenMenu(false)}>
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
