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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <TrueFocus
            sentence="Official Merchandise"
            manualMode={true}
            blurAmount={3}
            borderColor="#6366f1"
            glowColor="rgba(99, 102, 241, 0.6)"
          />
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-8">
            Take home a piece of Dimensions 2024 with our exclusive merchandise collection.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                          className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Shipping Information
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Free shipping on orders over $100. All merchandise will be available for pickup at the event or shipped to your location.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-400">All transactions are encrypted and secure</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-400">2-5 business days delivery worldwide</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-400">30-day return policy for unused items</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ShopPage;