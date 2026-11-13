"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleAlert, Clock1, DollarSign } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const statusLinks = [
  {
    label: "All",
    icon: Clock1,
    active: "bg-slate-100 text-slate-700 border-slate-500 hover:text-white hover:bg-slate-500 transition-colors shadow-sm",
  },
  {
    label: "Pending",
    icon: Clock1,
    active: "bg-sky-100 text-amber-700 border-amber-500 hover:text-white hover:bg-amber-500 transition-colors shadow-sm",
  },
  {
    label: "Partial",
    icon: CircleAlert,
    active: "bg-yellow-100 text-rose-700 border-rose-500 hover:text-white hover:bg-rose-500 transition-colors shadow-sm",
  },
  {
    label: "Completed",
    icon: DollarSign,
    active: "bg-green-100 text-green-700 hover:text-white border-green-500 hover:bg-green-500 transition-colors shadow-sm",
  },
];

const CustomersTab = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentStatus = searchParams.get("status") || "all";

  const handleStatus = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (status === "all") {
      params.delete("status");
    } else {
      params.set("status", status);
    }

    const queryString = params.toString();
    replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <div className="flex gap-2">
      {statusLinks.map((tab) => {
        const Icon = tab.icon;
        
        const active = currentStatus === tab.label.toLowerCase();

        return (
          <Button
            key={tab.label}
            onClick={() => handleStatus(tab.label.toLowerCase())}
            variant="outline"
            className={cn(
              "border-border bg-white text-slate-700 hover:border-border hover:bg-sky-500 hover:text-white",
              active ? tab.active : ""
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
};

export default CustomersTab;
