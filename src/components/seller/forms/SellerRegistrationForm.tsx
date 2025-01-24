/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../reduxKit/store';
import { useDispatch } from 'react-redux';
import { SellerRegistrationAction } from '../../../reduxKit/actions/seller/seller';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Swal from "sweetalert2";

interface FormData {
  address: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  dob: string;
}





const SellerRegistrationForm: React.FC = () => {
  const navigate= useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const {loading}=useSelector((state:RootState) => state.seller)
  
  const [formData, setFormData] = useState<FormData>({
    address: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    dob: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    try {  
      e.preventDefault();
      console.log("got the seller data for register ", formData);
      const response = await dispatch(SellerRegistrationAction(formData)).unwrap()
        toast.success("Seller registration successful")
        navigate('/')
      console.log("response from seller registration action", response);
    } catch (error:any) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error,
        timer: 3000,
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
        background: '#fff', // Light red background for an error message
        color: '#721c24', // Darker red text color for better readability
        iconColor: '#f44336', // Custom color for the icon
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer); // Pause timer on hover
          toast.addEventListener('mouseleave', Swal.resumeTimer); // Resume timer on mouse leave
        },
        showClass: {
          popup: 'animate__animated animate__fadeInDown' // Animation when the toast appears
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp' // Animation when the toast disappears
        }
      });
      
    }



  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Seller Registration Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Address 1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address Line 2 (Optional)</label>
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Address Line 2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="City"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="State"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Zip Code</label>
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Zip Code"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
          >
         {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerRegistrationForm;
