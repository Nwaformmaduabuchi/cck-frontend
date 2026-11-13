'use server';

import { revalidatePath } from 'next/cache';
import { ServerStore, SalePayload, SaleOrderItem, UpdateItem, PaymentMethods, SignUpPayload } from './types';
import { redirect } from 'next/navigation';
import { LoginFormValues } from './zod';
import { cookies } from 'next/headers';
import { API_BASE_URL } from './utils';

export async function createStockAction(payload: ServerStore) {
  const cookie = await cookies();
  const access = cookie.get('access')?.value;
  try {
    const response = await fetch(`${API_BASE_URL}/create/stock/`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        cookie: `access=${access}`
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) return data;

    revalidatePath('/overview'); 
    return { success: true, data: data, errors: null };
  } catch {
    return { success: false, status: 500, error: ['Failed to connect to the API server.'] };
  }
}

export async function createSale(payload: SalePayload) {
  console.log("payload received", payload)
  const cookie = await cookies();
  const access = cookie.get('access')?.value;
  try {
    const res = await fetch(`${API_BASE_URL}/create/sale/`, {
      cache: 'no-store',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: `access=${access}`
      },
      body: JSON.stringify(payload),
    });
    
    const data = await res.json();
    if (!res.ok) return data;
    
    revalidatePath('/overview/pendingsales');
    return { success: true, message: "Sale Created Successfully", data };
  } catch {
    return { success: false, status: 500, error: ['Connection error!'] };
  }
}

export async function del_sale_action(id: string) {
  const cookie = await cookies();
  const access = cookie.get('access')?.value;
  try {
    const res = await fetch(`${API_BASE_URL}/list/del/${id}/`, {
      cache: 'no-store',
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        cookie: `access=${access}`
      }
    });
      
    if (!res.ok) {
      const data = await res.json();
      return data;
    }
    
    revalidatePath("/overview/pendingsale");
    return { success: true, message: "Item deleted successfully" };
  } catch {
    return { success: false, status: 500, error: ['Connection error!'] };
  }
}

export async function del_variant_action(id: string) {
  const cookie = await cookies();
  const access = cookie.get('access')?.value;
  try {
    const res = await fetch(`${API_BASE_URL}/list/variants/${id}/`, {
      cache: 'no-store',
      method: "DELETE",
      headers: {
        cookie: `access=${access}`
      }
    });
      
    if (!res.ok) {
      const data = await res.json();
      return data;
    }
    
    revalidatePath("/overview/stock");
    return { success: true, message: "Item deleted successfully" };
  } catch {
    return { success: false, status: 500, error: ['Connection error!'] };
  }
}

export async function patchAction(id: string, data: Partial<SaleOrderItem>) {
  const cookie = await cookies();
  const access = cookie.get('access')?.value;
  try {
    const res = await fetch(`${API_BASE_URL}/list/patch/${id}/`, {
      cache: 'no-store',
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cookie: `access=${access}`
      },
      body: JSON.stringify(data),
    });
    
    const res_data = await res.json();
    if (!res.ok) return res_data;

    revalidatePath("/overview/sales");
    return { success: true, message: "Update Successful", data: res_data };
  } catch {
    return { success: false, status: 500, error: ['Connection error!'] };
  }
}

export async function update_sale(updatePayload: UpdateItem) {
  const cookie = await cookies();
  const access = cookie.get('access')?.value;
  try {
    const res = await fetch(`${API_BASE_URL}/list/update/`, {
      cache: 'no-store',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: `access=${access}`
      },
      body: JSON.stringify(updatePayload),
    });

    const res_data = await res.json();
    if (!res.ok) return res_data;

    revalidatePath("/overview/sales");
    return { success: true, message: "Sale Updated Successfully", data: res_data };
  } catch {
    return { success: false, status: 500, error: ['Connection error!'] };
  }
}

