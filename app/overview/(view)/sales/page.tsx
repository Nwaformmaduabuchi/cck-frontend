import AllSales from "@/app/components/AllSales";
import CompletedSalesPage from "@/app/components/CompletedPage";
import PartialSalesPage from "@/app/components/PartialPage";
import PendingSalesPage from "@/app/components/PendingPage";
import SalesTabWrapper from "@/app/components/SalesTabWrapper";

import { fetchSales } from "@/lib/Api";
import { SaleOrder, SalesType } from "@/lib/types";
import { StatusStyles } from "@/lib/utils";
import { toast } from "sonner";

export const metadata = { title: "Sales | CCK Retail" };

export default async function Sales({searchParams}: {searchParams: Promise<{status?: string}>}) {
  const params = await searchParams;
  const currentStatus = params.status || "all"; 
  
  const apiParams = new URLSearchParams(params as Record<string, string>);
  if (currentStatus === "all") {
    apiParams.delete("status");
  } 
  const res: SalesType = await fetchSales(apiParams.toString());
  const sales: SaleOrder[] = res.data;
  
  const componentMap = {
    completed: CompletedSalesPage,
    partial: PartialSalesPage,
    pending: PendingSalesPage,
  };
  const ActivePage = componentMap[currentStatus as keyof typeof componentMap] 
  return (
    <div>
      <SalesTabWrapper />
     {currentStatus === "all" 
     ? <AllSales sales={sales} getSaleStatusStyles={StatusStyles} />
    :<ActivePage 
          sales={sales}
          error={res.error}
          success={res.success}
        /> }
    </div>
  )
  
}