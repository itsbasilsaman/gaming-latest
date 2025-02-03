import React, { useState } from "react";

const OfferDetail: React.FC = () => {
  const [offer, setOffer] = useState({
    productId: "",
    title: "Some Title",
    titleAr: "Title in Arabic",
    description: "Description",
    descriptionAr: "Description in AR",
    unitPriceUSD: 7,
    unitPriceSAR: 10,
    minQty: 1,
    maxQty: 10,
    lowStockAlertQty: 1,
    deliveryMethods: ["EMAIL"],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOffer((prev) => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="flex flex-col h-auto md:flex-row gap-6  lg:py-32 py-6 lg:px-32 px-6 w-full bg-white">
      <div className="w-full md:w-3/4 bg-white  border border-gray-300 p-6  ">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800" style={{fontFamily:"Unbounded"}}>Offer Details</h2>
        <div className="space-y-6">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Service</span>
            <span>Gift Cards &gt; Retail Gift Cards</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Brand</span>
            <span>Amazon</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Region</span>
            <span>DE</span>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={offer.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300   focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title (Arabic)</label>
            <input
              type="text"
              name="titleAr"
              value={offer.titleAr}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300   focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={offer.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300   focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description (Arabic)</label>
            <textarea
              name="descriptionAr"
              value={offer.descriptionAr}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300   focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Unit Price (USD)</label>
              <input
                type="number"
                name="unitPriceUSD"
                value={offer.unitPriceUSD}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300   focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Unit Price (SAR)</label>
              <input
                type="number"
                name="unitPriceSAR"
                value={offer.unitPriceSAR}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300   focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Min Quantity</label>
              <input
                type="number"
                name="minQty"
                value={offer.minQty}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300   focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Max Quantity</label>
              <input
                type="number"
                name="maxQty"
                value={offer.maxQty}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300    focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Delivery Method</label>
            <select
              name="deliveryMethods"
              value={offer.deliveryMethods[0]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300   focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="EMAIL">EMAIL</option>
              <option value="COURIER">COURIER</option>
              <option value="PICKUP">PICKUP</option>
            </select>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/4 bg-white   p-6   h-fit">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Guidelines</h3>
        <ul className="text-gray-700 space-y-3">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Ensure the product specifications are clearly and accurately stated.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Use bullet points to keep descriptions short and concise.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OfferDetail;