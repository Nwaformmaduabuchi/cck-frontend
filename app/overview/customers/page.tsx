import Link from "next/link";
import { formatCurrency, StatusStyles } from "@/lib/utils";
import { fetchAllCustomer } from "@/lib/Api";
import { CustomerType, SaleOrder, SaleOrderItem } from "@/lib/types";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata = { title: "Customers | CCK Retail" };

function getCustomerPurchaseCount(salesCount: number) {
  if (salesCount === 0) {
    return {
      badge: "bg-grey-100 text-grey-700 dark:bg-grey-800 dark:text-grey-300 border border-grey-200 dark:border-grey-700",
      dot: "bg-grey-400",
      label: "No History",
    };
  }
}

export default async function Customers({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Fetch the raw data
  const res = (await fetchAllCustomer());
  const customers: CustomerType[] = res.data || [];

  
  const viewLinkStyles =
    "flex items-center justify-center rounded-lg bg-grey-100 px-4 py-2 text-sm font-medium text-grey-900 transition-all  cursor-pointer dark:text-sky-100 active:scale-95 gap-2 hover:text-sky-500";

  return (
    <div className="min-h-screen bg-grey-50/50 p-4 md:p-8 dark:bg-grey-950">
      <div className="mx-auto max-w-7xl">
        {customers.length > 0 ? (
          <>
            
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {customers.map((customer: CustomerType) => {
                const sales = customer.sales || [];
                const salesCount = sales.length;
                const totalSpent = sales.reduce(
                  (sum: number, sale: SaleOrder) =>
                    sum + Number(sale.total_amount || 0),
                  0
                );
                const totalOutstanding = sales.reduce(
                  (sum: number, sale: SaleOrder) =>
                    sum + Number(sale.outstanding_amount || 0),
                  0
                );
                const purchaseCount = getCustomerPurchaseCount(salesCount);

                return (
                  <div
                    key={customer.id}
                    className="rounded-xl border border-grey-200 bg-white p-4 shadow-sm dark:border-grey-800 dark:bg-grey-900"
                  >
                    <div className="flex items-start justify-between mb-4 border-b border-grey-100 dark:border-grey-800 pb-4">
                      <div>
                        <h2 className="font-semibold text-lg text-grey-900 dark:text-grey-100">
                          {customer.customer_name || "Unknown Customer"}
                        </h2>
                        <div className="mt-1 space-y-0.5 text-sm text-grey-500 dark:text-grey-400">
                          <p>{customer.customer_phone || "No phone"}</p>
                          <p className="truncate max-w-50">
                            {customer.customer_address || "No address"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div className="rounded-lg bg-grey-50/50 p-3 dark:bg-grey-800/30">
                        <p className="text-xs font-semibold uppercase tracking-wider text-grey-500 dark:text-grey-400 mb-1">
                          Total Orders
                        </p>
                        <p className="font-medium text-grey-900 dark:text-grey-100">
                          {salesCount}
                        </p>
                      </div>
                      <div className="rounded-lg bg-grey-50/50 p-3 dark:bg-grey-800/30">
                        <p className="text-xs font-semibold uppercase tracking-wider text-grey-500 dark:text-grey-400 mb-1">
                          Total Spent
                        </p>
                        <p className="font-mono font-semibold text-grey-900 dark:text-grey-100">
                          {formatCurrency(totalSpent)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 pb-4">
                      <span className="text-sm font-medium text-grey-600 dark:text-grey-400">
                        Outstanding Balance
                      </span>
                      <span
                        className={`font-mono font-bold ${
                          totalOutstanding > 0
                            ? "text-amber-600 dark:text-amber-500"
                            : "text-green-600 dark:text-green-500"
                        }`}
                      >
                        {formatCurrency(totalOutstanding)}
                      </span>
                    </div>

                    
                    <div className="border-t border-grey-100 dark:border-grey-800 pt-4">
                      <Link
                        href={`/overview/customers/${customer.id}/`}
                        className={`${viewLinkStyles} w-full`}
                      >
                        View Details
                        <ArrowRight />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

           
            <div className="hidden md:block w-full overflow-hidden rounded-xl border border-grey-200 bg-white shadow-sm dark:border-grey-800 dark:bg-grey-900">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-grey-200 bg-grey-50/80 text-xs font-bold uppercase tracking-wider text-grey-500 whitespace-nowrap dark:border-grey-800 dark:bg-grey-900/80 dark:text-grey-400">
                      <th className="p-4">Customer Name</th>
                      <th className="p-4">Contact Info</th>
                      <th className="p-4 text-center">Purchases</th>
                      <th className="p-4 text-right w-36">Total Spent</th>
                      <th className="p-4 text-center w-36">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer: CustomerType) => {
                      const sales = customer.sales || [];
                      const salesCount = sales.length;
                      const totalSpent = sales.reduce(
                        (sum: number, sale: SaleOrder) =>
                          sum + Number(sale.total_amount || 0),
                        0
                      );

                      return (
                        <tr
                          key={customer.id}
                          className="transition-colors border-b last:border-0 border-grey-100 dark:border-grey-800 hover:bg-grey-50/80 dark:hover:bg-grey-800/40"
                        >
                          <td className="p-4 align-middle">
                            <span className="font-medium text-sm text-grey-900 dark:text-grey-100">
                              {customer.customer_name || "---"}
                            </span>
                          </td>

                          <td className="p-4 align-middle">
                            <div className="text-sm text-grey-700 dark:text-grey-300">
                              {customer.customer_phone || "---"}
                            </div>
                            <div className="text-xs text-grey-500 truncate max-w-xs mt-0.5">
                              {customer.customer_address || "---"}
                            </div>
                          </td>

                          <td className="p-4 align-middle text-center">
                            <span className="inline-flex items-center justify-center bg-grey-100 dark:bg-grey-800 text-grey-800 dark:text-grey-200 font-medium text-xs rounded-lg px-2.5 py-1">
                              {salesCount}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-right">
                            <span className="font-mono text-sm font-medium text-grey-900 dark:text-grey-100">
                              {formatCurrency(totalSpent)}
                            </span>
                          </td>
                          <td className="p-4 align-middle text-center">
                            
                            <Link
                              href={`/overview/customers/${customer.id}/`}
                              className={viewLinkStyles}
                            >
                              View
                              <ArrowRight className="size-3" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-grey-300 bg-white p-12 text-center dark:border-grey-800 dark:bg-grey-900">
            <div className="mb-4 rounded-full bg-grey-100 p-3 dark:bg-grey-800">
              <svg
                className="h-6 w-6 text-grey-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-grey-900 dark:text-grey-100">
              No customers found
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}