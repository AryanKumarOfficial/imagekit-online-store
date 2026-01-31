import React from "react";

export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Refund & Cancellation Policy</h1>

      <div className="prose prose-lg dark:prose-invert">
        <p className="text-sm opacity-70 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">No Refunds on Digital Products</h2>
          <p>
            Due to the nature of digital goods, <strong>all sales are final</strong>. Once a digital product has been purchased and the download link has been generated or accessed, we cannot offer a refund, return, or exchange.
          </p>
          <p className="mt-4">
            By purchasing a digital product from ImageKit Shop, you acknowledge and agree that you lose your right of withdrawal once the performance of the contract (delivery of the digital content) has begun.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Exceptions for Technical Issues</h2>
          <p>
            We stand by the quality of our products. Refunds may be considered <strong>only</strong> under the following circumstances:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>The product file is corrupt or technically defective.</li>
            <li>A technical issue on our end prevents you from downloading or accessing the product permanently.</li>
          </ul>
          <p className="mt-4">
            If you encounter such an issue, please contact us within 7 days of purchase. We will attempt to resolve the issue by providing a working copy of the file. If we are unable to resolve the technical issue, a refund may be issued at our sole discretion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cancellation Policy</h2>
          <p>
            As our products are delivered instantly, order cancellation is not possible once payment is completed. If you have not yet completed the payment, you may simply abandon the checkout process to cancel the order.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you believe you qualify for a refund due to a technical error, please contact our support team at: <a href="mailto:aryanak9163@gmail.com" className="link link-primary">aryanak9163@gmail.com</a>
          </p>
          <p className="mt-2">
            Please include your order ID and a detailed description of the issue.
          </p>
        </section>
      </div>
    </div>
  );
}
