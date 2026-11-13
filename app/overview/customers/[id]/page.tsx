
import CompletedSalesPage from "@/app/components/CompletedPage";
import AllCustomerSales from "@/app/components/customer/AllCustomerSales";
import PartialSalesPage from "@/app/components/PartialPage";
import PendingSalesPage from "@/app/components/PendingPage";
import SalesTabWrapper from "@/app/components/SalesTabWrapper";

import { fetchCustomer } from "@/lib/Api";
import { CustomerType, SaleOrder } from "@/lib/types";

export const metadata = { title: "Sales | CCK Retail" };

function getCustomerStatusStyles( salesCount: number) {
  if (salesCount === 0) {
    return {
      badge: "bg-grey-100 text-grey-700 dark:bg-grey-800 dark:text-grey-300 border border-grey-200 dark:border-grey-700",
      dot: "bg-grey-400",
      label: "No History",
    };
  }
}

export default async function Sales({params, searchParams}: {params:Promise<{id:string}>, searchParams: Promise<{status?: string}>}) {
  const urlsearch = await searchParams;
  const {id} = await params;
  const currentStatus = urlsearch.status || "all"; 
  
  const apiParams = new URLSearchParams(urlsearch as Record<string, string>);
  if (currentStatus === "all") {
    apiParams.delete("status");
  } 
  const res = await fetchCustomer(id, apiParams.toString()) || {};
  const customers:CustomerType = res.data || [];
  const sales:SaleOrder[] = customers.sales;
  
  const componentMap = {
    completed: CompletedSalesPage,
    partial: PartialSalesPage,
    pending: PendingSalesPage,
  };
  const ActivePage = componentMap[currentStatus as keyof typeof componentMap] 
  
  return (
    <div>
      <SalesTabWrapper />
       { currentStatus ==="all"
        ? <AllCustomerSales sales={sales} />
        : <ActivePage
          sales={sales} 
          success= {true}
          error={[""]}
        />
      }
    </div>
  )  
}