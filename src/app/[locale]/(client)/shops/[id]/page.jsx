// pages/shop.js
import ProductCard from "@/components/ui/my-product-card";
import Image from "next/image";
import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";

const ShopProfile = () => {
  const shop = {
    name: "Book Shop's Name",
    logoUrl: "/images/shops/logo.png",
    bannerUrl: "/images/shops/banner2.png",
    location: "Phsar Kandal 2, Khan Doun Penh, Phnom Penh, Cambodia",
    description: "Your one-stop shop for the Books.",
    contact: "061 56 11 54",
    email: "mycontact@gmail.com",
  };

  const products = [
    {
      id: 1,
      title: "Premium High-Quality",
      description:
        "Experience superior sound quality and block out distractions with these state-of-the-art wireless earbuds.",
      price: "$59999999999.99",
      image: "/images/products/book4.png", // Your specified image URL
    },
    {
      id: 2,
      title:
        "Sleek and Stylish Smartwatch for Comprehensive Fitness Tracking and Instant Notifications",
      description:
        "Stay connected and monitor your health metrics effortlessly with this elegant smartwatch designed for modern lifestyles.",
      price: "$149.99",
      image: "/images/products/book4.png", // Your specified image URL
    },
    {
      id: 3,
      title:
        "Compact and Portable Bluetooth Speaker for Exceptional Sound Quality Anywhere You Go",
      description:
        "Take your music with you on all your adventures with this lightweight Bluetooth speaker that delivers powerful sound.",
      price: "$79.99",
      image: "/images/products/book4.png", // Your specified image URL
    },
    {
      id: 4,
      title:
        "State-of-the-Art 4K Ultra HD TV with Smart Features and Stunning Picture Quality",
      description:
        "Transform your living room into a cinematic experience with this impressive 4K Ultra HD TV, featuring the latest smart technology.",
      price: "$499.99",
      image: "/images/products/book4.png", // Your specified image URL
    },
    {
      id: 5,
      title:
        "High-Precision Gaming Mouse Designed for Competitive Play with Customizable Features",
      description:
        "Elevate your gaming performance with this ergonomic gaming mouse, engineered for speed and accuracy.",
      price: "$39.99",
      image: "/images/products/book4.png", // Your specified image URL
    },
    {
      id: 6,
      title:
        "Versatile 2-in-1 Laptop with Touchscreen and Ultra-Fast Performance",
      description:
        "Experience the best of both worlds with this powerful 2-in-1 laptop that combines productivity and entertainment.",
      price: "$899.99",
      image: "/images/products/book4.png", // Your specified image URL
    },
    {
      id: 7,
      title: "All-Natural Organic Skincare Set for Radiant and Healthy Skin",
      description:
        "Pamper your skin with this luxurious skincare set made from 100% organic ingredients for a natural glow.",
      price: "$89.99",
      image: "/images/products/book4.png", // Your specified image URL
    },
    {
      id: 8,
      title:
        "High-Quality DSLR Camera for Professional Photography and Videography",
      description:
        "Capture stunning images and videos with this high-performance DSLR camera featuring advanced settings and features.",
      price: "$1,299.99",
      image: "/images/products/book4.png", // Your specified image URL
    },
    {
      id: 9,
      title:
        "Durable and Lightweight Hiking Backpack with Multiple Compartments",
      description:
        "Embark on your next adventure with this rugged hiking backpack, designed for comfort and convenience on the trail.",
      price: "$59.99",
      image: "/images/products/book4.png", // Your specified image URL
    },
    {
      id: 10,
      title:
        "Elegant Bluetooth Headphones with Superior Sound Quality and Long Battery Life",
      description:
        "Enjoy your music wirelessly with these stylish Bluetooth headphones that provide exceptional audio performance.",
      price: "$79.99",
      image: "/images/products/book4.png", // Your specified image URL
    },
  ];

  return (
    <>
      <Image
        width={1920}
        height={1080}
        src={shop.bannerUrl}
        alt={`${shop.name} banner`}
        className="object-cover w-full mr-4 max-h-[1080px]"
      />
      <div className="p-4 mt-8 bg-white rounded-lg">
        <div className="flex items-center mb-4">
          <Image
            width={100}
            height={100}
            src={shop.logoUrl}
            alt={`${shop.name} logo`}
            className="object-cover w-20 h-20 mr-4 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{shop.name}</h2>
            <p className="text-gray-600">{shop.location}</p>
          </div>
        </div>
        <p className="mb-4 text-gray-800">{shop.description}</p>
        <div className="mb-4 contact-info">
          <p>
            <strong>Contact:</strong> {shop.contact}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${shop.email}`} className="text-blue-500">
              {shop.email}
            </a>
          </p>
        </div>

        <h3 className="mb-2 text-xl font-semibold">Products</h3>
        {/* Start Products List */}
        <div className="grid grid-cols-2 gap-4 pt-2 md:grid-cols-3 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
        {/* End Products List */}

        {/* Start Pagination */}
        <div className="flex flex-wrap items-center justify-between pt-4">
          <p className="w-40">Items 1-35 of 61</p>
          <Pagination className="flex justify-end flex-1">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        {/* End Pagination */}
      </div>
    </>
  );
};

export default ShopProfile;
