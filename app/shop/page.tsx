"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import TrueFocus from "@/components/3d/TrueFocus";
import ContentCard from "@/components/3d/ContentCard";

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "apparel", name: "Apparel" },
    { id: "accessories", name: "Accessories" },
    { id: "collectibles", name: "Collectibles" }
  ];

  const products = [
    {
      id: 1,
      name: "Tech Conference Hoodie",
      category: "apparel",
      price: 59.99,
      description: "Premium quality hoodie with embroidered Dimensions 2024 logo.",
      image: "/globe.svg",
      features: ["100% Cotton", "Unisex Design", "Multiple Colors"]
    },
    {
      id: 2,
      name: "Developer Backpack",
      category: "accessories",
      price: 79.99,
      description: "Spacious laptop backpack with multiple compartments and tech organizers.",
      image: "/window.svg",
      features: ["Water Resistant", "15\" Laptop Sleeve", "USB Charging Port"]
    },
    {
      id: 3,
      name: "Limited Edition Badge Set",
      category: "collectibles",
      price: 24.99,
      description: "Exclusive set of enamel pins featuring tech-inspired designs.",
      image: "/file.svg",
      features: ["Set of 5", "Metal Finish", "Collector's Edition"]
    },
    {
      id: 4,
      name: "Tech Festival T-Shirt",
      category: "apparel",
      price: 29.99,
      description: "Comfortable and stylish t-shirt with unique tech-inspired graphics.",
      image: "/window.svg",
      features: ["Organic Cotton", "Modern Fit", "Exclusive Design"]
    },
    {
      id: 5,
      name: "Smart Water Bottle",
      category: "accessories",
      price: 34.99,
      description: "Temperature-maintaining bottle with hydration tracking.",
      image: "/globe.svg",
      features: ["24hr Temperature Control", "LED Display", "500ml Capacity"]
    },
    {
      id: 6,
      name: "Conference Notebook Set",
      category: "accessories",
      price: 19.99,
      description: "Premium notebook with tech-themed designs and smart pen holder.",
      image: "/file.svg",
      features: ["Dotted Grid", "Soft Touch Cover", "Includes Smart Pen"]
    }
  ];

  const filteredProducts = products.filter(product =>
    selectedCategory === "all" ? true : product.category === selectedCategory
  );

  return (
    <div className="px-4 py-20 min-h-screen text-white bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-7xl"
      >
        <div className="mb-16 text-center">
          <TrueFocus
            sentence="Official Merchandise"
            manualMode={true}
            blurAmount={3}
            borderColor="#6366f1"
            glowColor="rgba(99, 102, 241, 0.6)"
          />
          <p className="mx-auto mt-8 max-w-3xl text-lg text-gray-300 md:text-xl">
            Take home a piece of Dimensions 2024 with our exclusive merchandise collection.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${selectedCategory === category.id
                ? "bg-purple-600 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ContentCard
                title={product.name}
                description={product.description}
                icon={product.image}
                showTooltip={true}
                subtitle={`$${product.price}`}
                additionalInfo={
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs text-purple-400 rounded-full bg-purple-600/20"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 mt-4 w-full font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>

        {/* Shopping Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h2 className="mb-6 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 md:text-4xl">
            Shipping Information
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-300">
            Free shipping on orders over $100. All merchandise will be available for pickup at the event or shipped to your location.
          </p>
          <div className="grid grid-cols-1 gap-8 mx-auto max-w-4xl md:grid-cols-3">
            <div className="p-6 rounded-xl backdrop-blur-lg bg-white/5">
              <h3 className="mb-2 text-xl font-semibold">Secure Payment</h3>
              <p className="text-gray-400">All transactions are encrypted and secure</p>
            </div>
            <div className="p-6 rounded-xl backdrop-blur-lg bg-white/5">
              <h3 className="mb-2 text-xl font-semibold">Fast Shipping</h3>
              <p className="text-gray-400">2-5 business days delivery worldwide</p>
            </div>
            <div className="p-6 rounded-xl backdrop-blur-lg bg-white/5">
              <h3 className="mb-2 text-xl font-semibold">Easy Returns</h3>
              <p className="text-gray-400">30-day return policy for unused items</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ShopPage;