import Link from "next/link";
import {
  AlertTriangle,
  Boxes,
  CircleDollarSign,
  Package,
  PackagePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductList, VariantList } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { EmptyState, PageHeader, StatCard } from "./ui-patterns";
import EditModal from "./EditModal";
import DelModal from "./DelModal";

// ==========================================
// Stock Color & Label Helpers
// ==========================================
function getStockStyles(quantity: number) {
  if (quantity === 0) {
    return {
      badge: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400 border border-red-200 dark:border-red-500/30",
      dot: "bg-red-500 animate-pulse",
      bar: "bg-red-500",
      label: "Out of stock",
    };
  }
  if (quantity < 10) {
    return {
      badge: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30",
      dot: "bg-amber-500",
      bar: "bg-amber-500",
      label: `${quantity} low stock`,
    };
  }
  return {
    badge: "bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-400 border border-green-200 dark:border-green-500/30",
    dot: "bg-green-500",
    bar: "bg-green-500",
    label: `${quantity} in stock`,
  };
}


function InventoryCard({ variant }: { variant: VariantList }) {
  const price = Number(variant.price ?? 0);
  const value = price * Number(variant.quantity ?? 0);
  const stock = getStockStyles(Number(variant.quantity ?? 0));

  return (
    <article className="group relative rounded-xl border border-border bg-background px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-500/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-400/50">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="line-clamp-2 font-heading text-base font-semibold text-slate-900 group-hover:text-sky-600 dark:text-slate-100 dark:group-hover:text-sky-400 transition-colors">
            {`${variant.name} - ${variant.product_name}`}
          </h2>
          {variant.product_type && (
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {variant.product_type || "General stock"}
            </p>
          )}
        </div>

        <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium shadow-2xs ${stock.badge}`}>
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${stock.dot}`} />
          {stock.label}
        </span>
      </div>

      {(variant.color || variant.size) && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {variant.color && (
            <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {variant.color}
            </span>
          )}
          {variant.size && (
            <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Size: {variant.size}
            </span>
          )}
        </div>
      )}

      
      <div className="mt-5 flex items-end justify-between gap-4 border-t border-slate-100 pt-4 dark:border-slate-800/80">
        <dl className="flex flex-wrap gap-4 sm:gap-6 text-sm">
          <div>
            <dt className="text-xs text-slate-500 dark:text-slate-400">Unit price</dt>
            <dd className="mt-0.5 font-mono text-sm font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(price)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500 dark:text-slate-400">Stock value</dt>
            <dd className="mt-0.5 font-mono text-sm font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(value)}
            </dd>
          </div>
        </dl>

        {/* Action Modals - Edit & Delete */}
        <div className="flex shrink-0 items-center gap-2">
          <EditModal variant={variant} />
          <DelModal variantId={variant.id} />
        </div>
      </div>
    </article>
  );
}


