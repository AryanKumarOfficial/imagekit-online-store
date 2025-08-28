"use client";

import React, {useEffect, useState} from 'react'
import {IProduct} from "@/models/Product";
import {apiClient, HTTPError} from "@/lib/api-client";
import ImageGallery from "@/app/components/section/products/ImageGallery";
import {NotificationTypes, useNotification} from "./components/Notification"



const Home = () => {
    const {showNotification} = useNotification();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            setLoading(true);
            try {
                const data = await apiClient.getProducts(controller.signal);
                setProducts(data.products);
            } catch (e: any) {
                console.error("Error fetching products", e);

                if (e.name !== "AbortError")

                    if (e instanceof HTTPError) {
                        const errorMsg = e.body?.error || "An API Error Occurred";
                        showNotification(errorMsg, NotificationTypes.ERROR);
                    } else
                        showNotification("Unknown Error Occurred", NotificationTypes.ERROR);
            } finally {
                setLoading(false);
            }
        })()
        return ()=>{
            controller.abort()
        }

    }, []);

    if (loading) {
        return <p className="text-center mt-8">Loading products...</p>
    }

    return (
        <main className={"container mx-auto px-4 py-8"}>

            <h1 className={"text-4xl font-bold mb-8"}>ImageKit Shop</h1>
            <ImageGallery products={products}/>
        </main>
    )
}
export default Home
