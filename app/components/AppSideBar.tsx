"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Activity,
  DollarSign,
  Home,
  LogOut,
  PackagePlus,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { SidebarBrand } from "./HeaderIcon";
import { user_logout_action } from "@/lib/actions";

const navigation = [
  { href: "/overview", label: "Inventory", icon: Home },
  { href: "/overview/new_sale", label: "New Sale", icon: ShoppingCart },
  { href: "/overview/stock", label: "Manage Stock", icon: PackagePlus },
  { href: "/overview/sales", label: "Sales", icon: DollarSign },
  { href: "/overview/history", label: "History", icon: Activity },
  { href: "/overview/customers", label: "Customer", icon: User },
  { href: "/overview/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  const handleLogout = async function () {
    await user_logout_action();
  };

  return (
    <Sidebar collapsible="icon" className=" shrink-0 flex flex-col items-center justify-center px-1">
      <SidebarHeader className="p-0 py-4">
        <SidebarBrand />
      </SidebarHeader>
      
      
      <SidebarContent className="flex-1 w-full">
        <SidebarMenu className="gap-2 ">
          {navigation.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  className={cn(
                    "h-10 rounded-lg",
                    active &&
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  <Link href={item.href} title={item.label}>
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      
      <SidebarFooter className="mt-auto shrink-0 px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              title="Logout"
              className="rounded-lg text-red-600 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-950/50"
            >
              <LogOut className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}