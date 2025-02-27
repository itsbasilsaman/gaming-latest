/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { GrWaypoint } from "react-icons/gr";
import { Offer, validateOffer, ValidationErrors } from "./validation";
import { GetProducetsForCreateOffer, CreateOfferWithProduct } from "../../../reduxKit/actions/offer/serviceSubServiceBrandSelection";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reduxKit/store";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners"; // Import a loading spinner

export interface getProduct {
  SelectedServiceId: string;
  SelectedSubServiceId?: string;
  selectedBrandId?: string;
}

const OfferDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const SelectedServiceId = queryParams.get("SelectedServiceId") || "";
  const SelectedSubServiceId = queryParams.get("SelectedSubServiceId") || "";
  const selectedBrandId = queryParams.get("selectedBrandId") || "";
 
  const [productData, setProductData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const navigate = useNavigate();

  const [offer, setOffer] = useState<Offer>({
    productId: "",
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    unitPriceUSD: 0,
    unitPriceSAR: 0,
    minQty: 0,
    apiQty: 0,
    lowStockAlertQty: 1,
    deliveryMethods: [], // Initialize as empty array
    salesTerritory: {
      settingsType: "GLOBAL",
      countries: [],
    },
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    const getProductDetails = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      try {
        const data: getProduct = {
          SelectedServiceId,
          SelectedSubServiceId,
          selectedBrandId,
        };
        const response = await dispatch(GetProducetsForCreateOffer(data));
        console.log('1212basii',response.payload);
        const apifatchValue = response.payload;
        console.log(apifatchValue);
        
        await setProductData(response.payload.data[0]);
        if (response.payload.success) {
          toast.success(response.payload.message);
          
          // Set deliveryMethods based on API response
          if (response.payload.data[0]?.deliveryTypes) {
            setOffer((prev) => ({
              ...prev,
              deliveryMethods: response.payload.data[0].deliveryTypes,
            }));
          }
        } else {
          toast.error(response.payload.message);
        }
      } catch (error: any) {
        console.log(error);
        
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
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    getProductDetails();
  }, [dispatch, SelectedServiceId, SelectedSubServiceId, selectedBrandId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "deliveryMethods") {
      setOffer((prev) => ({ ...prev, deliveryMethods: [value] })); // Ensure this is an array
    } else {
      setOffer((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateOffer(offer);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formData = new FormData();
        formData.append("productId", productData?.id || "");
        formData.append("title", offer.title);
        formData.append("titleAr", offer.titleAr);
        formData.append("description", offer.description);
        formData.append("descriptionAr", offer.descriptionAr);
        formData.append("unitPriceUSD", String(offer.unitPriceUSD));
        formData.append("unitPriceSAR", String(offer.unitPriceSAR));
        formData.append("minQty", String(offer.minQty));
        formData.append("apiQty", String(offer.apiQty));
        formData.append("lowStockAlertQty", String(offer.lowStockAlertQty));
        formData.append("deliveryMethods", JSON.stringify(offer.deliveryMethods));  
        formData.append("salesTerritory", JSON.stringify(offer.salesTerritory));

        const response = await dispatch(CreateOfferWithProduct(formData));
        console.log('Response Data',response);
        
        if (response.payload.success) {
          toast.success(response.payload.message);
          navigate("/seller/offer");
          setOffer({
            productId: "",
            title: "",
            titleAr: "",
            description: "",
            descriptionAr: "",
            unitPriceUSD: 0,
            unitPriceSAR: 0,
            minQty: 0,
            apiQty: 0,
            lowStockAlertQty: 1,
            deliveryMethods: [], // Reset to empty array
            salesTerritory: {
              settingsType: "GLOBAL",
              countries: [],
            },
          });
        } else {
          console.log('Error Message', response);
          
          toast.error(response.payload.message);
        }
      } catch (error: any) {
        console.log('Eroor showing Message',error);
        
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
    } else {
      console.log("Validation errors:", validationErrors);
    }
  };

  return (
    <div className="  pt-[120px] px-4 sm:px-6  lg:px-24 w-full mx-auto flex flex-col lg:flex-row gap-6 bg-gray-100 h-auto pb-[150px] lato-font">
      <div className="w-full lg:w-1/4 p-4 sm:px-6 order-1 lg:order-2">
        <ul className="text-xs sm:text-sm text-gray-700 space-y-3 flex flex-col gap-2">
          <li className="flex justify-center items-start gap-2">
            <GrWaypoint className="text-[28px]" /> Ensure the product specifications are clearly and accurately stated.
          </li>
          <div className="flex justify-center items-start gap-2">
            <GrWaypoint className="text-[28px]" />
            <li>Use bullet points to keep descriptions short and concise.</li>
          </div>
        </ul>
      </div>

      <div className="w-full lg:w-3/4 bg-white p-4 sm:p-6 rounded-lg lg:shadow-md order-2 lg:order-1">
        <h3 className="  text-xl sm:text-[25px] font-medium mb-2 lato-font" style={{ fontFamily: "Unbounded" }}>Offer Details</h3>
        

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <ClipLoader color="#101441" size={40} />
          </div>
        ) : (
          <div className="space-y-3">
            {productData?.service && (
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Service</span>
                <span>{productData?.service?.name}</span>
              </div>
            )}
            {productData?.subService && (
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Sub Service</span>
                <span>{productData?.subService?.name}</span>
              </div>
            )}
            {productData?.brand && (
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Brand</span>
                <span>{productData?.brand?.name}</span>
              </div>
            )}
            {productData?.brand?.name?.region && (
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Region</span>
                <span>{productData?.brand?.name?.region}</span>
              </div>
            )}
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
                reasons.  
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
                <label className="block text-gray-700 font-medium mb-2">Stock</label>
                <input
                  type="number"
                  name="apiQty"
                  value={offer.apiQty}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.apiQty && <p className="text-red-500 text-sm mt-1">{errors.apiQty}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Low Stock Alert Quantity</label>
                <input
                  type="number"
                  name="lowStockAlertQty"
                  value={offer.lowStockAlertQty}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.lowStockAlertQty && <p className="text-red-500 text-sm mt-1">{errors.lowStockAlertQty}</p>}
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
                {productData?.deliveryTypes?.map((method: string, index: number) => (
                  <option key={index} value={method}>
                    {method}
                  </option>
                ))}
              </select>
              {errors.deliveryMethods && <p className="text-red-500 text-sm mt-1">{errors.deliveryMethods}</p>}
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-6 justify-end">
          <button className="px-6 py-3 bg-gray-300 text-gray-700 hover:bg-gray-100">Discard</button>
          <button className="px-6 py-3 primary-background text-white hover:bg-blue-950" onClick={handleSubmit}>
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;