"use client";

import {IProduct} from "@/models/Product";
import ProductCard from "./ProductCard";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Plus, LogIn } from "lucide-react";

interface ImageGalleryProps {
    products: IProduct[];
}

export default function ImageGallery({products}: ImageGalleryProps) {
    const { data: session } = useSession();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 && products?.map((product, index) => (
                <ProductCard key={product._id?.toString()} product={product} priority={index < 4}/>
            ))}

            {products.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
                    {!session ? (
                        <>
                            <p className="text-xl font-semibold mb-4 text-base-content/70">No products found</p>
                            <Link href="/login" className="btn btn-primary gap-2">
                                <LogIn className="w-4 h-4" />
                                Login to Shop
                            </Link>
                        </>
                    ) : session.user?.role === "admin" ? (
                        <>
                            <p className="text-xl font-semibold mb-4 text-base-content/70">No products found</p>
                            <Link href="/admin" className="btn btn-primary gap-2">
                                <Plus className="w-4 h-4" />
                                Add Product
                            </Link>
                        </>
                    ) : (
                        <p className="text-xl font-semibold mb-4 text-base-content/70">No products available yet</p>
                    )}
                </div>
            )}
        </div>
    );
}