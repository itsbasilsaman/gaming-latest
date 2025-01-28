import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../reduxKit/store';
import { useDispatch } from 'react-redux';
import { SellerRegistrationAction } from '../../../reduxKit/actions/seller/seller';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

interface FormData {
  address: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  dob: string;
}

const SellerRegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.seller);

  const [formData, setFormData] = useState<FormData>({
    address: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    dob: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {  
      e.preventDefault();
      const response = await dispatch(SellerRegistrationAction(formData)).unwrap();
      toast.success("Seller registration successful");
      console.log(response);
      
      navigate('/');
    } catch (error: unknown) { 
      const errorMessage = error instanceof Error ? error.message : String(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: errorMessage,
        timer: 3000,
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="min-h-screen user-background flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="affiliate-section w-full lg:w-3/5 md:w-4/5 sm:w-full p-6 md:p-8 lg:p-10 rounded-lg shadow-lg">
        <h2
          className="text-2xl font-bold text-center text-white mb-6"
          style={{ fontFamily: "Unbounded" }}
        >
          Seller Registration Form
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Address 1"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Address Line 2 (Optional)
            </label>
            <textarea
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Address Line 2"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="City"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="State"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Zip Code
            </label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Zip Code"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full primary-background text-white py-3 px-6 rounded-md font-medium hover:bg-indigo-700 transition-all duration-200"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerRegistrationForm;
