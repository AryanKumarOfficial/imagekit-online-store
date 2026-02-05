import React from "react";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>

      <div className="prose prose-lg dark:prose-invert">
        <p className="text-sm opacity-70 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using ImageKit Shop, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Nature of Services</h2>
          <p>
            ImageKit Shop is an online platform providing digital products, specifically image-based assets. All products are delivered electronically via download immediately upon successful payment.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
          <p>You agree to:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Provide accurate and complete information when making a purchase.</li>
            <li>Maintain the confidentiality of your account credentials.</li>
            <li>Use the downloaded products in accordance with the specific license purchased (e.g., Personal or Commercial).</li>
            <li>Not redistribute or resell the digital assets unless explicitly permitted by the license.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Payments and Pricing</h2>
          <p>
            All prices are listed in Indian Rupees (INR). We reserve the right to change prices at any time without prior notice. Payments are processed securely via Razorpay.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
          <p>
            All content, including images, text, and digital assets, is the property of ImageKit Shop or its content suppliers and is protected by copyright laws. Purchasing a product grants you a license to use it, not ownership of the original asset.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
          <p>
            ImageKit Shop shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use our products or services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of India.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
          <p>
            For any questions regarding these Terms, please contact us at: <a href="mailto:aryanak9163@gmail.com" className="link link-primary">aryanak9163@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
