import { SaleOrder, SaleOrderItem } from "@/lib/types";
import { formatCurrency, formatDate, StatusStyles } from "@/lib/utils";

export default async function AllCustomerSales({sales}:{sales:SaleOrder[]}) {
  return (
    <div className="min-h-screen bg-grey-50/50 p-4 md:p-8 dark:bg-grey-950">
      <div className="mx-auto max-w-7xl">

        {sales.length > 0 ? (
          <>
            {/*  MOBILE VIEW */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {sales.map((sale: SaleOrder) => {
                const totalAmount = sale.total_amount 
                  ? Number(sale.total_amount) 
                  : sale.sale_items?.reduce((sum: number, item:SaleOrderItem) => sum + (Number(item.unit_price) * Number(item.quantity)), 0) || 0;

                return (
                  <div key={sale.id} className="rounded-xl border border-grey-200 bg-white p-4 shadow-sm dark:border-grey-800 dark:bg-grey-900">
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className={`mb-2 inline-flex items-center justify-center gap-1.5 rounded-full px-1.5 py-.5 text-[10px] font-medium uppercase tracking-wide shadow-sm ${StatusStyles(sale.sale_status).badge}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${StatusStyles(sale.sale_status).dot}`} />
                          {StatusStyles(sale.sale_status).label}
                        </span>
                        <h2 className="font-semibold text-grey-900 dark:text-grey-100">
                          {sale.customer?.customer_name || "---"}
                        </h2>
                        
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-sm tracking-wider text-semibold text-grey-800 dark:text-grey-700 shadow-sm">Total</p>
                        <p className="font-mono font-semibold text-grey-900 dark:text-grey-100">
                          {formatCurrency(totalAmount)}
                        </p>
                      </div>
                    </div>

                    {/* Card Items */}
                    <div className="mb-4 rounded-lg  p-3">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-grey-500 dark:text-grey-400">
                        Items
                      </p>
                      {sale.sale_items?.length > 0 ? (
                        <ul className="space-y-2 flex flex-col">
                          {sale.sale_items.map((item: SaleOrderItem) => (
                            <li key={item.id} className="flex justify-between text-sm">
                              <span className="text-grey-700 dark:text-grey-300 truncate pr-2">
                                <span className="font-medium text-grey-900 dark:text-grey-100 mr-1.5">
                                  {item.quantity}{" "}
                                </span> 
                                {`${item.variant_name} - ${item.product_name}`}
                              </span>
                              <span className="font-mono text-grey-800 dark:text-grey-900 shrink-0 shadow-sm rounded-lg px-2 py-1">
                                {formatCurrency(item.unit_price)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-sm text-grey-400 italic">No items recorded</span>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between border-t border-grey-100 pt-3 dark:border-grey-800">
                      <span className="text-lg font-medium text-grey-600 dark:text-grey-400">
                        Outstanding
                      </span>
                      <span className="font-mono font-bold text-grey-600 dark:text-grey-400">
                        {formatCurrency(sale.outstanding_amount)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* DESKTOP VIEW */}
            <div className="hidden md:block w-full overflow-hidden rounded-xl border border-grey-200 bg-white shadow-sm dark:border-grey-800 dark:bg-grey-900">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-200">
                  <thead>
                    <tr className="border-b border-grey-200 bg-grey-50/80 text-xs font-bold uppercase tracking-wider text-grey-500 whitespace-nowrap dark:border-grey-800 dark:bg-grey-900/80 dark:text-grey-400 text-left">
                      <th className="p-2">Customer</th>
                      <th className="p-2">Description</th>
                      <th className="p-2">Quantity</th>
                      <th className="p-2">Unit Price</th>
                      <th className="p-2 w-32">Status</th>
                      <th className="p-2 t w-32">Total Amount</th>
                      <th className="p-2  w-32">Outstanding</th>
                      <th className="p-2 w-32">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((sale: SaleOrder) => {
                      const totalAmount = sale.total_amount 
                        ? Number(sale.total_amount) 
                        : sale.sale_items?.reduce((sum: number, item: SaleOrderItem) => sum + (Number(item.unit_price) * Number(item.quantity)), 0) || 0;

                      return (
                        <tr key={sale.id} className="transition-colors hover:bg-grey-50/80 dark:hover:bg-grey-800/40 shadow-sm py-2 text-left">
                          
                          {/* Col 1: Customer Name */}
                          <td className="p-2 align-middle">
                            <span className="font-medium text-sm text-grey-900 dark:text-grey-100">
                              {sale.customer?.customer_name || "---"}
                            </span>
                          </td>

                          {/* Col 2: Items List */}
                          <td className="p-2 align-middle">
                            {sale.sale_items?.length > 0 ? (
                              <div className="space-y-2">
                                {sale.sale_items.map((item: SaleOrderItem) => (
                                  <div key={`name-${item.id}`} className="text-sm text-grey-700 dark:text-grey-300 truncate max-w-50 shadow-sm p-1 rounded-lg">
                                    {`${item.variant_name} - ${item.product_name}`}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-sm text-grey-400 italic">No items recorded</span>
                            )}
                          </td>

                          {/* Col 3: Quantity List */}
                          <td className="p-2 align-middle">
                             {sale.sale_items?.length > 0 && (
                               <div className="space-y-2">
                                 {sale.sale_items.map((item: SaleOrderItem) => (
                                   <div key={`qty-${item.id}`} className="text-sm shadow-sm p-1 rounded-lg text-center">
                                     <span className="font-semibold text-xs">
                                       {item.quantity}
                                     </span>
                                   </div>
                                 ))}
                               </div>
                             )}
                          </td>

                          {/* Col 4: Unit Price List */}
                          <td className="p-2 align-middle">
                             {sale.sale_items?.length > 0 && (
                               <div className="space-y-2">
                                 {sale.sale_items.map((item: SaleOrderItem) => (
                                   <div key={`price-${item.id}`} className="text-sm font-mono text-grey-500 dark:text-grey-400 shadow-sm p-1 rounded-lg text-center">
                                     {formatCurrency(item.unit_price)}
                                   </div>
                                 ))}
                               </div>
                             )}
                          </td>

                          {/* Col 5: Status */}
                          <td className="p-2 align-middle">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium shadow-sm whitespace-nowrap ${StatusStyles(sale.sale_status).badge}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${StatusStyles(sale.sale_status).dot}`} />
                              {StatusStyles(sale.sale_status).label}
                            </span>
                          </td>

                          {/* Col 6: Total Amount */}
                          <td className="p-2 align-middle text-right ">
                            <span className="text-sm font-mono font-semibold text-grey-500 dark:text-grey-400 dark:text-grey-300 shadow-sm rounded-lg px-2 py-1">
                              {formatCurrency(totalAmount)}
                            </span>
                          </td>

                          {/* Col 7: Outstanding Amount */}
                          <td className="p-2 align-middle text-left">
                            <span className="text-sm font-mono text-grey-500 font-semibold dark:text-grey-400 shadow-sm px-2 py-1  rounded-lg">
                              {formatCurrency(sale.outstanding_amount)}
                            </span>
                          </td>
                          <td className="py-2 align-middle text-left">
                            <span className="text-sm font-mono text-grey-500 dark:text-grey-400 shadow-sm border px-3  rounded-lg">
                              {formatDate(sale.created_at)}
                            </span>
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
              <svg className="h-6 w-6 text-grey-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-grey-900 dark:text-grey-100">No sales found</h3>
            <p className="mt-1 text-grey-500 dark:text-grey-400">There are no sales records available to display at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}