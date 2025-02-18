import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reduxKit/store";
import { GetOfferByIdFromSeller } from "../../../reduxKit/actions/seller/offerListing";
import { useEffect, useState } from "react";

const GetOfferById: React.FC = () => {
  const [productItem, setProductItem] = useState({
    id: "3a0f17e2-4a02-40de-a2ac-0292fbb8f2d8",
    apiQty: 10,
    title: "Some Title",
    description: "Description",
    unitPriceSAR: 10,
    status: "DRAFT",
    product: {
      purchaseType: "TOP_UP",
      image: "https://example.com/path/to/product-image.jpg",
      title: "Test Product",
      description: "This is a test product description",
      brand: {
        id: "d352c5a7-3581-4278-80ac-be2653079470",
        image: "https://example.com/path/to/brand-image.jpg",
        name: "Valorant 2s",
      },
      region: null,
      service: {
        id: "efc1198c-d04c-49f0-ad95-ba8a9ef78c95",
        name: "Game 2",
      },
      subService: null,
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const GetOfferById = async () => {
      try {
        const response = await dispatch(GetOfferByIdFromSeller(id));
        console.log("Fetched Product:", response);
      } catch (error) {
        console.error(error);
      }
    };
    GetOfferById();
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto p-6 common-background rounded-lg shadow-md">
      {/* Product Info */}
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1">
          <img
            src={productItem.product.image}
            alt={productItem.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h1 className="text-2xl font-bold lato-font">{productItem.title}</h1>
          <p className="text-gray-600 lato-font">{productItem.description}</p>
          <p className="text-lg font-semibold lato-font">Price: {productItem.unitPriceSAR} SAR</p>
          <p className={`text-sm font-medium ${productItem.status === "DRAFT" ? "text-red-500" : "text-green-500"} lato-font`}>
            Status: {productItem.status}
          </p>
        </div>
      </div>

      {/* Related Items */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-center lato-font">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {["brand", "region", "service", "subService"].map((key) => {
            const item = productItem.product[key];
            if (item) {
              return (
                <div key={key} className="border p-4 rounded-lg shadow-md text-center game-card">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-full h-40 object-cover mb-2 rounded-md" />
                  )}
                  <p className="font-medium lato-font">{item.name}</p>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default GetOfferById;