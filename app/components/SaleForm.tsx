"use client";

import { type SubmitEvent, useMemo, useState, useTransition } from "react";
import { Plus, ReceiptText, Save, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSale } from "@/lib/actions";
import { useSaleStore } from "@/lib/store";
import { SalePayload, ServerPayload, VariantList } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import SaleItemRow from "./SaleItemRow";
import {
  EmptyState,
  inputClass,
  labelClass,
  PageHeader,
  StatCard,
  Surface,
} from "./ui-patterns";
import { toast } from "sonner";
import { StatusToast } from "./CustomerToasts";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import { useRouter } from "next/navigation";

function normalize(value?: string | null) {
  return value?.trim().toLowerCase() ?? "";
}

const unique: ServerPayload[] = [];
const mySet = new Set();

export default function SaleForm({ variants }: { variants: VariantList[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter()
  const {
    customer_name,
    customer_phone,
    customer_address,
    seller,
    sale_items,
    setFields,
    addSaleItem,
    delSaleItem,
    updateSaleItem,
    resetSale,
  } = useSaleStore();

  const [exist, setExist] = useState({
    status: false,
    message: "",
  });
  let isSubmiting = true;

  const summary = useMemo(() => {
    return sale_items.reduce(
      (acc, item) => ({
        units: acc.units + item.quantity,
        total: acc.total + item.quantity * item.unit_price,
      }),
      { units: 0, total: 0 }
    );
  }, [sale_items]);

  const unique: ServerPayload[] = [];
  const mySet = new Set();

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
  console.log("submit function entered")
    if (!customer_name.trim()) {
      toast.error("Customer name is required.");
      return;
    }

    for (const item of sale_items) {
      if (!item.variant_name || !item.color || !item.quantity || !item.unit_price) {
        toast.error("Each sale item needs a product, color, quantity, and unit price.");
        return;
      }
    }

    const matched: ServerPayload[] = [];

    for (const item of sale_items) {

      const matchingVariant = variants.find(
        (variant) =>
          normalize(item.color) === normalize(variant.color) &&
          normalize(item.variant_name) === normalize(variant.name) &&
          normalize(item.size) === normalize(variant.size) &&
          normalize(item.product_type) === normalize(variant.product_type)
      );

      if (!matchingVariant) {
        toast.error(`No matching inventory variant found for ${item.variant_name}.`);
        return;
      }
      if (item.quantity > matchingVariant.quantity) {
        toast.error(
          `Insufficient stock for ${item.variant_name}. Available: ${matchingVariant.quantity}, Requested: ${item.quantity}.`
        );
        return;
      }

      matched.push({
        variant_id: matchingVariant.id,
        unit_price: item.unit_price,
        quantity: item.quantity,
      });
    }

    for (const x of matched) {
      console.log(matched);
      if (mySet.has(x.variant_id)) {
        isSubmiting = false;
        setExist((prev) => ({
          ...prev,
          status: true,
          message: "Duplicate item or items detected!",
        }));
        toast.error("Duplicate item or items detected!");
        break;
      } else {
        mySet.add(x.variant_id);
        unique.push(x);
        isSubmiting = true;
        setExist((prev) => ({
          ...prev,
          status: false,
          message: "",
        }));
      }
    }

    const salePayload: SalePayload = {
      customer_name: customer_name.trim(),
      customer_phone: customer_phone.trim() || undefined,
      customer_address: customer_address.trim() || undefined,
      seller: seller.trim() || undefined,
      sale_items: unique,
    };

    if (!isSubmiting) return;

    startTransition(async () => {
      try {
        console.log("submit payload", salePayload)
        const data = await createSale(salePayload);
        if (data.success) {
      toast.custom((t) => (
        <StatusToast 
          t={t} 
          status="success" 
          title="Success" 
          message={data.message} 
        />
      ));
      router.refresh()
    } else {

      toast.custom((t) => (
        <StatusToast 
          t={t} 
          status="error" 
          title="Failed" 
          errorPayload={data.error} 
        />
      ));
    }
        resetSale();
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong.";
        toast.error(message);
      }
    });
  };

  if (variants.length === 0) {
    return (
      <div className="space-y-4 w-[95%] sm:max-w-3xl lg:max-w-7xl mx-auto flex items-center justify-center text-primary-foreground">
        <EmptyState
          icon={ShoppingBag}
          title="No inventory available"
          description="Add stock before creating a sale so order items can be matched to variants."
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 w-[95%] sm:max-w-3xl lg:max-w-7xl mx-auto min-h-screen">
  <div className="sticky top-4 z-40 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl bg-primary px-4 py-2 sm:px-6 shadow-lg text-primary-foreground transition-all">
  
  <div className="flex-1 w-full">
    <PageHeader
      title="New Sale"
      description="Create a sale by selecting variants from available inventory"
    />
  </div>

 
  <Surface className="hidden sm:flex w-full sm:w-auto items-center mt-auto justify-between gap-4 rounded-lg bg-white px-2 py-1  shadow-sm border border-slate-100 dark:border-slate-800 dark:bg-slate-900">
    
    {/* Total Display */}
    <div className="flex flex-col justify-center">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
      Total
      </p>
      <p className="mt-0.5 font-heading text-lg font-extrabold text-slate-900 dark:text-slate-100 leading-none">
        {formatCurrency(summary.total)}
      </p>
    </div>

    <Button 
      type="submit" size="sm" disabled={isPending} form="sale_form" 
      className="flex items-center gap-2 rounded-md px-2 shadow-none"
    >
      {isPending ? (
        <>
          <span className="size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Processing
        </>
      ) : (
        <>
          <Save className="size-3" />
          Create Sale
        </>
      )}
    </Button>
    
  </Surface>
</div>

      <form
        id="sale_form"
        className="bg-card rounded-sm px-2 sm:px-4 lg:px-6 py-4"
        onSubmit={(event) => {
          if (!exist.status) {
            handleSubmit(event);
          } else {
            event.preventDefault();
          }
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 justify-center gap-2 sm:gap-4">
          <div className="sm:col-span-2 pb-4">
            <Surface className="mb-4">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
                  <ReceiptText className="size-4" />
                </span>
                <div>
                  <h2 className="font-heading text-base font-semibold">Customer details</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 justify-center items-center">
                <div>
                  <label className={labelClass} htmlFor="customer-name">
                    Customer name
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Amina Yusuf"
                    value={customer_name}
                    onChange={(event) => setFields("customer_name", event.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="customer-phone">
                    Phone
                  </label>
                  <input
                    id="customer-phone"
                    type="text"
                    className={inputClass}
                    placeholder="+234 800 000 0000"
                    value={customer_phone}
                    onChange={(event) => setFields("customer_phone", event.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="customer-address">
                    Address
                  </label>
                  <input
                    id="customer-address"
                    type="text"
                    className={inputClass}
                    placeholder="12 Wuse, Abuja"
                    value={customer_address}
                    onChange={(event) => setFields("customer_address", event.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="seller">
                    Seller
                  </label>
                  <input
                    id="seller"
                    type="text"
                    className={inputClass}
                    placeholder="Seller name or ID"
                    value={seller}
                    onChange={(event) => setFields("seller", event.target.value)}
                  />
                </div>
              </div>
            </Surface>

            <section className="space-y-1 flex flex-col">
              <div>
                <div>
                  <h2 className="font-heading text-base font-semibold">Order items</h2>
                </div>
              </div>

              <div className="space-y-3">
                {sale_items.map((item, index) => (
                  <SaleItemRow
                    key={item.id}
                    item={item}
                    index={index}
                    onChange={updateSaleItem}
                    onRemove={delSaleItem}
                    canRemove={sale_items.length > 0}
                    variants={variants}
                  />
                ))}
              </div>
              <div className="ml-auto mt-2">
                <Button type="button" variant="outline" onClick={addSaleItem}>
                  <Plus className="size-4" />
                  Add Item
                </Button>
              </div>
            </section>
          </div>
          <aside className="sm:col-span-1">
            <div className="space-y-2 sticky top-32 hidden sm:block">
              <StatCard label="Lines" value={sale_items.length} icon={ReceiptText} />
              <StatCard label="Units" value={summary.units} icon={ShoppingBag} tone="success" />
            </div>

            <div className="">
              <Surface className="sm:hidden bg-white sm:fixed sm:bottom-50 z-50 flex flex-col gap-2 justify-between w-full sm:h-40 sm:w-[24.25%] mx-auto shadow-sm px-3 py-2 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="mt-2 font-heading text-2xl font-semibold text-foreground">
                    {formatCurrency(summary.total)}
                  </p>
                </div>
                <Button type="submit" size="lg" disabled={isPending} className="max-w-[95%] flex items-center">
                  {isPending ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Processing
                    </>
                  ) : (
                    <>
                      <Save className="size-4" />
                      Create Sale
                    </>
                  )}
                </Button>
              </Surface>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}