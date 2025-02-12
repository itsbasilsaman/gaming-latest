/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { GrWaypoint } from "react-icons/gr";
import { validateOffer, ValidationErrors } from "./validation";
import { GetProducetsForCreateOffer,CreateOfferWithProduct } from "../../../reduxKit/actions/offer/serviceSubServiceBrandSelection";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reduxKit/store";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export interface getProduct{
  SelectedServiceId:string
  SelectedSubServiceId?:string
  selectedBrandId?:string
}
const OfferDetail: React.FC = () => {
  const dispatch=useDispatch<AppDispatch>()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const SelectedServiceId = queryParams.get("SelectedServiceId") || "";
  const SelectedSubServiceId = queryParams.get("SelectedSubServiceId") || "";
  const selectedBrandId = queryParams.get("selectedBrandId") || "";
  const [productData,setProductData]=useState<any[]>([]) 

  const [offer, setOffer] = useState({
    productId: "",
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    unitPriceUSD: "",
    unitPriceSAR: "",
    minQty: "",
    apiQty: "",
    lowStockAlertQty: "",
    deliveryMethods: ["EMAIL"],
    salesTerritory : {
      settingsType : "GLOBAL", // 3 values possible here GLOBAL , EXCLUDE , INLCUDE
      countries : [] // If the user selected EXCLUDE OR INCLUDE this shoudlnt be empty refer g2g
  }
  });


  useEffect(()=>{
    const getProductDetails=async()=>{
    try {

      const data :getProduct={
        SelectedServiceId,
        SelectedSubServiceId,
        selectedBrandId
      } 
      const response= await dispatch(GetProducetsForCreateOffer(data))
      console.log("my response of the getProduct () :", response.payload);
     await setProductData(response.payload.data[0])
      if(response.payload.success){
          toast.success(response.payload.message)
      }else{
        toast.error(response.payload.message)
      }
    } catch (error:any) {
    Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message,
  
        timer: 3000,
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
        background: "#fff",
        color: "#721c24",
        iconColor: "#f44336",
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
        showClass: { popup: "animate__animated animate__fadeInDown" },
        hideClass: { popup: "animate__animated animate__fadeOutUp" },
      });
      
    }
  }
  getProductDetails()
  },[dispatch])
  

  const [errors, setErrors] = useState<ValidationErrors>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "deliveryMethods") {
      setOffer((prev) => ({ ...prev, deliveryMethods: [value] }));
    } else {
      setOffer((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    const validationErrors = validateOffer(offer);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("All fields are valid:", offer);
    } else {
      console.log("Validation errors:", validationErrors);
    }
  };

  return (
    <div className="flex flex-col h-auto gap-6 lg:py-32 py-6 lg:px-32 px-6 w-full  bg-gray-100">
      <h2 className="text-3xl font-bold mb-3 text-gray-800" style={{ fontFamily: "Unbounded" }}>Add Gift Card Offer</h2>
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div className="w-full md:w-3/4 bg-white  rounded-lg shadow-md py-6 px-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-600" style={{ fontFamily: "Unbounded" }}>
            Offer Details
          </h2>
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
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Title (Arabic)</label>
              <input
                type="text"
                name="titleAr"
                value={offer.titleAr}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.titleAr && <p className="text-red-500 text-sm mt-1">{errors.titleAr}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={offer.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              <p className="text-sm text-gray-500 mt-2">
                Do not include URLs or contact information in the description box. URLs will be removed for safety
                reasons. Please use G2G Chat for all communications.
              </p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Description (Arabic)</label>
              <textarea
                name="descriptionAr"
                value={offer.descriptionAr}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
              {errors.descriptionAr && <p className="text-red-500 text-sm mt-1">{errors.descriptionAr}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Unit Price (USD)</label>
                <input
                  type="number"
                  name="unitPriceUSD"
                  value={offer.unitPriceUSD}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.unitPriceUSD && <p className="text-red-500 text-sm mt-1">{errors.unitPriceUSD}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Unit Price (SAR)</label>
                <input
                  type="number"
                  name="unitPriceSAR"
                  value={offer.unitPriceSAR}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.unitPriceSAR && <p className="text-red-500 text-sm mt-1">{errors.unitPriceSAR}</p>}
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
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.minQty && <p className="text-red-500 text-sm mt-1">{errors.minQty}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Max Quantity</label>
                <input
                  type="number"
                  name="maxQty"
                  value={offer.apiQty}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.apiQty && <p className="text-red-500 text-sm mt-1">{errors.apiQty}</p>}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Delivery Method</label>
              <select
                name="deliveryMethods"
                value={offer.deliveryMethods[0]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
              >
                <option value="EMAIL">EMAIL</option>
                <option value="COURIER">COURIER</option>
                <option value="PICKUP">PICKUP</option>
              </select>
              {errors.deliveryMethods && <p className="text-red-500 text-sm mt-1">{errors.deliveryMethods}</p>}
            </div>
          </div>
          <div className="flex gap-4 mt-6 justify-end">
            <button className="px-6 py-3 bg-gray-300 text-gray-700   hover:bg-gray-100">Discard</button>
            <button className="px-6 py-3 primary-background text-white   hover:bg-blue-950" onClick={handleSubmit}>Finish</button>
          </div>
        </div>
        <div className="w-full md:w-1/4  p-6 h-fit">
          <h3 className="text-lg font-semibold mb-4 text-gray-800" style={{ fontFamily: "Unbounded" }}>Guidelines</h3>
          <ul className="text-gray-700 space-y-3">
            <li className="flex items-center">
              <span className="mr-2"><GrWaypoint className="text-[12px]" /></span>
              <span>Ensure the product specifications are clearly and accurately stated.</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2"><GrWaypoint className="text-[12px]" /></span>
              <span>Use bullet points to keep descriptions short and concise.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;