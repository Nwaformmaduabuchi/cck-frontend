import Link from "next/link";
import { 
  Clock3, 
  ReceiptText, 
  ShoppingCart, 
  UserRound, 
  Calendar, 
  AlertCircle,
  CreditCard,
  ChevronRight,
  Store
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SaleOrder } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import EditableSaleItem from "./Saledraft";
import EditableOrderTotal from "./Saletotal";
import { EmptyState, StatCard } from "./ui-patterns";
import ReceiptDownloadButton from "./ReceiptDownloadButton";


export const metadata = { title: "Partial Sales | CCK Retail" };

export default async function PartialSalesPage({success, error,sales }: {success:boolean, error:string[], sales: SaleOrder[] }) {
  const totalOutstanding = sales.reduce(
    (sum, sale) => sum + Number(sale.outstanding_amount ?? 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 font-sans dark:bg-slate-950">
      
      {/* Mature Sticky Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 mx-auto max-w-7xl px-2 py-2 sm:px-4 my-2 bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-2 py-4 sm:px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600 shadow-sm dark:bg-rose-500/20 dark:text-rose-400">
              <Clock3 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                Incomplete Sales
              </h1>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Orders pending payment
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-2 py-4 sm:px-4 sm:py-6">
        
        {/* KPI Dashboard */}
        <section className="grid gap-4 grid-cols-3">
          <StatCard 
            label="Incomplete Sales" 
            value={sales.length} 
            icon={AlertCircle} 
            tone="danger" 
          />
          <StatCard
            label={`${totalOutstanding < 0 ? "Refund Amount" : "Total"} `}
            value={formatCurrency(Math.abs(totalOutstanding)) || "0.00"}
            icon={ReceiptText}
            tone="danger"
          />
          <StatCard 
            label="Total Active Sales" 
            value={sales.length || 0} 
            icon={ShoppingCart} 
            tone="neutral"
          />
        </section>

        {/* Content Section */}
        <section>
          {sales.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white py-24 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
              <EmptyState
                icon={Clock3}
                title="No partial sales found"
                description="Every sale is currently completed or paid, or no draft sales have been created yet."
                action={
                  <Button asChild className="mt-6 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
                    <Link href="/sale" className="inline-flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      <span>New Sale</span>
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
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  {/* Order Top Banner */}
                  <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/50 px-5 py-4 dark:border-slate-800/80 dark:bg-slate-900/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                          Order_no: {sale.id}
                        </h2>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75"></span>
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                          </span>
                          {sale.sale_status || "Partial"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                        <Calendar className="h-3.5 w-3.5" />
                        <time dateTime={sale.created_at}>{formatDate(sale.created_at)}</time>
                      </div>
                    </div>

                    <div className="flex flex-col items-start sm:items-end">
                      <span className="text-lg font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {Number(sale.outstanding_amount) < 0 ? "Refund Amount" :"Total"}
                      </span>
                      <span className="font-mono text-xl font-bold text-rose-600 dark:text-rose-400">
                        
                        {formatCurrency(Math.abs(Number(sale.outstanding_amount)))}
                      </span>
                    </div>
                  </div>

                  {/* Order Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    
                    {/* Left Sidebar: Context & Metadata */}
                    <aside className="border-b border-slate-100 bg-slate-50/30 p-5 dark:border-slate-800 dark:bg-slate-900/30 lg:col-span-4 lg:border-b-0 lg:border-r sm:p-6">
                      <div className="flex flex-col gap-6">
                        
                        {/* Customer Info Card */}
                        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                          <div className="mb-3 flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                              Customer Details
                            </span>
                            <UserRound className="h-4 w-4 text-slate-400" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                              {sale.customer.customer_name}
                            </p>
                            <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                              {sale.customer.customer_phone || "No phone provided"}
                            </p>
                            {sale.customer.customer_address && (
                              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
                                {sale.customer.customer_address}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Seller Info */}
                        <div className="flex items-center gap-3 px-1">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                            <Store className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                              {sale.seller || "---"}
                            </p>
                            <p className="text-[10px] p-.1 text-center bg-sky-200 rounded-full font-semibold tracking-wider text-slate-500 shadow-sm">
                              Seller
                            </p>
                          </div>
                        </div>

                        <div className="mt-auto">
                          <EditableOrderTotal 
                            initialAmount={sale.outstanding_amount} 
                            orderId={sale.id} 
                          />
                        </div>

                      </div>
                    </aside>

                    {/* Right Main Content: Line Items */}
                    <div className="p-5 lg:col-span-8 sm:p-6 flex flex-col">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          Order Items
                        </h3>
                        <Link 
                          href={`/overview/payments/${sale.id}`} 
                          className="group flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                        >
                          View Payments History
                          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </div>

                      <div className="space-y-3 flex-1">
                        {sale.sale_items.map((item) => (
                          <EditableSaleItem key={item.id} item={item} success={success} error={error} />
                        ))}
                      </div>

                      <div className="mt-6 flex justify-end border-t border-slate-100 pt-5 dark:border-slate-800">
                        <ReceiptDownloadButton sale_id={String(sale.id)} />
                      </div>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}