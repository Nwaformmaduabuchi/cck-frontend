"use server"
import { CustomerType, ProductList, SaleOrder, SalesType, VariantList } from "./types";
import { redirect } from "next/navigation";
import { API_BASE_URL } from "./utils";
import { cookies } from "next/headers";

export const fetchProducts = async (): Promise<ProductList[]> => {
  const cookie = await cookies();
  const access = cookie.get('access')?.value;
  let isAuthError = false;

  try {
    const response = await fetch(`${API_BASE_URL}/list/variants/`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        cookie: `access=${access}`
      }
    });
  
    if (response.status === 401) {
      isAuthError = true;
    } else if (!response.ok) {
      return [];
    } else {
      return await response.json();
    }
  } catch (error) {
    return [];
  }

  // Next.js redirect must be outside try/catch!
  if (isAuthError) {
    redirect("/auth/login");
  }
  
  return [];
};

export const fetchPayments = async (id: string) => {
  const cookie = await cookies();
  const access = cookie.get('access')?.value;
  const url = `${API_BASE_URL}/list/payments/${id}/`;

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        cookie: `access=${access}`
      }
    });

    const data = await response.json();
    if (!response.ok) return data;

    return { success: true, data };
  } catch {
    return { success: false, status: 500, error: ["Failed to connect to the server"] };
  }
}

export const fetchSales = async (status: string): Promise<SalesType | any> => {
  const cookie = await cookies();
  const access = cookie.get('access')?.value;
  const url = `${API_BASE_URL}/list/sale/?${status}`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        cookie: `access=${access}`
      }
    });
     
    const res_data = await res.json();
    if (!res.ok) return res_data;

    return { success: true, error: [], data: res_data };
  } catch {
    return { success: false, status: 500, error: ["Connection error while fetching sales."] };
  }
};

export const Fetchhistory = async () => {
  const cookie = await cookies();
  const access = cookie.get('access')?.value;

  try {
    const res = await fetch(`${API_BASE_URL}/list/history`, {
      headers: {
        "Content-Type": "application/json",
        cookie: `access=${access}`
      },
    });

    const data = await res.json();
    if (!res.ok) return data;

    return { success: true, data };
  } catch {
    return { success: false, status: 500, error: ["Failed to fetch stock movements."] };
  }
}

export const fetchAllCustomer = async () => {
  const cookie = await cookies();
  const access = cookie.get('access')?.value;

  try {
    const response = await fetch(`${API_BASE_URL}/list/customer/`, {
      headers: {
        "Content-Type": "application/json",
        cookie: `access=${access}`
      },
      cache: "no-store",
    });
    
    const data = await response.json();
    if (!response.ok) return data;

    return { success: true, data };
  } catch (error) {
    return { success: false, status: 500, error: ["Failed to connect to the server"] };
  }
}

export const fetchCustomer = async (id: string, status?: string) => {
  const cookie = await cookies();
  const access = cookie.get('access')?.value;
  
  try {
    const query = status ? `?${status}` : "";
    const response = await fetch(`${API_BASE_URL}/list/customer/${id}/${query}`, {
      headers: {
        "Content-Type": "application/json",
        cookie: `access=${access}`
      },
      cache: "no-store",
    });
    
    const data = await response.json();
    if (!response.ok) return data;

    return { success: true, data };
  } catch (error) {
    return { success: false, status: 500, error: ["Failed to connect to the server"] };
  }
}

export const updateVariantOnServer = async (variant: VariantList) => {
  const cookie = await cookies();
  const access = cookie.get('access')?.value;
  
  try {
    const res = await fetch(`${API_BASE_URL}/create/edit/${variant.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cookie: `access=${access}`
      },
      body: JSON.stringify(variant),
    });

    const response = await res.json();
    
    if (!res.ok) return response;

    return { success: true, message: "Changes applied successfully", data: response };
  } catch (error) {
    return { success: false, status: 500, error: ["Connection Error!"] };
  }
}

export const get_user = async () => {
  const cookie = await cookies();
  const access = cookie.get('access')?.value;
  let isAuthError = false;

  try {
    const res = await fetch(`${API_BASE_URL}/users/user/`, {
      headers: {
        "Content-Type": "application/json",
        cookie: `access=${access}`
      },
    });

    if (res.status === 401) {
      isAuthError = true;
    } else {
      const response = await res.json();
      if (!res.ok) return response;
      return { success: true, data: response };
    }
  } catch (error) {
    return { success: false, status: 500, error: ["Connection Error!"] };
  }

  // Next.js redirect must be outside try/catch!
  if (isAuthError) {
    redirect("/auth/login");
  }
}