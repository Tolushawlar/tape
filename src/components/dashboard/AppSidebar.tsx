"use client";

import {
  LayoutDashboard,
  Tag,
  // ShoppingCart,
  // Users,
  // Settings,
  Package,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/Logo";
import { NavUser } from "@/components/nav-user";

const baseUrl = "/admin/dashboard";

const user = {
  name: "Adeshile Tape",
  email: "superadmin@example.com",
  avatar: "/avatars/shadcn.jpg",
};

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: baseUrl },
  {
    title: "Products",
    icon: Package,
    url: `${baseUrl}/products`,
    active: true,
  },
  { title: "Categories", icon: Tag, url: `${baseUrl}/product-categories` },
  // { title: "Orders", icon: ShoppingCart, url: `${baseUrl}/orders` },
  // { title: "Customers", icon: Users, url: `${baseUrl}/customers` },
  // { title: "Settings", icon: Settings, url: `${baseUrl}/settings` },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-[#1a1f37]">
        <div className="p-4">
          <Link href="/">
            <Logo type="dashboard" />
          </Link>
        </div>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <SidebarLink {...item} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="bg-[#1a1f37]">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}

export function SidebarLink({
  url,
  icon: Icon,
  title,
}: {
  url: string;
  icon: typeof LayoutDashboard;
  title: string;
}) {
  const pathname = usePathname();
  const isActive =
    pathname === baseUrl || (pathname.startsWith(url) && url !== baseUrl);

  return (
    <Link
      href={url}
      aria-label={title}
      className={`flex items-center gap-3 px-6 py-3 transition-colors ${isActive
        ? "text-white bg-white bg-opacity-10 border-l-4 border-blue-500"
        : "text-gray-400 hover:text-white"
        }`}
    >
      <Icon className="w-5 h-5" />
      {title}
    </Link>
  );
}
