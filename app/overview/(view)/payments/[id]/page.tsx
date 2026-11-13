import AllPayments from "@/app/components/Payments";
import { fetchPayments } from "@/lib/Api";
import { SalePaymentType } from "@/lib/types";


function getSaleStatusStyles(status: string) {
  if (status === "completed") {
    return {
      badge: "bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-400 border border-green-200 dark:border-green-500/30",
      dot: "bg-green-500",
      label: status || "Completed",
    };
  }
  if (status === "partial") {
    return {
      badge: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400 border border-red-200 dark:border-red-500/30",
      dot: "bg-red-500",
      label: status || "Partial",
    };
  }
  return {
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30",
    dot: "bg-amber-500",
    label: status || "Pending",
  };
}

const page = async ({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params;
    const res = await fetchPayments(id);
    const SalePayment:SalePaymentType = res.data
  return <div>
    <AllPayments SalePayment={SalePayment} getPaymentStatusStyles={getSaleStatusStyles}  />
  </div>;
};

export default page;
