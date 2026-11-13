"use client";

import { type SubmitEvent, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Plus,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { update_sale } from "@/lib/actions";
import { createEmptySaleItem } from "@/lib/store";
import {
  SaleItemPayload,
  UpdateItem,
  UpdateSaleItem,
  VariantList,
} from "@/lib/types";

import SaleItemRow from "./SaleItemRow";
import { EmptyState } from "./ui-patterns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { StatusToast } from "./CustomerToasts";

type Status = {
  status: string;
  message: string;
};

function normalize(value?: string | null) {
  return value?.trim().toLowerCase() ?? "";
}

export default function UpdateSale({
  variants,
  id,
}: {
  variants: VariantList[];
  id: number;
}) {
  const router = useRouter();

  const [sale_items, setSale_item] = useState<SaleItemPayload[]>([]);

  const [status, setStatus] = useState<Status | null>(null);

  const [loading, setLoading] = useState(false);

  const addSaleItem = () => {
    setSale_item((prev) => [
      ...prev,
      createEmptySaleItem(),
    ]);
  };

  const delSaleItem = (id: string) => {
    setSale_item((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const resetSaleItem = () => {
    setSale_item([]);
  };

  const updateSaleItem = (
    id: string,
    field: keyof SaleItemPayload,
    value: string | number
  ) => {
    setSale_item((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const summary = useMemo(() => {
    return sale_items.reduce(
      (acc, item) => ({
        units: acc.units + item.quantity,
        total:
          acc.total +
          item.quantity * item.unit_price,
      }),
      {
        units: 0,
        total: 0,
      }
    );
  }, [sale_items]);

  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setStatus(null);

    for (const item of sale_items) {
      console.log("update payload",item)
      if (
        !item.variant_name ||
        !item.color ||
        !item.quantity ||
        !item.unit_price
      ) {
        setStatus({
          status: "failed",
          message:
            "Each sale item needs a product, color, quantity, and unit price.",
        });

        return;
      }
    }

    const matched: UpdateSaleItem[] = [];

    for (const item of sale_items) {
      const matchingVariant = variants.find(
        (variant) =>
          normalize(item.color) === normalize(variant.color) &&
          normalize(item.variant_name) ===
            normalize(variant.name) &&
          normalize(item.size) === normalize(variant.size) &&
          normalize(item.product_type) ===
            normalize(variant.product_type)
      );

      if (!matchingVariant) {
        setStatus({
          status: "failed",
          message: `No matching inventory variant found for ${item.product_name}.`,
        });

        return;
      }

      matched.push({
        variant_id: matchingVariant.id,
        unit_price: item.unit_price,
        quantity: item.quantity,
      });
    }

    const update_payload: UpdateItem = {
      id,
      sale_items: matched,
    };

    try {
      setLoading(true);

      const res = await update_sale(update_payload);

      if (res.success) {
             toast.custom((t) => (
               <StatusToast
                 t={t} 
                 status="success" 
                 title="Success" 
                 message={res.message} 
               />
             ));
           } else {
             
             toast.custom((t) => (
               <StatusToast 
                 t={t} 
                 status="error" 
                 title="Failed" 
                 errorPayload={res.error} 
               />
             ));
           }

      resetSaleItem();

      router.refresh();

    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong.";

      setStatus({
        status: "error",
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (variants.length === 0) {
    return (
      <div>
        <EmptyState
          icon={ShoppingBag}
          title="No inventory available"
          description="Add stock before creating a sale so order items can be matched to variants."
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>

      {status && (
        <div
          className={`mb-5 flex items-start gap-3 rounded-lg border px-4 py-3 text-sm font-medium ${
            status.status === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          {status.status === "success" ? (
            <CheckCircle2 className="mt-0.5 size-4" />
          ) : (
            <AlertCircle className="mt-0.5 size-4" />
          )}

          <span>{status.message}</span>
        </div>
      )}

      <div className="flex flex-col space-y-4">

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

        <div className="flex items-center">
          {sale_items.length > 0 && (
            <Button
              type="submit"
              disabled={loading}
              className="flex-start"
            >
              {loading ? "Saving..." : "Add to Sale"}
            </Button>
          )}

          <Button
            type="button"
            className="ml-auto"
            variant="outline"
            onClick={addSaleItem}
            disabled={loading}
          >
            <Plus className="size-4" />
            Add Item
          </Button>
        </div>

      </div>
    </form>
  );
}