// useStockStore.ts
import { create } from 'zustand';
import { Product, SaleItemPayload, SaleOrder, SaleState, SaleStore, StockState, StockStore, Variant } from './types';




// Helper to generate temporary IDs for React keys

let counter = 0
const generateId =()=> `${counter++}`;
export const createEmptyVariant = (): Variant => ({
  id: generateId(),
  name: '',
  color: '',
  size: '',
  quantity: Number(""),
  product_type: "",
  price: "",
});

const createEmptyProduct = (): Product => ({
  id: generateId(),
  name: '',
  description: '',
  variants: [createEmptyVariant()],
});

const createInitialStockState = (): StockState => ({
  category: { name: '' },
  products: [],
});

export const useStockStore = create<StockStore>((set, get) => ({
  ...createInitialStockState(),
  setCategoryName: (name) =>
    set((state) => ({ category: { ...state.category, name } })),

  addProduct: () =>
    set((state) => ({
      products: [...state.products, createEmptyProduct()],
    })),

  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    })),

  updateProduct: (productId, field, value) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === productId ? { ...p, [field]: value } : p
      ),
    })),

  addVariant: (productId) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === productId
          ? { ...p, variants: [...p.variants, createEmptyVariant()] }
          : p
      ),
    })),

  removeVariant: (productId, variantId) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === productId
          ? { ...p, variants: p.variants.filter((v) => v.id !== variantId) }
          : p
      ),
    })),

  updateVariant: (productId, variantId, field, value) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === productId
          ? {
              ...p,
              variants: p.variants.map((v) =>
                v.id === variantId ? { ...v, [field]: value } : v
              ),
            }
          : p
      ),
    })),

  getPayload: () => {
    const state = get();
    return {
      category: state.category,
      products: state.products,
    };
  },

  reset: () => set(createInitialStockState()),
}));

export const createEmptySaleItem = (): SaleItemPayload => ({
  id: generateId(),
  color: "",
  size: "",
  variant_name:"",
  product_name:"",
  quantity: 0,
  unit_price: 0,
  product_type: "",
});

const initialSale: SaleState = {
  customer_name: "",
  customer_phone: "",
  customer_address: "",
  seller: "",
  sale_items: [createEmptySaleItem()],
};

export const useSaleStore = create<SaleStore>((set) => ({
  ...initialSale,

  // updates a single field on the customer/sale header
  setFields: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),

  // adds a new empty sale item row
  addSaleItem: () => {
  set((state) => ({
      sale_items: [...state.sale_items, createEmptySaleItem()],
    }));
},
  // removes a sale item row by id
  delSaleItem: (id) =>
    set((state) => ({
      sale_items: state.sale_items.filter((item) => item.id !== id),
    })),

  // updates a single field on a specific sale item
  updateSaleItem: (id, field, value) =>
    set((state) => ({
      sale_items: state.sale_items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    })),

  resetSale: () =>
    set({
      ...initialSale,
      sale_items: [createEmptySaleItem()],
    }),
}));