export async function payment_action(payload: { id: string | number, amount: number, method?: PaymentMethods }, uuid: string) {
  const cookie = await cookies();
  const access = cookie.get('access')?.value;
  try {
    const res = await fetch(`${API_BASE_URL}/create/sale/${payload.id}/pay/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: `access=${access}`,
        "X-UUID": uuid
      },
      body: JSON.stringify(payload)
    });

    const res_data = await res.json();
    if (!res.ok) return res_data;

    revalidatePath("/overview/sales", "layout"); 
    return { success: true, message: "Payment Successful", data: res_data };
  } catch {
    return { success: false, status: 500, error: ['Connection error!'] };
  }
}

export const register_company_action = async (data: FormData) => {
  const cookie = await cookies();
  const access = cookie.get('access')?.value;
  
  try {
    const response = await fetch(`${API_BASE_URL}/users/register/company/`, {
      method: "POST",
      headers: {
        cookie: `access=${access}`
      },
      body: data,
    });
    
    if (!response.ok) {
      const res_data = await response.json();
      return res_data;
    }
  } catch {
    return { success: false, status: 500, error: ['Connection error!'] };
  }
  
  redirect("/overview");
};

export const user_login_action = async (data: LoginFormValues) => {
  let res_data;
  try {
    const res = await fetch(`${API_BASE_URL}/users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    res_data = await res.json()
    if (!res.ok) {
      return { success: false, status: 401, error: ["Account does not exist please Sign up"] }
    }
  } catch {
    return { success: false, status: 500, error: ['Sorry server cannot be reached!'] };
  }
  
  // Set Cookies and redirect outside try/catch
  const cookie = await cookies();
  const isProd = process.env.NODE_ENV === "production";
  const path = res_data.has_company ? "/overview" : "/";

  cookie.set("access", res_data['access'], {
    httpOnly: true, secure: isProd, sameSite: "lax", path, maxAge: 60 * 60 * 5 
  });
  cookie.set("refresh", res_data['refresh'], {
    httpOnly: true, secure: isProd, sameSite: "lax", path: res_data.has_company ? "/" : "/overview", maxAge: 60 * 60 * 24 * 7,
  });

  if (res_data.has_company) {
    redirect("/overview");
  } else {
    redirect("/register");
  }
} 

export const user_register_action = async (data: SignUpPayload) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      const res_data = await res.json();
      return res_data;
    }
  } catch {
    return { success: false, status: 500, error: ['Connection error!'] };
  }
  
  redirect("/auth/login");
}

export const user_logout_action = async () => {
  const cookie = await cookies();
  const access = cookie.get("access")?.value;
  const refresh = cookie.get("refresh")?.value;
  
  try {
    const res = await fetch(`${API_BASE_URL}/users/logout/`,{
      method: "POST",
      cache: "no-store",
      headers: {
        cookie: `access=${access};refresh=${refresh}`
      },
    });

    if (!res.ok) {
      const res_data = await res.json();
      return res_data;
    }
  } catch {
    
    console.error("Logout network failure, clearing local session anyway.");
  }

  cookie.delete("access");
  cookie.delete("refresh");
  redirect("/");
}

type ReceiptDownloadResult =
  | { success: true; filename: string; contentType: string; data: string; message: string; }
  | any;

export async function get_receipt(id: string | number, uuid: string): Promise<ReceiptDownloadResult> {
  const cookie = await cookies();
  const access = cookie.get('access')?.value;
  
  try {
    const res = await fetch(`${API_BASE_URL}/create/sale/${id}/receipt/`, {
      method: 'POST',
      cache: "no-store",
      headers: {
        cookie: `access=${access}`,
        "X-UUID": uuid
      },
    });

    if (!res.ok) {
      return await res.json();
    }

    const contentType = res.headers.get("content-type") ?? "";
    const contentDisposition = res.headers.get("content-disposition") ?? "";
    const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/i);
    const buffer = Buffer.from(await res.arrayBuffer());

    if (!contentType.includes("application/pdf") || buffer.subarray(0, 4).toString() !== "%PDF") {
      return { success: false, status: 500, error: ["The server did not return a valid PDF receipt."] };
    }

    return {
      success: true,
      filename: fileNameMatch?.[1] ?? `sales_receipt_${id}.pdf`,
      contentType: "application/pdf",
      data: buffer.toString("base64"),
      message: "Receipt created for this sale"
    };
  } catch {
    return { success: false, status: 500, error: ["Connection error!"] };
  }
}
