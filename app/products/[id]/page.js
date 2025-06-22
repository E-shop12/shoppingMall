"use client";

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import SpinnerWithProgress from "@/components/stateComponents/SpinnerWithProgress";
import SubscribeSection from "@/components/SubscribeSection";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWhatsapp, FaTelegramPlane,FaPhone, FaLocationArrow } from "react-icons/fa";

export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [profile,setProfile] = useState([]);
  const [tab, setTab] = useState("description");


  const getProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setProduct(response.data);
      setSelectedImage(response.data.image);
    } catch (error) {
      console.log("Failed to fetch product:", error);
    } finally {
      setLoading(false);
    }
  };

  const getProfileDetails = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/");
      const profileData = response.data.results
      setProfile(profileData)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getProfileDetails();
  },[])

  useEffect(() => {
    if (id) getProductDetails();
  }, [id]);

  return (
    <div className="p-2">
      <NavBar />

      {loading ? (
        <SpinnerWithProgress/>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 bg-white p-4 rounded-lg shadow-md">
          {/* Image Section */}
          <div className="relative flex flex-col md:w-1/2">
            <div className="absolute top-3 left-3 z-10 text-xs px-3 py-2 rounded-lg shadow text-white bg-green-600 font-semibold">
              <p>On Sale</p>
            </div>
            {product.image && (
              <div className="bg-gray-100 rounded-lg overflow-hidden flex justify-center items-center">
                <Image
                  src={selectedImage || product.image}
                  alt={product.title || "Product image"}
                  width={300}
                  height={100}
                  className="object-contain mix-blend-multiply"
                />
              </div>
            )}

            {/* Thumbnail (simulate multiple images by duplicating main image) */}
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {product.image &&
                [1, 2, 3].map((i) => (
                  <Image
                    key={i}
                    src={product.image}
                    alt={`Thumbnail ${i}`}
                    width={80}
                    height={80}
                    className={`cursor-pointer border rounded-md hover:opacity-70 mix-blend-multiply ${
                      selectedImage === product.image ? "border-blue-500" : ""
                    }`}
                    onClick={() => setSelectedImage(product.image)}
                  />
                ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">
              {product.title}
            </h1>

            <p className="text-xl text-green-600 font-semibold">
              GHC {product.price}{" "}
              <span className="text-sm text-gray-500">(Negotiable)</span>
            </p>

            {/* Vendor Info */}
            <div className="w-full max-w-sm p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 flex flex-col sm:flex-row items-center sm:items-start gap-4">
              {/* Vendor Avatar */}
              {profile[0]?.picture?.large && (
                <Image
                  src={profile[0].picture.large}
                  alt="Vendor Avatar"
                  width={70}
                  height={70}
                  className="rounded-full border-2 border-blue-500 shadow-md"
                />
              )}

              {/* Vendor Info */}
              <div className="text-center sm:text-left w-full">
                <p className="text-lg font-semibold text-gray-800">
                  {profile[0]?.name?.first} {profile[0]?.name?.last}
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-2 mt-1 text-blue-600 text-sm">
                  <FaPhone />
                  <a
                    href={`tel:${profile[0]?.phone}`}
                    className="hover:underline"
                  >
                    {profile[0]?.phone}
                  </a>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-2 mt-1 text-blue-600 text-sm">
                  <FaLocationArrow /> <p>{profile[0]?.location.city}</p>
                </div>

                <div className="flex justify-center sm:justify-start items-center gap-4 mt-2 text-blue-600">
                  <a
                    href={`https://wa.me/${profile[0]?.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-500 transition"
                  >
                    <FaWhatsapp size={20} />
                  </a>
                  <a
                    href={`https://t.me/${profile[0]?.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition"
                  >
                    <FaTelegramPlane size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Delivery & Policy Info */}
            <div className="mt-6 w-full  bg-white/90 backdrop-blur-md p-4 rounded-2xl  space-y-3">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Shipping & Policies
              </h2>

              <div className="flex items-start gap-3 text-gray-700">
                <span className="text-green-600 font-bold">🚚</span>
                <p>
                  <span className="font-medium">Nationwide Delivery</span>
                  <br />
                  Get your order delivered to all regions within 1–5 business
                  days.
                </p>
              </div>

              <div className="flex items-start gap-3 text-gray-700">
                <span className="text-red-500 font-bold">🔁</span>
                <p>
                  <span className="font-medium">Flexible Return Policy</span>
                  <br />
                  Returns accepted within 7 days.{" "}
                  <a href="#" className="text-blue-700 hover:underline">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-700 hover:underline">
                    conditions
                  </a>{" "}
                  apply.
                </p>
              </div>

              <div className="flex items-start gap-3 text-gray-700">
                <span className="text-blue-500 font-bold">🛡️</span>
                <p>
                  <span className="font-medium">Buyer Protection</span>
                  <br />
                  Payment is held securely until the product is delivered and
                  confirmed.
                </p>
              </div>

              <div className="flex items-start gap-3 text-gray-700">
                <span className="text-yellow-500 font-bold">📦</span>
                <p>
                  <span className="font-medium">Packaging Assurance</span>
                  <br />
                  Items are safely packaged to ensure damage-free delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Description & Additional Info Tabs */}
      <div className="mt-6 p-4 bg-gray-50  shadow-sm">
        <div className="flex gap-4 border-b mb-4">
          <button
            className={`p-3 text-sm md:text-2xl font-medium ${
              tab === "description"
                ? " bg-blue-100/30 rounded-lg  text-blue-600 "
                : "text-gray-600"
            }`}
            onClick={() => setTab("description")}
          >
            Description
          </button>
          <button
            className={`p-3 text-sm md:text-2xl font-medium ${
              tab === "additional"
                ? "bg-blue-100/30 rounded-lg  text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setTab("additional")}
          >
            Additional Info
          </button>
        </div>

        {tab === "description" && (
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        )}

        {tab === "additional" && (
          <ul className="text-gray-700 list-disc pl-5 space-y-1">
            <li>Category: {product.category}</li>
            <li>Product ID: {product.id}</li>
            <li>Available: In Stock</li>
          </ul>
        )}
      </div>

      {/* suscribe section */}
      <SubscribeSection />

      <Footer />
    </div>
  );
}
