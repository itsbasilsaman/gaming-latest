import React, { useState, useRef, useEffect } from 'react';
 
import { MdLogout } from 'react-icons/md';
 
import { Link } from 'react-router-dom';
import { UserProfileData } from "../../../interfaces/user/profile";
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../reduxKit/store';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../../reduxKit/actions/user/userProfile';
// import Profile from '../../forms/user/userProfile';


const ToggleProfile: React.FC = React.memo(() => {
 
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [formData, setformData] = useState<UserProfileData | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { GetProfileloading } = useSelector((state: RootState) => state.profile);

  const formattedDate = formData?.memberSince? new Date(formData.memberSince).toLocaleDateString("en-US",{
    year: 'numeric',
    month:'long',
    day: 'numeric'
  }) : ' '


 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resultAction = await dispatch(getUserProfile());
        if (getUserProfile.fulfilled.match(resultAction)) {
          const { data } = resultAction.payload;
          setformData(data.data);
          console.log("Profile data fetched successfully: ", resultAction.payload);
        } else {
          console.log("Failed to fetch profile: ", resultAction.payload || resultAction.error);
        }
      } catch (error) {
        console.error("Unexpected error while fetching the profile: ", error);
      }
    };

    fetchProfile();
  }, [dispatch]);

  useEffect(() => {
    console.log("this is my profiles of in page *****************", formData);
  }, [formData]);

 
  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <>
      {GetProfileloading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
       
          <div   className="relative" ref={dropdownRef}>
            <div className="mt-2 py-4 w-[100%] rounded-lg shadow-md">
              <div className="rounded-lg max-w-md mx-auto">
                {/* Header */}
                <div
                  className="flex items-center space-x-4 pb-4 mb-4 px-4 cursor-pointer"
                  onClick={toggleProfile}
                >
                  <div
                    className={` bg-red-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold`}
                  >
                    {formData?.firstName ? formData.firstName.charAt(0).toUpperCase() : 'X'}
                  </div>
                  <div>
                    <h1
                      className="text-lg font-semibold text-white"
                      style={{ fontFamily: 'Unbounded' }}
                    >
                      {formData?.userName || 'userName'}
                    </h1>
                    <p className="text-sm text-gray-400">Level {formData?.level?.level || 'level'}</p>
                    <p className="text-sm text-gray-400">{formData?.email || 'email'}</p>
                  </div>
                </div>

                {/* Animated Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isProfileOpen ? 'max-h-[1000px]' : 'max-h-0'
                  }`}
                >
                  {/* Balances */}
                  <div className="space-y-4">
                  <div className="flex justify-center items-center px-4">
                      <span className="text-[22px] font-medium text-white">
                        {formData?.firstName} {formData?.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-4">
                      <div className="text-sm font-medium text-white  flex flex-col">
                        <span>Followers </span>  <span className='text-center text-[25px] py-2'>{formData?.followersCount}</span>
                      </div>
                      <div className="text-sm font-medium text-white flex flex-col">
                        <span>Following</span>  <span className='text-center text-[25px] py-2'>{formData?.folowingCount}</span>
                      </div>
                    </div>
                   
                    <div className="flex justify-between items-center px-4">
                      <span className="text-sm font-medium text-white">
                        Member Since 
                      </span>
                      <span className="text-sm text-white">
                      {formattedDate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-4">
                      <span className="text-sm font-medium text-white">
                        Country 
                      </span>
                      <span className="text-sm text-white">
                      {formData?.country}
                      </span>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="mt-4">
                    <ul className="space-y-2">
                       
                      <li>
                        <Link to={'/'}>
                          <button className="w-full text-left text-[19px] font-semibold affiliate-section text-white py-[10px] rounded-full flex justify-center items-center gap-[6px] px-4">
                            <MdLogout className="text-[22px]" /> Log Out
                          </button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
       
      )}
    </>
  );
});

export default ToggleProfile;