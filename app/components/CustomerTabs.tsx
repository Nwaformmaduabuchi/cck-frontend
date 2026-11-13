'use client'
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleAlert, Clock1, DollarSign, History } from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation"



const CustomerTab = () => {
    const tablinks = [
      {
    href: `/customers`,
    label: "All",
    icon: History,
    active:
      "bg-blue-100 text-gray-700 hover:text-white hover:bg-blue-500 transition-all duration-200 shadow-sm",
  },
  {
    href:`/customers/pending`,
    label: "Pending",
    icon: Clock1,
    active:
      "bg-sky-100 text-gray-700 hover:text-white hover:bg-sky-500 transition-all duration-200 shadow-sm",
  },
  {
    href: `/customers/partial`,
    label: "Incomplete",
    icon: CircleAlert,
    active:
      "bg-yellow-100 text-gray-700 hover:text-white hover:bg-yellow-500 transition-all duration-200 shadow-sm",
  },
  {
    href: `/customers/completed`,
    label: "Completed",
    icon: DollarSign,
    active:
      "bg-green-100 text-gray-700 hover:text-white hover:bg-green-500 transition-all duration-200 shadow-sm",
  },
];
    const pathname  = usePathname()
  return <div className="sticky top-0 z-50 flex flex-col bg-background p-4 sm:max-w-6xl mx-auto">
    <nav className=" space-x-2 items-center flex md:gap-4">
  {tablinks.map((tab) => {
    const Icon = tab.icon;
    const active = pathname === tab.href;
    return (
      <Link key={tab.href} href={tab.href} >
        <Button
        variant={"ghost"}
          className={cn(
            "bg-gray-100 text-slate-700 hover:bg-sky-300 hover:text-white",
            active && tab.active
          )}
        >
          <Icon className="mr-2 h-4 w-4 shadow-sm rounded-lg" />
          {tab.label}
        </Button>
      </Link>
    );
  })}
</nav>
</div>;

};

export default CustomerTab;
