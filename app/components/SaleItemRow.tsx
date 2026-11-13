"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SaleItemPayload, VariantList } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { labelClass, numberInputClass } from "./ui-patterns";
import { toast } from "sonner";


interface Props {
  item: SaleItemPayload;
  index: number;
  onChange: (id: string, field: keyof SaleItemPayload, value: string | number) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  variants: VariantList[];
}

const selectClass = "h-10 w-full bg-background";
 
function uniqueSorted(values: Array<string | undefined >) {
  
  return [...new Set(values.filter(Boolean) as string[])].sort((a, b) =>
    a.localeCompare(b)
  );

}

function normalize(value?: string) {
  return value?.trim().toLowerCase() ?? "";
}

export default function SaleItemRow({
  item,
  index,
  onChange,
  onRemove,
  canRemove,
  variants,
}: Props) {
  const productVariants = item.variant_name
    ? variants.filter((variant) => variant.name === item.variant_name)
    : variants;

  const colorVariants = item.color
    ? productVariants.filter((variant) => normalize(variant.color) === normalize(item.color))
    : productVariants;

  const sizeVariants = item.size
    ? colorVariants.filter((variant) => normalize(variant.size) === normalize(item.size))
    : colorVariants;
  
  const variants_name = variants.map((variant) => {
    return (
      {
        variant:variant.name,
        product:variant.product_name
      } 
    )
  });
  
  
 const products = uniqueSorted(variants.map(variant => variant.name))
  const colors = uniqueSorted(productVariants.map((variant) => variant.color));
  const sizes = uniqueSorted(colorVariants.map((variant) => variant.size));
  const productTypes = uniqueSorted(sizeVariants.map((variant) => variant.product_type));
  const lineTotal = item.quantity * item.unit_price;

  const updateField = (field: keyof SaleItemPayload, value: string | number) => {
    const nextItem = { ...item, [field]: value };
    onChange(item.id, field, value);


    if (field === "variant_name") {
      onChange(item.id, "color", "");
      onChange(item.id, "size", "");
      onChange(item.id, "product_type", "");
      onChange(item.id, "unit_price", 0);
      return;
    }

    if (field === "color") {
      onChange(item.id, "size", "");
      onChange(item.id, "product_type", "");
      onChange(item.id, "unit_price", 0);
      return;
    }

    const exactVariant = variants.find(
      (variant) =>
        normalize(variant.name) === normalize(nextItem.variant_name) &&
        normalize(variant.color) === normalize(nextItem.color) &&
        normalize(variant.size) === normalize(nextItem.size) &&
        normalize(variant.product_type) === normalize(nextItem.product_type)
    );
    if (!exactVariant) {
      return;
    }

    if (exactVariant?.price != null) {
      onChange(item.id, "unit_price", Number(exactVariant.price));
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 rounded-lg border border-border bg-card p-4 shadow-sm sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-[1fr_1fr_1fr_1fr] justify-center items-center">
      <div className="w-full">
        <label className={labelClass}>Select Variant {" "} <span className="text-rose-500">*</span></label>
        <Select
          value={`${item?.variant_name}`}
          onValueChange={(value) => updateField("variant_name", value)}
        >
          <SelectTrigger className={selectClass}>
            <SelectValue placeholder={`Item Name`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {products.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <label className={labelClass}>Select Color{" "} <span className="text-rose-500">*</span></label>
        <Select
          value={item?.color || ""}
          onValueChange={(value) => updateField("color", value)}
          disabled={!item.variant_name}
        >
          <SelectTrigger className={selectClass}>
            <SelectValue placeholder="Color" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {colors.map((color) => (
                <SelectItem key={color} value={color}>
                  {color}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <label className={labelClass}>Select Size{" "} <span className="text-rose-500">*</span></label>
        <Select
          value={item?.size || ""}
          onValueChange={(value) => updateField("size", value)}
          disabled={!item.color}
        >
          <SelectTrigger className={selectClass}>
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <label className={labelClass}>Select Type{" "} <span className="text-rose-500">*</span></label>
        <Select
          value={item?.product_type || ""}
          onValueChange={(value) => updateField("product_type", value)}
          disabled={!item.variant_name}
        >
          <SelectTrigger className={selectClass}>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {productTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <label className={labelClass}>Qty{" "} <span className="text-rose-500">*</span></label>
        <input
          type="number"
          min={1}
          placeholder="0.00"
          value={item.quantity === 0 ? "" : item.quantity}
          onChange={(event) =>
            onChange(item.id, "quantity", Number.parseInt(event.target.value, 10) || 0)
          }
          className={numberInputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Unit price{" "} <span className="text-rose-500">*</span></label>
        <input
          type="number"
          min={0}
          placeholder="0.00"
          value={item?.unit_price === 0 ? "" : item?.unit_price}
          onChange={(event) =>
            onChange(item.id, "unit_price", Number.parseFloat(event.target.value) || 0)
          }
          className={numberInputClass}
        />
      </div>

      <div className="w-full">
        <label className={labelClass}>Line total</label>
        <div className="flex h-10 items-center rounded-lg border border-border bg-secondary px-3 text-sm font-semibold">
          {formatCurrency(lineTotal)}
        </div>
      </div>

      <div className="justify-self-center ml-auto sm:self-end">
        <Button
          type="button"
          onClick={() => onRemove(item.id)}
          disabled={!canRemove}
          variant="outline"
          size="icon"
          aria-label={`Remove item ${index + 1}`}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}
