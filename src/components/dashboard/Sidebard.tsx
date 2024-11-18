import {
  LayoutDashboard,
  MoreVertical,
  Package,
  ShoppingCart,
  Store,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

const links = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/dashboard/products", icon: Package, label: "Products" },
  { href: "/admin/dashboard/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/admin/dashboard/inventory", icon: Store, label: "Inventory" },
  { href: "/admin/dashboard/customers", icon: Users2, label: "Customers" },
];

function SidebarLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof LayoutDashboard;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-label={label}
      className={`flex items-center gap-3 px-6 py-3 transition-colors ${
        isActive
          ? "text-white bg-white bg-opacity-10 border-l-4 border-blue-500"
          : "text-gray-400 hover:text-white"
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </Link>
  );
}

export function SidebarContent() {
  return (
    <aside className="relative h-full bg-gray-800 text-white">
      <div className="flex items-center gap-2 p-6">
        <Link href="/admin/dashboard" aria-label="Dashboard Home">
          <Logo type="dashboard" />
        </Link>
      </div>

      <nav className="mt-6">
        {links.map((link) => (
          <SidebarLink key={link.href} {...link} />
        ))}
      </nav>

      <div className="absolute bottom-8 left-6 right-6">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="Profile Picture" />
            <AvatarFallback>AT</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">Adeshile Tape</p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
