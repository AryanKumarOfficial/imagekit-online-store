import React from "react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>

      <div className="prose prose-lg dark:prose-invert">
        <p className="mb-4">
          Welcome to <strong>ImageKit Shop</strong>, an independently operated online storefront dedicated to providing high-quality digital and image-based products.
        </p>

        <p className="mb-4">
          Our mission is to offer creators, developers, and businesses access to premium digital assets that enhance their projects. whether you are looking for stunning stock photography, specialized image assets, or digital templates, we strive to deliver excellence in every download.
        </p>

        <p className="mb-4">
          As a digital-first platform, we focus on speed, quality, and ease of access. Our integration with industry-leading technologies ensures that your experience—from browsing to purchasing and downloading—is seamless and secure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
        <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Premium high-resolution images</li>
            <li className="mb-2">Digital assets optimized for web and print</li>
            <li className="mb-2">Secure and instant delivery</li>
            <li className="mb-2">Transparent licensing options</li>
        </ul>

        <p className="mt-8">
          Thank you for choosing ImageKit Shop for your digital asset needs.
        </p>
      </div>
    </div>
  );
}
