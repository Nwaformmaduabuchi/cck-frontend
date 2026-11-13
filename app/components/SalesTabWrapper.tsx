"use client";

import { CircleAlert, Clock1, DollarSign } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const statusLinks = [
  {
    label: "All",
    icon: Clock1,
  },
  {
    label: "Pending",
    icon: Clock1,
  },
  {
    label: "Partial",
    icon: CircleAlert,
  },
  {
    label: "Completed",
    icon: DollarSign,
  },
];

const SalesTabWrapper = () => {
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
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-nowrap mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 sticky top-0 z-30 mt-4">
      {statusLinks.map((tab) => {
        const Icon = tab.icon;
        const active = currentStatus === tab.label.toLowerCase();

        return (
          <button
            key={tab.label}
            onClick={() => handleStatus(tab.label.toLowerCase())}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-colors shadow-sm capitalize ${
              active 
                ? "bg-[#1f108e] text-white" 
                : "bg-white text-[#464553] hover:text-[#0b1c30]"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default SalesTabWrapper;