export default async function ProductLists({ products }: { products: ProductList[] }) {
  
  const variants: VariantList[] = products.flatMap(p => p.variants || []);

  const totalUnits = variants.reduce((sum, item) => sum + Number(item.quantity ?? 0), 0);
  const lowStock = variants.filter((item) => Number(item.quantity ?? 0) > 0 && Number(item.quantity ?? 0) < 10).length;
  const inventoryValue = variants.reduce(
    (sum, item) => sum + Number(item.price ?? 0) * Number(item.quantity ?? 0),
    0
  );

  return (
    
    <div className="min-h-screen bg-background/60 space-y-6 w-full px-4 sm:px-6 lg:px-8">
      
      
      <div className="sticky top-0 z-30 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-4 bg-background/80 backdrop-blur-md">
        <div className="shadow-sm bg-primary text-primary-foreground rounded-lg overflow-hidden">
          <PageHeader
            title="Stocks"
            description="Monitor variants, stock levels, and retail value from one workspace."
            actions={
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full sm:w-auto border-sky-300 bg-white text-sky-700 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-700 dark:border-sky-700 dark:bg-sky-900 dark:text-sky-200 dark:hover:border-sky-400 dark:hover:bg-sky-950/50 dark:hover:text-sky-300"
                >
                  <Link href="/overview/stock" className="flex items-center justify-center gap-2">
                    <PackagePlus className="size-4 text-sky-500 dark:text-sky-400" />
                    <span>Add Stock</span>
                  </Link>
                </Button>
              </div>
            }
          />
        </div>
      </div>

      <div className="w-full">
        
        <div className="grid auto-rows-min gap-4 grid-cols-3 lg:grid-cols-4">
          <StatCard label="Total Items" value={variants.length} icon={Boxes} />
          <StatCard label="Units in Stock" value={totalUnits} icon={Package} tone="success" />
          <StatCard label="Low Stocks" value={lowStock} icon={AlertTriangle} tone="warning" />
          <span className="hidden lg:inline">
            <StatCard label="Total Value" value={formatCurrency(inventoryValue)} icon={CircleDollarSign} />
          </span>
          
        </div>

        
        <div className="mt-8">
          {variants.length > 0 ? (
            <div className="w-full">
              
             
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
                {variants.map((variant) => (
                  <InventoryCard key={variant.id} variant={variant} />
                ))}
              </div>

              
              <div className="hidden md:block w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <table className="w-full text-left border-collapse min-w-200">
                  
                 
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/75 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
                      <th className="p-4">Product Name</th>
                      <th className="p-4">Product Color</th>
                      <th className="p-4">Stock Level</th>
                      <th className="p-4">Unit Price</th>
                      <th className="p-4">Total Value</th>
                      <th className="p-4 text-center">Status</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-slate-200 text-sm text-slate-900 dark:divide-slate-800 dark:text-slate-100">
                    {variants.map((variant) => {
                      const price = Number(variant.price ?? 0);
                      const quantity = Number(variant.quantity ?? 0);
                      const value = price * quantity;
                      const stock = getStockStyles(quantity);

                      return (
                        <tr 
                          key={variant.id} 
                          className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/50 group"
                        >
                         
                          <td className="py-4 px-4 font-medium">
                            <div className="font-semibold text-slate-900 group-hover:text-sky-600 dark:text-slate-100 dark:group-hover:text-sky-400 transition-colors">
                              {`${variant.name} - ${variant.product_name}`}
                            </div>
                            {(variant.product_type || variant.size) && (
                              <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                {variant.product_type && <span>{variant.product_type}</span>}
                                {variant.product_type && variant.size && <span>•</span>}
                                {variant.size && <span>Size: {variant.size}</span>}
                              </div>
                            )}
                          </td>

                          
                          <td className="py-4 px-4 text-slate-500 dark:text-slate-400">
                            {variant.color || "---"}
                          </td>

                         
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-20 h-1.5 ${quantity === 0 ? "bg-red-500" : "bg-slate-200"} rounded-full overflow-hidden dark:bg-slate-800 `}>
                                <div 
                                  className={`h-full rounded-full transition-all duration-500 ${stock.bar}`}
                                  style={{ width: `${Math.min((quantity / 100) * 100, 100)}%` }}
                                />
                              </div>
                              <span className="font-mono text-xs font-semibold">{quantity}</span>
                            </div>
                          </td>

                          
                          <td className="py-4 px-4 font-mono font-medium text-slate-600 dark:text-slate-300">
                            {formatCurrency(price)}
                          </td>

                         
                          <td className="py-4 px-4 font-mono font-semibold">
                            {formatCurrency(value)}
                          </td>

                          
                          <td className="py-4 px-4 text-right">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium shadow-2xs whitespace-nowrap ${stock.badge}`}>
                              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${stock.dot}`} />
                              {stock.label}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <span className="inline-flex items-center gap-2 cursor-pointer">
                              <EditModal variant={variant}  />
                              <DelModal variantId={variant.id} />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          ) : (
            /* Empty State */
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 sm:p-12 text-center dark:border-slate-800 dark:bg-slate-900/50 max-w-2xl mx-auto">
              <EmptyState
                icon={Package}
                title="No inventory recorded yet"
                description="Your catalog is empty. Start by adding items to begin tracking stock levels."
                action={
                  <Button asChild className="mt-4 bg-sky-600 text-white hover:bg-sky-500 w-full sm:w-auto">
                    <Link href="/overview/stock" className="inline-flex items-center justify-center gap-2">
                      <PackagePlus className="size-4" />
                      <span>Add First Product</span>
                    </Link>
                  </Button>
                }
              />
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
