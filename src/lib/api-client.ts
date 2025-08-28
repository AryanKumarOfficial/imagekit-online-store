import {ImageVariant, IProduct} from "@/models/Product";
import {Types} from "mongoose";
import {IOrder} from "@/models/Order";

type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: any,
    headers?: Record<string, string>,
    signal?: AbortSignal,
    cache?: string,
}

interface ProductsResponse {
    products: IProduct[];
}

interface ProductResponse {
    product: IProduct;
}

interface OrdersResponse {
    orders:IOrder[];
}

export type ProductFormData = Omit<IProduct, "_id">

export interface CreateOrderData {
    product_id: Types.ObjectId | string;
    variant: ImageVariant;
}

export class HTTPError extends Error {
    response: Response;
    body: any;

    constructor(response: Response, body: any) {
        super(`HTTP Error: ${response.status} ${response.statusText}`);
        this.name = "HTTPError";
        this.response = response;
        this.body = body;
    }
}

class ApiClient {
    private async fetch<T>(endpoint: string, options: FetchOptions = {},): Promise<T> {
        const {method = "GET", body, headers = {}, signal} = options;
        const getCsrfToken = () => document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1]
        const defaultHeaders: Record<string, string> = {
            "Content-Type": "application/json",
            ...headers,
        }

        if (method !== "GET") {
            const token = getCsrfToken();
            if (token) {
                defaultHeaders["X-CSRF-Token"] = token
            }
        }

        const response = await fetch(`/api${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: method !== "GET" ? JSON.stringify(body) : null,
            signal
        })

        if (!response.ok) {
            let errBody;
            try {
                errBody = await response.json();
            } catch (e) {
                console.log(e)
                errBody = await response.text();
            }
            throw new HTTPError(response, errBody);
        }

        return response.json()
    }

    async getProducts(signal: AbortSignal) {
        return this.fetch<ProductsResponse>("/products", {signal, cache: "no-store"});
    }

    async getProduct(id: string) {
        const encodedId = encodeURIComponent(id);
        return this.fetch<ProductResponse>(`/products/${encodedId}`, {cache: "no-store"});
    }

    async createProduct(data: IProduct) {
        return this.fetch<IProduct>("/products", {
            method: "POST",
            body: data
        })
    }

    async getUserOrders() {

        return this.fetch<OrdersResponse>("/orders/user", {cache: "no-store",})
    }

    async createOrder(orderData: CreateOrderData) {
        return this.fetch<{ orderId: string, amount: number }>("/orders", {
            method: "POST",
            body: orderData,
            cache: "no-store",
        })
    }
}

export const apiClient = new ApiClient();