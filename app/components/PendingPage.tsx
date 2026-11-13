import Link from "next/link";
import { Clock3, ReceiptText, ShoppingCart, UserRound, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SaleOrder } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { fetchProducts } from "@/lib/Api";
import EditableSaleItem from "./Saledraft";
import EditableOrderTotal from "./Saletotal";
import { EmptyState, StatCard } from "./ui-patterns";
import UpdateSale from "@/app/components/UpdateSale";
import ReceiptDownloadButton from "./ReceiptDownloadButton";

export const metadata = { title: "Pending Sales | CCK Retail" };


export default async function PendingSalesPage({success, error,sales }: {success:boolean, error:string[], sales: SaleOrder[] }) {
  const data = await fetchProducts();
  const variants = data.flatMap(product => product.variants);
  
  const value = sales.reduce(
    (sum, sale) => sum + Number(sale.outstanding_amount ?? 0),
    0
  );

  return (
    <div className="min-h-screen bg-background mx-auto max-w-7xl space-y-8 px-2 py-4 sm:px-4 sm:py-6">
      <div className=" backdrop-blur-sm text-sky-600 font-bold text-lg md:text-xl lg:text-2xl sticky top-0 z-40 px-4 py-4 sm:px-6 my-2 bg-background">
        Pending Sales
      </div>

      <div className="px-4 sm:px-6">
        
        <div className="grid gap-4 grid-cols-3 z-10">
          <StatCard 
            label="Pending Sales" 
            value={sales.length} 
            icon={Clock3} 
            tone="warning" 
          />
          <StatCard
            label="Total"
            value={formatCurrency(value) || 0}
            icon={ReceiptText}
            tone="warning"
          />
          <StatCard 
            label="Total Sales" 
            value={sales.length || 0} 
            icon={ShoppingCart} 
          />
        </div>

        {/* Content Section */}
        <div className="mt-8">
          {sales.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-card p-8 sm:p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
              <EmptyState
                icon={Clock3}
                title="No pending sales"
                description="Every sale is currently completed or paid, or no draft sales have been created yet."
                action={
                  <Button asChild className="mt-4 bg-sky-600 text-white hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400">
                    <Link href="/overview/new_sale" className="inline-flex items-center gap-2">
                      <ShoppingCart className="size-4" />
                      <span>Create Sale</span>
                    </Link>
                  </Button>
                }
              />
              
            </div>
          ) : (
            <div className="space-y-6">
              {sales.map((sale) => (
                <article 
                  key={sale.id} 
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80"
                >
                  {/* Order Banner */}
                  <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50/75 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/50 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold relative text-amber-800 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/30">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping absolute" />
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 relative" />
                          {sale.sale_status || "Pending"}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="size-3.5 shrink-0" />
                        <time dateTime={sale.created_at}>{formatDate(sale.created_at)}</time>
                      </div>
                    </div>

                    <div className="text-left sm:text-right border-t border-slate-200 pt-3 sm:border-t-0 sm:pt-0 dark:border-slate-800">
                      <p className="text-lg mb-1 font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Total
                      </p>
                      <p className="font-mono text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                        {formatCurrency(sale.outstanding_amount)}
                      </p>
                    </div>
                  </div>

                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 py-5 sm:px-6">
                    
                    
                    <aside className="lg:col-span-4 flex flex-col gap-5 lg:border-r lg:border-slate-100 lg:dark:border-slate-800 lg:pr-6">
                      
                      
                      <div className="flex items-start gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400 font-semibold">
                          <UserRound className="size-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <p className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                              {sale.customer.customer_name}
                            </p>
                            <span className="text-[10px] font-semibold tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-full">
                              Customer
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                            {sale.customer.customer_phone || "No phone provided"}
                          </p>
                          {sale.customer.customer_address && (
                            <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                              {sale.customer.customer_address}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="rounded-lg">
                        <div className=" mb-1">
                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                          {sale.seller || "System"}
                        </p>
                          <span className="text-[10px] font-semibold tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 rounded-full">
                            Seller
                          </span>
                        </div>
                        
                      </div>

                      <div className="pt-2">
                        <EditableOrderTotal 
                          initialAmount={sale.outstanding_amount} 
                          orderId={sale.id} 
                        />
                      </div>

                    </aside>

                    <div className="lg:col-span-8 flex flex-col gap-6">
                      <div className="space-y-3">
                        {sale.sale_items.map((item) => (
                          <EditableSaleItem key={item.id} item={item} success={success} error={error} />
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                        <UpdateSale variants={variants} id={sale.id} />
                      </div>
                    </div>
                  <div>
                    <ReceiptDownloadButton sale_id={String(sale.id)} />
                  </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}