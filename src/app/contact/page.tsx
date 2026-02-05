import React from "react";
import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      <div className="prose prose-lg dark:prose-invert mb-8">
        <p>
          We value your feedback and are here to assist you with any questions or concerns regarding your purchases, our products, or navigating our store.
        </p>
      </div>

      <div className="card bg-base-200 shadow-xl max-w-md">
        <div className="card-body">
          <h2 className="card-title mb-4">Get in Touch</h2>
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-primary" />
            <div>
              <p className="font-semibold">Email Us</p>
              <a href="mailto:aryanak9163@gmail.com" className="link link-primary">
                aryanak9163@gmail.com
              </a>
            </div>
          </div>
          <p className="text-sm opacity-70">
            We aim to respond to all inquiries within 24-48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
