"use client";

import React, {useEffect, useState} from 'react'
import {IProduct} from "@/models/Product";
import {apiClient} from "@/lib/api-client";
import ImageGallery from "@/app/components/section/products/ImageGallery";

const Home = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    useEffect(() => {
        (async () => {
            try {
                const data = await apiClient.getProducts();
                setProducts(data);
            } catch (e) {
                console.error("Error fetching products", e);
            }
        })()
    }, []);
    return (
        <main className={"container mx-auto px-4 py-8"}>

            <h1 className={"text-4xl font-bold mb-8"}>ImageKit Shop</h1>
            <ImageGallery products={products}/>
        </main>
    )
}
export default Home
