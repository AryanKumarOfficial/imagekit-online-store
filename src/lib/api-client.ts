import {ImageVariant, IProduct} from "@/models/Product";
import {Types} from "mongoose";
import {IOrder} from "@/models/Order";

type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: any,
    headers?: Record<string, string>,
}

export type ProductFormData = Omit<IProduct, "_id">

export interface CreateOrderData {
    productId: Types.ObjectId | string;
    Variant: ImageVariant;
}

class ApiClient {
    private async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
        const {method = "GET", body, headers = {}} = options;

        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers,
        }

        const response = await fetch(endpoint, {
            method,
            headers: defaultHeaders,
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return response.json()
    }

    async getProducts() {
        return this.fetch<IProduct[]>("/products");
    }

    async getProduct(id: string) {
        return this.fetch<IProduct>(`/products/${id}`);
    }

    async createProduct(data: IProduct) {
        return this.fetch<IProduct>("/products", {
            method: "POST",
            body: data
        })
    }

    async getUserOrders() {
        return this.fetch<IOrder[]>("/orders/user")
    }

    async createOrder(orderData:CreateOrderData){
        const sanitizedOrderData = {
            ...orderData,
            productId: orderData.productId.toString(),
        }

        return this.fetch<{orderId:string,amount:number}>("/orders", {
            method: "POST",
            body: sanitizedOrderData,
        })
    }
}

export const apiClient = new ApiClient();