import { useState, useEffect, useRef } from "react";
import { GrWaypoint } from "react-icons/gr";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { GetServicesWithSubservices, GetBrandsBySubServiceOrService } from "../../../reduxKit/actions/offer/serviceSubServiceBrandSelection";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reduxKit/store";

interface Subservice {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
}

interface Service {
  id: string;
  name: string;
  nameAr: string;
  iconUrl: string;
  subservices: Subservice[];
}

const AddNewOfferSection = () => {
  const [selectedSubService, setSelectedSubService] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [subServiceDropdownOpen, setSubServiceDropdownOpen] = useState(false);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [FetchedService, setFetchedServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [brands, setBrands] = useState<string[]>([]); // State to store fetched brands
  const subServiceRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getServiceWithSubservices = async () => {
      try {
        const response = await dispatch(GetServicesWithSubservices());
        setFetchedServices(response.payload);
      } catch (error) {
        console.log("getservice with subservice error", error);
      }
    };
    getServiceWithSubservices();
  }, [dispatch]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (subServiceRef.current && !subServiceRef.current.contains(event.target as Node)) {
        setSubServiceDropdownOpen(false);
      }
      if (brandRef.current && !brandRef.current.contains(event.target as Node)) {
        setBrandDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleServiceClick = async (service: Service) => {
    console.log("Selected Service ID:", service.id);
    setSelectedService(service);
    if (service.subservices && service.subservices.length > 0) {
      setSelectedSubService("");
      setSubServiceDropdownOpen(true);
    } else {
      setSelectedSubService("");
      setSubServiceDropdownOpen(false);
    }
  
    // Fetch brands for the selected service
    try {
      const response = await dispatch(GetBrandsBySubServiceOrService(service.id));
      console.log("Fetched Brands:", response.payload);
      
      // Assuming the response payload is an array of brand objects with a 'name' property
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const brandNames = response.payload.map((brand: any) => brand.name);
      setBrands(brandNames); // Set the brand names in the state
    } catch (error) {
      console.log("Error fetching brands:", error);
    }
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-24 w-full mx-auto flex flex-col lg:flex-row gap-6 bg-gray-100 h-auto pb-[300px] lato-font">
      <div className="w-full lg:w-1/4 p-4 sm:px-6 order-1 lg:order-2">
        <ul className="text-xs sm:text-sm text-gray-700 space-y-3 flex flex-col gap-2">
          <li className="flex justify-center items-start gap-2">
            <GrWaypoint className="text-[28px]" /> Select the correct and relevant services or product category so that buyers can find your offers easily.
          </li>
          <div className="flex justify-center items-start gap-2">
            <GrWaypoint className="text-[28px]" />
            <li>Sellers are strictly prohibited from offering any product or services which may violate <a href="#" className="text-blue-500">local laws and regulations</a>.</li>
          </div>
          <div className="flex justify-center items-start gap-2">
            <GrWaypoint className="text-[28px]" />
            <li>To request for a brand or product not listed here, please <a href="#" className="text-blue-500">send a ticket</a> to us and provide the URL to the official brand site.</li>
          </div>
          <li className="flex gap-2 items-center">
            <GrWaypoint className="text-[12px]" /> Request for <a href="#" className="text-blue-500">G2G OpenAPI Integration</a>.
          </li>
          <li className="flex gap-2">
            <GrWaypoint className="text-[12px]" /> Uploading fake codes is strictly prohibited.
          </li>
        </ul>
      </div>

      <div className="w-full lg:w-3/4 bg-white p-4 sm:p-6 rounded-lg shadow-md order-2 lg:order-1">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ fontFamily: "Unbounded" }}>Add new offer</h2>
        <h3 className="text-lg sm:text-xl font-medium mb-2 lato-font">Type of service</h3>
        <p className="text-gray-600 mb-4 lato-font">Select a product or service you want to sell</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {FetchedService?.map((service) => (
            <div
              key={service.id}
              className={`flex flex-col items-center justify-center p-4 sm:p-6 border rounded-lg cursor-pointer transition duration-300 ${
                selectedService?.id === service.id ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
              onClick={() => handleServiceClick(service)}
            >
              <img src={service.iconUrl} alt="" className="w-[100px]" />
              <span className="text-sm sm:text-base font-medium text-center">{service.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 primary-background text-white p-3 sm:p-4 rounded-lg flex items-center">
          <span className="mr-2">⚠</span>
          <p className="text-xs sm:text-sm lato-font">
            Sellers are only permitted to sell this product in code format and must upload genuine codes.
            Uploading fake codes is strictly prohibited. Sales of products that require login access to the buyer's account
            or necessitate visiting external links to retrieve the codes are also prohibited.
          </p>
        </div>

        {selectedService?.subservices && selectedService.subservices.length > 0 && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Sub-services <span className="text-red-500">*</span></label>
            <div className="relative mt-2" ref={subServiceRef}>
              <button
                className="w-full bg-white border p-3 text-left"
                onClick={() => setSubServiceDropdownOpen(!subServiceDropdownOpen)}
              >
                {selectedSubService || "Select sub-services"}
                <span className="absolute right-[12px] top-[16px]">{subServiceDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
              </button>
              {subServiceDropdownOpen && (
                <div className="absolute w-full bg-white border z-10">
                  {selectedService.subservices.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedSubService(sub.name);
                        setSubServiceDropdownOpen(false);
                      }}
                    >
                      {sub.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

{selectedSubService && (
  <div className="mt-4">
    <label className="block text-sm font-medium text-gray-700">Brands <span className="text-red-500">*</span></label>
    <div className="relative mt-2" ref={brandRef}>
      <button
        className="w-full bg-white border p-3 text-left"
        onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
      >
        {selectedBrand || "Select brand"}
        <span className="absolute right-[12px] top-[16px]">{brandDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
      </button>
      {brandDropdownOpen && (
        <div className="absolute w-full bg-white border z-10">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedBrand(brand);
                setBrandDropdownOpen(false);
              }}
            >
              {brand}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)}

        {selectedBrand && (
          <div className="mt-6 py-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "Unbounded" }}>
              You need to create a offer
            </h2>
            <div className="mt-4 border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="text-md font-semibold text-gray-800 lato-font">Create single offer</h3>
                <p className="text-sm text-gray-500 lato-font">Suitable for all sellers.</p>
              </div>
              <button className="lato-font text-white px-4 py-2 rounded-md font-medium primary-background">
                Single offer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewOfferSection;