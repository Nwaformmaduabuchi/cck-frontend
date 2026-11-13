import Link from "next/link";
import { 
  CheckCircle2, 
  ReceiptText, 
  ShoppingCart, 
  UserRound, 
  Calendar,
  Store,
  ChevronRight,
  PackageCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Customer, SaleOrder, SaleOrderItem } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { EmptyState, StatCard } from "./ui-patterns";
import ReceiptDownloadButton from "./ReceiptDownloadButton";

export const metadata = { title: "Completed Sales | CCK Retail" };

function SaleItemSummary({ items, sale_id }: { items: SaleOrderItem[], customer?: Customer, sale_id: string }) {
  return (
    <div className="flex h-full flex-col">
      {/* MOBILE VIEW */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/60 md:hidden">
        {items.map((item) => {
          const lineTotal = Number(item.quantity ?? 0) * Number(item.unit_price ?? 0);
          return (
            <div key={item.id} className="py-4 space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold text-sm text-slate-900 dark:text-slate-100 leading-tight">
                  {`${item.variant_name} - ${item.product_name}`}
                </p>
                <p className="font-mono font-bold text-slate-900 dark:text-slate-100 shrink-0">
                  {formatCurrency(lineTotal)}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {item.product_type && (
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {item.product_type}
                  </span>
                )}
                {item.variant_color && (
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {item.variant_color}
                  </span>
                )}
                {item.variant_size && (
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    Size: {item.variant_size}
                  </span>
                )}
              </div>

              <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {formatCurrency(item.unit_price)} × {item.quantity}
              </p>
            </div>
          );
        })}
      </div>

      {/* DESKTOP VIEW: Clean Table (>= 768px) */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">
                <th className="py-3 px-4">Item Details</th>
                <th className="py-3 px-4">Color</th>
                <th className="py-3 px-4 text-center">Qty</th>
                <th className="py-3 px-4 text-right">Unit Price</th>
                <th className="py-3 px-4 text-right">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm dark:divide-slate-800/60 bg-white dark:bg-transparent">
              {items.map((item) => {
                const lineTotal = Number(item.quantity ?? 0) * Number(item.unit_price ?? 0);
                
                return (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="py-3.5 px-4 relative">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-0.5">
                        {`${item.variant_name} - ${item.product_name}`}
                      </span>
                      {(item.product_type || item.variant_size) && (
                        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                          {item.product_type && <span>{item.product_type}</span>}
                          {item.product_type && item.variant_size && <span className="opacity-50">•</span>}
                          {item.variant_size && <span>Size: {item.variant_size}</span>}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {item.variant_color || "---"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-medium text-slate-700 dark:text-slate-300">
                      {item.quantity}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-right text-slate-500 dark:text-slate-400">
                      {formatCurrency(item.unit_price)}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-right text-slate-900 dark:text-slate-100">
                      {formatCurrency(lineTotal)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex justify-end border-t border-slate-100 pt-5 dark:border-slate-800">
        <ReceiptDownloadButton sale_id={sale_id} />
      </div>
    </div>
  );
}

// ==========================================
// Main Completed Sales Page
// ==========================================
export default async function CompletedSalesPage({sales}: {sales: SaleOrder[]}) {
  const totalRevenue = sales.reduce(
    (sum, order) => sum + Number(order.total_amount ?? 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 font-sans dark:bg-slate-950">
      
      {/* Mature Sticky Header */}
      <header className="sticky top-0 z-40 w-full lg:px-8 mx-auto max-w-7xl space-y-8 px-2 py-4 sm:px-4 sm:py-6 bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                Completed Sales
              </h1>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Fully paid and finalized orders
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 pt-8 sm:px-6 lg:px-8">
        
        {/* KPI Dashboard */}
        <section className="grid gap-4 grid-cols-3">
          <StatCard
            label="Completed Sales"
            value={sales.length}
            icon={CheckCircle2}
            tone="success"
          />
          <StatCard 
            label="Completed Revenue" 
            value={formatCurrency(totalRevenue) || "$0.00"} 
            icon={ReceiptText} 
            tone="success"
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
                icon={PackageCheck}
                title="No completed sales yet"
                description="Completed or fully paid sales will appear here once their status is updated."
                action={
                  <Button asChild className="mt-6 bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
                    <Link href="/pendingsales" className="inline-flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      <span>View Pending Orders</span>
                    </Link>
                  </Button>
                }
              />
            </div>
          ) : (
            <div className="space-y-6">
              {sales.map((order) => (
                <article 
                  key={order.id} 
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  {/* Order Top Banner */}
                  <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/50 px-5 py-4 dark:border-slate-800/80 dark:bg-slate-900/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                          Order_no: {order.id}
                        </h2>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                          </span>
                          {order.sale_status || "Completed"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                        <Calendar className="h-3.5 w-3.5" />
                        <time dateTime={order.created_at}>{formatDate(order.created_at)}</time>
                      </div>
                    </div>

                    <div className="flex flex-col items-start sm:items-end">
                      <span className="text-lg font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Total
                      </span>
                      <span className="font-mono text-xl font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(order.total_amount)}
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
                              {order.customer.customer_name}
                            </p>
                            <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                              {order.customer.customer_phone || "No phone provided"}
                            </p>
                            {order.customer.customer_address && (
                              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
                                {order.customer.customer_address}
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
                              {order.seller || "System"}
                            </p>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                              Assigned Seller
                            </p>
                          </div>
                        </div>

                      </div>
                    </aside>

                    {/* Right Main Content: Line Items & Actions */}
                    <div className="p-5 lg:col-span-8 sm:p-6 flex flex-col">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          Order Items
                        </h3>
                        <Link 
                          href={`/payments/${order.id}`} 
                          className="group flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                        >
                          View Payments History
                          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </div>

                      <div className="flex-1">
                        <SaleItemSummary items={order.sale_items} sale_id={String(order.id)} />
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