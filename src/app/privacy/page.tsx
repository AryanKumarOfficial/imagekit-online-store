import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <div className="prose prose-lg dark:prose-invert">
        <p className="text-sm opacity-70 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            ImageKit Shop ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and purchase our digital products.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <p>We collect information that you provide directly to us when you:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Register for an account</li>
            <li>Make a purchase</li>
            <li>Contact our support team</li>
          </ul>
          <p className="mt-2">This information may include your name, email address, and order details.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Payment Information</h2>
          <p>
            We do not store your financial data such as credit card numbers or bank account details. All payments are processed securely through <strong>Razorpay</strong>, our trusted payment gateway partner.
          </p>
          <p className="mt-2">
            When you make a purchase, you are redirected to Razorpay's secure checkout. Razorpay processes your payment information in accordance with their privacy policy and industry security standards (PCI-DSS).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
          <p>
            We use third-party services to operate our business effectively:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li><strong>Razorpay:</strong> For secure payment processing.</li>
            <li><strong>ImageKit:</strong> For optimizing and delivering our digital assets.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Process and deliver your orders</li>
            <li>Send order confirmations and updates</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Improve our website and product offerings</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:aryanak9163@gmail.com" className="link link-primary">aryanak9163@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
