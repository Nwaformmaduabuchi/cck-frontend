"use client";

import { type SubmitEvent, useState, useTransition } from "react";
import { Box, Layers, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createStockAction } from "@/lib/actions";
import { useStockStore } from "@/lib/store";
import {
  inputClass,
  labelClass,
  numberInputClass,
  PageHeader,
  Surface,
} from "./ui-patterns";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductList } from "@/lib/types";
import { StatusToast } from "./CustomerToasts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const selectClass = "h-10 w-full bg-background";


export default function AddProductForm({products}:{products:ProductList[]}) {
  const router = useRouter()
  const store = useStockStore();
  const [pending, startTransition] = useTransition();
  
console.log(products)
  const categories = [
  ...new Map(
    products.map((p) => [p.category.id, p.category])
  ).values(),
];
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      category: store.category,
      products: store.products.map((product) => ({
        name: product.name,
        description: product.description,
        variants: product.variants.map((variant) => ({
          name: variant.name,
          color: variant.color,
          size: variant.size,
          product_type: variant.product_type,
          quantity: Number(variant.quantity),
          price: Number(variant.price || 0),
        })),
      })),
    };

    startTransition(async () => {
      const res = await createStockAction(payload);

      if (res.success) {
      toast.custom((t) => (
        <StatusToast 
          t={t} 
          status="success" 
          title="Product Added Successfully" 
          message={res.message} 
        />
      ));
      router.refresh()
    } else {
      
      toast.custom((t) => (
        <StatusToast 
          t={t} 
          status="error" 
          title="Update Failed" 
          errorPayload={res.error} 
        />
      ));
    }
    });
  };

  return (
    <div className="space-y-4 w-[95%] sm:max-w-3xl lg:max-w-7xl mx-auto ">
      <div className="text-grey-300 sticky top-0 z-30 border border-border rounded-lg bg-primary text-primary-foreground mt-4">
      <PageHeader
        title="Add Product"
        description="Create a category, add products, and register sellable variants in one flow."
        
      />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-card py-2 px-4 shadow-sm rounded-sm">
        <Surface className="p-5">
          <label className={labelClass} htmlFor="category-name">
            Select Category
          </label>
          <Select
            value={store.category.name}
            onValueChange={(value) => store.setCategoryName(value)}
            >
                <SelectTrigger className={selectClass}>
                <SelectValue placeholder="Categories" />
                </SelectTrigger>
                <SelectContent>
                <SelectGroup>
                    {categories?.map(c=>
                    <SelectItem key={`${c.id}-${c.name}`} value={c.name}>
                    {c.name}
                    </SelectItem>       
                    )}
                </SelectGroup>
                </SelectContent>
                </Select>
        </Surface>

        <div className="space-y-5">
          {store.products.map((product, productIndex) => (
            <Surface key={product.id} className="overflow-hidden">
              <div className="flex flex-col gap-3 border-b border-border bg-secondary/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-card text-primary ring-1 ring-border">
                    <Box className="size-4" />
                  </span>
                  <div>
                    <h2 className="font-heading text-base font-semibold">
                      Product {productIndex + 1}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Name, description, and available variants
                    </p>
                  </div>
                </div>

                {store.products.length > 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => store.removeProduct(product.id)}
                  >
                    <Trash2 className="size-4" />
                    Remove
                  </Button>
                )}
              </div>

              <div className="space-y-6 p-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor={`product-name-${product.id}`}>
                      Product name
                    </label>
                    <input
                      id={`product-name-${product.id}`}
                      required
                      className={inputClass}
                      value={product.name}
                      placeholder="e.g. Classic T-shirt"
                      onChange={(event) =>
                        store.updateProduct(product.id, "name", event.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor={`product-description-${product.id}`}>
                      Description
                    </label>
                    <input
                      id={`product-description-${product.id}`}
                      className={inputClass}
                      value={product.description}
                      placeholder="Optional product detail"
                      onChange={(event) =>
                        store.updateProduct(product.id, "description", event.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="border-t border-border pt-5 flex flex-col">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <Layers className="size-4 text-primary" />
                      <h3 className="font-heading text-sm font-semibold">Variants</h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {product.variants.map((variant, variantIndex) => (
                      <div
                        key={variant.id}
                        className="grid grid-cols-1 gap-4 rounded-lg border border-border bg-background p-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_0.8fr_0.8fr_0.9fr_0.9fr_auto]"
                      >
                      <div>
                        <label className={labelClass} htmlFor={`variant-name-${variant.id}`}>
                         Name {" "} <span className="text-rose-500">*</span>
                            </label>
                        <input
                          id={`variant-name-${variant.id}`}
                            required
                            className={inputClass}
                            placeholder="name"
                            value={variant.name}
                            onChange={(event) =>
                            store.updateVariant(product.id, variant.id, "name", event.target.value)
                            }
                            />
                        </div>
                        <div>
                          <label className={labelClass} htmlFor={`variant-color-${variant.id}`}>
                            Color
                          </label>
                          <input
                            id={`variant-color-${variant.id}`}
                            required
                            className={inputClass}
                            placeholder="Black"
                            value={variant.color}
                            onChange={(event) =>
                              store.updateVariant(product.id, variant.id, "color", event.target.value)
                            }
                          />
                        </div>

                        <div>
                          <label className={labelClass} htmlFor={`variant-type-${variant.id}`}>
                            Product type
                          </label>
                          <input
                            id={`variant-type-${variant.id}`}
                            required
                            className={inputClass}
                            placeholder="Retail"
                            value={variant.product_type}
                            onChange={(event) =>
                              store.updateVariant(
                                product.id,
                                variant.id,
                                "product_type",
                                event.target.value
                              )
                            }
                          />
                        </div>

                        <div>
                          <label className={labelClass} htmlFor={`variant-size-${variant.id}`}>
                            Size
                          </label>
                          <input
                            id={`variant-size-${variant.id}`}
                            className={inputClass}
                            placeholder="L"
                            value={variant.size}
                            onChange={(event) =>
                              store.updateVariant(product.id, variant.id, "size", event.target.value)
                            }
                          />
                        </div>

                        <div>
                          <label className={labelClass} htmlFor={`variant-qty-${variant.id}`}>
                            Quantity
                          </label>
                          <input
                            id={`variant-qty-${variant.id}`}
                            type="number"
                            required
                            min={0}
                            className={numberInputClass}
                            value={variant.quantity}
                            onChange={(event) =>
                              store.updateVariant(
                                product.id,
                                variant.id,
                                "quantity",
                                Number(event.target.value)
                              )
                            }
                          />
                        </div>

                        <div>
                          <label className={labelClass} htmlFor={`variant-price-${variant.id}`}>
                            Price
                          </label>
                          <input
                            id={`variant-price-${variant.id}`}
                            type="number"
                            step="1"
                            min={0}
                            className={numberInputClass}
                            value={variant.price}
                            placeholder="Optional"
                            onChange={(event) =>
                              store.updateVariant(
                                product.id,
                                variant.id,
                                "price",
                                event.target.value === "" ? "" : Number(event.target.value)
                              )
                            }
                          />
                        </div>

                        <div className="flex items-end">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            disabled={product.variants.length < 1}
                            onClick={() => store.removeVariant(product.id, variant.id)}
                            aria-label={`Remove variant ${variantIndex + 1}`}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                      type="button"
                      variant="outline"
                      className="mt-5 ml-auto"
                      onClick={() => store.addVariant(product.id)}
                    >
                      <Plus className="size-4" />
                      Add Variant
                    </Button>
                </div>
              </div>
            </Surface>
          ))}
        </div>


        <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <Button type="button" variant="outline" onClick={store.addProduct}>
            <Plus className="size-4" />
            Add Product
          </Button>

          <Button type="submit" size="lg" disabled={pending}>
            {pending ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving stock
              </>
            ) : (
              <>
                <Save className="size-4" />
                Save Product
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}