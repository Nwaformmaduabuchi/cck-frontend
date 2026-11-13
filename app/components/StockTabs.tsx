'use client'
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {  CircleAlert, Clock1, DollarSign, Plus } from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation"



const tablinks = [
  {
    href: "/overview/stock/products/add",
    label: "Add",
    icon: Plus,
    active:
      "bg-yellow-100 text-yellow-700 border-yellow-500 hover:bg-yellow-100 transition-colors shadow-sm",
  },
];


const StockTabs = () => {
    const pathname  = usePathname()
  return <div className="sticky top-0 z-50 flex flex-col justify-center itms-center  py-2">
    <nav className="flex gap-2 md:gap items-center">
  {tablinks.map((tab) => {
    const Icon = tab.icon;
    const active = pathname === tab.href;
    return (
      <Link key={tab.href} href={tab.href}>
        <Button
          variant="outline"
          className={cn(
            "border-border bg-white text-slate-700 hover:border-border hover:bg-sky-500 hover:text-white w-fit",
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

export default StockTabs;
