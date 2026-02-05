
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-base-300 text-base-content">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">ImageKit Shop</h3>
            <p className="text-sm opacity-70 max-w-xs">
              Your premier destination for high-quality digital assets and image-based products.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="link link-hover">Home</Link>
              </li>
              <li>
                <Link href="/about" className="link link-hover">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="link link-hover">Contact Us</Link>
              </li>
              <li>
                <Link href="/orders" className="link link-hover">My Orders</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="link link-hover">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="link link-hover">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/refund-policy" className="link link-hover">Refund Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider my-8"></div>

        <div className="text-center text-sm opacity-70">
          <p>&copy; {new Date().getFullYear()} ImageKit Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
