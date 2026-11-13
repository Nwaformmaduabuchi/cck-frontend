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
import StockTabs from "./StockTabs";
import { toast } from "sonner";
import { StatusToast } from "./CustomerToasts";
import { useRouter } from "next/navigation";

type Message = { type: "success" | "error"; text: string } | null;

function getErrorMessage(errors: unknown) {
  if (!errors) return "Failed to create stock. Please try again.";
  if (typeof errors === "string") return errors;
  if (typeof errors === "object") return "Failed to create stock. Please review the form and try again.";
  return "Failed to create stock. Please try again.";
}

export default function CreateStockForm() {
  const router = useRouter();
  const store = useStockStore();
  const [pending, startTransition] = useTransition();

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
          title="Success" 
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
    <div className="space-y-4 w-[95%] sm:max-w-3xl lg:max-w-7xl mx-auto">
      <div className="text-grey-500 sticky top-0 z-50 border border-border rounded-lg bg-primary text-primary-foreground mt-4">
        <PageHeader
          title="Add New Stock"
          description="Create a category, add products, and register sellable variants in one flow."
          actions = {
            <StockTabs />
          }
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-5xl bg-card py-2 px-4 shadow-sm rounded-sm">
        <Surface>
          <label className={labelClass} htmlFor="category-name">
            Category name {" "} <span className="text-rose-500">*</span>
          </label>
          <input
            id="category-name"
            type="text"
            required
            className={inputClass}
            placeholder="e.g. Summer Collection"
            value={store.category.name}
            onChange={(event) => store.setCategoryName(event.target.value)}
          />
        </Surface>

        <div  className="">
          {store.products.map((product, productIndex) => (
            <Surface key={product.id}>
              <div className="flex gap-2 py-2 sm:items-center sm:justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className=" items-center justify-center rounded-lg ">
                    <Box className="size-4" />
                  </span>
                  <div>
                    <h2 className="font-heading text-base font-semibold text-nowrap">
                      Product {productIndex + 1}
                    </h2>
                  </div>
                </div>

                {store.products.length > 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    className="w-full sm:w-auto"
                    onClick={() => store.removeProduct(product.id)}
                  >
                    <Trash2 className="size-4" />
                    Remove
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor={`product-name-${product.id}`}>
                      Product name {" "} <span className="text-rose-500">*</span>
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

                <div className=" pt-5 flex flex-col">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ">
                    <div className="flex items-center gap-2">
                      <Layers className="size-4" />
                      <h3 className="font-heading text-sm font-semibold">Variants</h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {product.variants.map((variant, variantIndex) => (
                      <div
                        key={variant.id}
                        className="grid grid-cols-1 gap-4 rounded-lg  p-2 md:grid-cols-2 xl:grid-cols-[1fr_1fr_0.8fr_0.8fr_0.9fr_0.9fr_auto]"
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
                            Color {" "} <span className="text-rose-500">*</span>
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
                            Product type {" "} <span className="text-rose-500">*</span>
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
                            Size {" "} <span className="text-rose-500">*</span>
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
                            Quantity {" "} <span className="text-rose-500">*</span>
                          </label>
                          <input
                            id={`variant-qty-${variant.id}`}
                            type="number"
                            required
                            placeholder="Ex: 100"
                            min={0}
                            className={numberInputClass}
                            value={variant.quantity}
                            onChange={(event) =>
                              store.updateVariant(
                                product.id,
                                variant.id,
                                "quantity",
                                event.target.value
                              )
                            }
                          />
                        </div>

                        <div>
                          <label className={labelClass} htmlFor={`variant-price-${variant.id}`}>
                            Price {" "} <span className="text-rose-500">*</span>
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

                        <div className="flex items-end justify-end md:col-span-2 xl:col-span-1">
                          <Button
                            type="button"
                            variant="destructive"
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
                    className="mt-5 w-full sm:ml-auto sm:w-auto"
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


        <div className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={store.addProduct}>
            <Plus className="size-4" />
            Add Product
          </Button>

          <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
            {pending ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving ...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}