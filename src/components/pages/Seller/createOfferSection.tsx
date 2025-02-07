import React, { useState } from "react";

type FormData = {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  unitPriceUSD: string;
  minQty: string;
  apiQty: string;
  deliveryMethod: string;
  salesTerritory: string;
};

const CreateOfferSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    unitPriceUSD: "",
    minQty: "",
    apiQty: "",
    deliveryMethod: "EMAIL",
    salesTerritory: "GLOBAL",
  });

  const deliveryMethods = ["EMAIL", "COURIER", "PICKUP"];
  const salesTerritoryOptions = ["GLOBAL", "EXCLUDE", "INCLUDE"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <>
      
      <div className="flex items-center pt-[150px] flex-col justify-center h-auto w-full overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200 p-4">
      <div className="flex items-center p-4   bg-white rounded-lg mb-6 w-full max-w-4xl">
          <span className="text-green-500 text-xl mr-3">ℹ️</span>
          <p className="text-gray-700">
            Sellers are strictly prohibited from offering any product or services which may violate local laws and regulations.  
          </p>

        </div>
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-10  ">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center"style={{fontFamily:"Unbounded"}}>Create Offer</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700">Title </label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              </div>
              <div>
                <label className="block text-gray-700">Title in Arabic  </label>
                <input type="text" name="titleAr" value={formData.titleAr} onChange={handleChange} placeholder="عنوان بالعربية" className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Description </label>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter description" className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" rows={4}></textarea>
            </div>
            <div>
              <label className="block text-gray-700">Description in Arabic </label>
              <textarea name="descriptionAr" value={formData.descriptionAr} onChange={handleChange} placeholder="وصف بالعربية" className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" rows={4}></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700">Unit Price (SAR) </label>
                <input type="number" name="unitPriceUSD" value={formData.unitPriceUSD} onChange={handleChange} placeholder="Enter price" className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              </div>
              <div>
                <label className="block text-gray-700">Min Quantity</label>
                <input type="number" name="minQty" value={formData.minQty} onChange={handleChange} placeholder="Enter min quantity" className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              </div>
              <div>
                <label className="block text-gray-700">Max Quantity</label>
                <input type="number" name="apiQty" value={formData.apiQty} onChange={handleChange} placeholder="Enter max quantity" className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700">Delivery Methods</label>
                <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange} className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                  {deliveryMethods.map((method) => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Sales Territory</label>
                <select name="salesTerritory" value={formData.salesTerritory} onChange={handleChange} className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                  {salesTerritoryOptions.map((territory) => (
                    <option key={territory} value={territory}>{territory}</option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition">SAVE</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateOfferSection;