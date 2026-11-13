import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface Category {
  id?: number;
  name: string;
}

export interface Variant {
  id: string;
  color?: string;
  size?: string;
  product_type?: string;
  quantity: number;
  name: string;
  price: number | "";
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category?: number;
  variants: Variant[];
}

export interface StockState {
  category: Category;
  products: Product[];
}

export interface StockActions {
  setCategoryName: (name: string) => void;
  addProduct: () => void;
  removeProduct: (productId: string) => void;
  updateProduct: (productId: string, field: keyof Product, value: string | number) => void;
  addVariant: (productId: string) => void;
  removeVariant: (productId: string, variantId: string) => void;
  updateVariant: (productId: string, variantId: string, field: keyof Variant, value: string | number) => void;
  getPayload: () => StockState;
  reset: () => void;
}

export type StockStore = StockState & StockActions;

interface ServerVariant {
  color?: string;
  size?: string;
  quantity: number;
  price?: number;
  product_type?: string
}

interface ServerProduct {
  name: string;
  description: string;
  category?: number;
  variants: ServerVariant[];
}

interface ServerCategory {
  name: string;
}

export interface ServerStore {
  category: ServerCategory;
  products: ServerProduct[];
}

export interface VariantList {
  id: string | number;
  product_name: string;
  color?: string;
  size?: string;
  quantity: number;
  name: string
  product_type?: string;
  price?: string | number;
}
export interface ProductList {
  name:string;
  category:Category
  variants:VariantList[]
}

export interface SaleItemPayload {
  id: string;
  color: string;
  size: string;
  quantity: number;
  unit_price: number;
  product_type?: string;
  product_name: string;
  variant_name: string;
}

export interface ServerPayload {
  variant_id?: string | number;
  quantity: number;
  unit_price: number | string | undefined;
}

export interface SalePayload {
  customer_name: string;
  customer_phone?: string;
  customer_address?: string;
  seller?: string;
  sale_items: ServerPayload[];
}

export interface SaleItemForm {
  id: string;
  variant_id: string;
  quantity: string;
  unit_price: string;
}

export interface SaleBase {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  seller: string;
}

export interface SaleState extends SaleBase {
  sale_items: SaleItemPayload[];
}

export interface UpdateState {
  sale_items: SaleItemPayload[];
}

export interface SaleAction {
  setFields: <K extends keyof SaleBase>(key: K, value: SaleBase[K]) => void;
  addSaleItem: () => void;
  delSaleItem: (id: string) => void;
  updateSaleItem: (id: string, field: keyof SaleItemPayload, value: string | number) => void;
  resetSale: () => void;
}
export interface UpdateAction {
  addSaleItem: (id?:string) => void;
  delSaleItem: (id: string) => void;
  updateSaleItem: (id: string, field: keyof SaleItemPayload, value: string | number) => void;
  resetSale: () => void;
}

export type SaleStore = SaleState & SaleAction;
export type UpdateStore = UpdateState & UpdateAction;


export type MovementType = "sale" | "return" | "damaged" | "receive";

export interface HistoryVariant {
  id: number;
  color: string;
  size: string;
  product: {
    id: number;
    name: string;
  };
}

export interface SaleItem {
  id: number;
}

export interface UpdateSaleItem{
  variant_id:string | number;
  unit_price: number | string;
  quantity: number | string;
  
}



export interface SaleOrderItem {
  id: string;
  quantity: number;
  unit_price: number | string;
  variant_name?: string;
  product_type?: string;
  variant_color?: string;
  variant_size?: string;
  item_status?:string
  sale_status?:string
  product_name?:string
  remaining_amount?: number | string
  payments?:number[]
}

export interface Customer {
id: string
customer_name: string;
customer_phone?: string;
customer_address?: string;
}

export interface SaleOrder {
  id: number;
  customer: Customer;
  seller?: string;
  sale_status: string;
  total_amount: number | string;
  created_at: string;
  sale_items: SaleOrderItem[];
  outstanding_amount:number |string
}

export interface SalesType {
  success:boolean;
  error:string[];
  data:SaleOrder[];
  status?: number;
}

export interface Movement {
  id: number;
  variant: number;
  item: number;
  quantity_change: number;
  movement_type: string;
  note: string;
  created_at: string;
}

export interface StockMovement {
  id: number;
  variant: HistoryVariant;
  item: SaleItem | null;
  quantity_change: number;
  movement_type: MovementType;
  note: string | null;
  created_at: string; 
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface UpdateItem {
  id:number
  sale_items:UpdateSaleItem[]
}

export enum PaymentMethods {
  Cash = 'Cash',
  Transfer = 'Transfer',
  Debit_card = "Debit_Card",
  Other = 'Other'
}

export interface PaymentPayload {
  id:string | number,
  amount: number
  onPay: ({id, amount, method}:{id:string | number, amount:number, method?:PaymentMethods})=> Promise<void>
}

export interface History {
  id:string;
  movement_type: string
  created_at: string
}


export interface SignUpPayload {
  email: string;
  name:string;
  password:string
}

export interface CustomerType extends Customer {
  sales:SaleOrder[]
}

export interface Payment {
  id: number;
  sale: number;
  amount_paid: string;
  payment_method: string;
  created_at: string;
};

interface RefundType {
  id:string;
  amount: number;
  sale:string;
  created_at:string;
}
export interface SalePaymentType {
  id:number;
  total_payment:string;
  total_amount:string;
  outstanding_amount:string;
  sale_status:string;
  payments:Payment[]
  refunds:RefundType[]
}

export interface SponsorType {
  id: string;
  label: string;
  icon:LucideIcon
  color:string
}

export interface User {
  id: string;
  email: string;
  has_company: boolean;
}
export interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  logo: string;
  created_at: string;
}

export interface UserData{
  user: User;
  company: Company;
}
