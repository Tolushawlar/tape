"use client";

import Image from "next/image";
import { forwardRef } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { sectionData } from "@/constants";

import { cn } from "@/lib/utils";

export function LeftNavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {sectionData.map((section) => (
          <NavigationMenuItem key={section.label}>
            <NavigationMenuTrigger className="bg-transparent">
              {section.label}
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[500px] lg:w-[1000px] xl:w-[1280px] 2xl:w-[1440px] lg:grid-cols-[.75fr_1fr]">
                <div>
                  {section.categories.map(({ label, href }) => (
                    <ListItem 
                      key={label} 
                      href={section.label === "Men" ? `/collections2/${encodeURIComponent(label)}` : undefined}
                      className={section.label !== "Men" ? "pointer-events-none opacity-50" : "text-black"}
                    >
                      {label}
                    </ListItem>
                  ))}
                </div>

                <li>
                  <NavigationMenuLink asChild>
                    <div
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      <Image
                        src={section.image}
                        alt="Logo"
                        width={150}
                        height={50}
                        className="w-full object-contain"
                      />
                    </div>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
