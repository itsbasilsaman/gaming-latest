// import { useState } from 'react';
// import { FaEdit, FaUserEdit } from 'react-icons/fa';
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import LanguageSwitcher from "../../Header/LanguageSwitcher";
// import DarkModeSwitcher from '../../Header/DerkModeSwitcher';
import { SellerHeader } from "../../pages/Seller/sellerHeader";
import { IoCameraOutline } from "react-icons/io5";
import { getUserProfile } from "../../../reduxKit/actions/user/userProfile";
// import ProfileResponsive from './ProfileResponsive';
import { Link } from "react-router-dom";
import { UserProfileData } from "../../../interfaces/user/profile";
// import { Country } from '../../../interfaces/user/profile';

import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import LanguageSection from "../../Header/LanguageSection";
import FollowingModal from "./FollowingModal";
import FollowersModal from "./FollowerModal";
import { useSelector } from "react-redux";

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [dots, setDots] = useState("");
  const [formData, setProfiles] = useState<UserProfileData>();
  const [languages, setLanguages] = useState([]);

  // This is Following ModaL ***
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // It is Follower Modal
  const [isFollowersModalOpen, setIsFollowersModalOpen] = React.useState(false);
  const openFollowersModal = () => setIsFollowersModalOpen(true);
  const closeFollowersModal = () => setIsFollowersModalOpen(false);
  const dispatch = useDispatch<AppDispatch>();
  const { GetProfileloading } = useSelector(
    (state: RootState) => state.profile
  );

  

  const handleEditClick = (field: string) => {
    setIsEditing(field);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setProfiles((prev) => ({
      ...(prev as UserProfileData),
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    setIsEditing(null);
    console.log(formData);
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };
  if (GetProfileloading) {
    console.log("the data of the content ");
  }


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resultAction = await dispatch(getUserProfile());
        if (getUserProfile.fulfilled.match(resultAction)) {
          const { data } = resultAction.payload;
          console.log("kidu profile $#$#$#$#$", data);

          setProfiles(data.data);
          setLanguages(data.data.languages);
          console.log(
            "Profile data fetched successfully: ",
            resultAction.payload
          );
        } else {
          console.log(
            "Failed to fetch profile: ",
            resultAction.payload || resultAction.error
          );
        }
      } catch (error) {
        console.error("Unexpected error while fetching the profile: ", error);
      }
    };

    fetchProfile();
  }, [dispatch]);

  useEffect(() => {
    console.log("this is my profiles of in page *****************", formData);
    console.log("my languages are", languages);
  }, [formData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);




  return (
    <div className="w-full h-full bg-gray-300">
      <div className="w-full h-[90px]">
        <SellerHeader />
      </div>

      <div className="w-full h-[1500px] profile-main     relative">
        <div
          className="banner-section relative cover-photo"
          style={{
            background: coverImage
              ? `url(${coverImage}) center/cover no-repeat`
              : `url('../../../assets/Images/profile-bg.avif')`,
          }}
        >
          {!coverImage && (
            <div className="flex flex-col  pr-[10px] relative">
              <h1
                className="text-[21px] font-medium"
                style={{ fontFamily: "Unbounded" }}
              >
                Replace banner image
              </h1>
              <p className="text-[15px]">Image dimension: 1920px x 200px</p>
            </div>
          )}

          {coverImage ? (
            <div className="cover-pic-button  absolute right-[10px] bottom-[10px]">
              <label
                htmlFor="cover"
                className="flex cursor-pointer items-center justify-center gap-2 rounded   py-1 px-2 text-sm font-medium text-primary hover:bg-opacity-90"
              >
                <input
                  type="file"
                  id="cover"
                  className="sr-only"
                  onChange={(e) => handleImageChange(e, setCoverImage)}
                />
                <span
                  className="text-white px-[10px] text-[21px] py-[10px] rounded-full"
                  style={{ backgroundColor: "#03042F" }}
                >
                  <IoCameraOutline />
                </span>
              </label>
            </div>
          ) : (
            <div className="cover-pic-button   ">
              <label
                htmlFor="cover"
                className="flex cursor-pointer items-center justify-center gap-2 rounded bg-white py-1 px-2 text-sm font-medium text-primary hover:bg-opacity-90"
              >
                <input
                  type="file"
                  id="cover"
                  className="sr-only"
                  onChange={(e) => handleImageChange(e, setCoverImage)}
                />
                <span
                  className="text-white px-[10px] text-[21px] py-[10px] rounded-full"
                  style={{ backgroundColor: "#03042F" }}
                >
                  <IoCameraOutline />
                </span>
              </label>
            </div>
          )}
        </div>

        <div className="main-section bg-white relative">
          <div className="absolute top-[120px] right-[450px] flex flex-col gap-[10px] justify-center items-center">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png"
              alt=""
              className="w-[200px]"
            />
            <h1 style={{ fontFamily: "Unbounded" }} className="text-[22px]">
              No Offers yet
            </h1>
            <Link to={"/"}>
              {" "}
              <button className="text-white bg-blue-950 px-[18px] py-[10px] text-[18px] rounded-[8px]">
                Start Selling
              </button>
            </Link>
          </div>
        </div>

 


        <section className="absolute w-[380px] h-auto profile-section rounded-[14px] left-[140px] top-[60px] py-[25px] px-[26px] flex flex-col justify-start items-center gap-[30px]">
  <div className="">
    {GetProfileloading ? (
     <div className="flex flex-col items-center py-4">
     <div className="w-9 h-9 border-[5px] border-[#101441] border-t-transparent rounded-full animate-spin shadow-lg"></div>
     <p className="mt-2 text-[15px] font-semibold text-[#101441]"  style={{ fontFamily: "Unbounded" }}>Loading{dots}</p>
   </div>
    
    ) : (
      <div className="profile-content">
        <div className="flex justify-center mb-4">
          <div className="h-30 rounded-full bg-black/5 p-1 backdrop-blur sm:p-3">
            <div className="w-[115px] h-[115px] bg-red-500 text-white flex items-center justify-center rounded-full text-[55px] relative drop-shadow-2">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                "B"
              )}
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-black text-primary hover:bg-opacity-90 sm:bottom-2 sm:right-2 p-[8px]"
              >
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                    fill=""
                  />
                </svg>
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="sr-only"
                  onChange={(e) => handleImageChange(e, setProfileImage)}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <h2
            className="text-[16px] primary-color"
            style={{ fontFamily: "Unbounded" }}
          >
            {formData?.userName}
          </h2>
          <p>Level {formData?.level.level}</p>
          <div className="mb-4">
            <div className="flex justify-between my-[6px]">
              <p>Level {formData?.level.level}</p>
              <p>
                {formData?.level?.level ? formData.level.level + 1 : "N/A"}
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-red-500 h-2.5 rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="py-[10px] w-full flex justify-center items-center pb-[18px]"></div>

        <div className="w-full space-y-6">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-4 w-full mr-[10px]">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Firstname</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">
                  {formData?.lastName}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <div>
              <p className="text-sm text-gray-600">{formData?.email}</p>
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-sm text-gray-600">
              Gender {formData?.gender}
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <div>
              <p className="text-sm text-gray-600">
                Date of Birth:{" "}
                {formData?.dob
                  ? new Date(formData.dob).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : ""}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-[19px]">
          <div>
            <p className="text-sm text-gray-600">Description</p>
            {isEditing === "description" ? (
              <textarea
                name="description"
                value={formData?.description ?? ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-2 py-1 my-2"
                rows={3}
                cols={30}
              ></textarea>
            ) : (
              <p className="text-gray-800">{formData?.description}</p>
            )}
          </div>
          <FaEdit
            className="cursor-pointer text-gray-500"
            onClick={() => handleEditClick("description")}
          />
        </div>

        {isEditing && (
          <button
            className="w-full primary-background text-white py-2 px-4 rounded-md font-medium hover:bg-blue-900 mt-4"
            onClick={handleSaveClick}
          >
            Save Changes
          </button>
        )}

        <p className="text-sm text-gray-600 pt-4 pb-2">Country</p>
        <LanguageSection />
        <hr className="my-4" />
        
        <div className="text-center mb-4 text-sm text-gray-500 flex justify-between">
          <p>Member since</p>
          <p className="font-medium">
            {formData?.memberSince
              ? new Date(formData.memberSince).toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })
              : "N/A"}
          </p>
        </div>
        
        <hr className="my-4" />
        
        <div className="flex justify-between text-center text-sm text-gray-500">
          <div onClick={openFollowersModal} className="cursor-pointer">
            <p className="font-medium text-gray-800">
              {formData?.followersCount}
            </p>
            <p>Followers</p>
          </div>
          <div onClick={openModal} className="cursor-pointer">
            <p className="font-medium text-gray-800">
              {formData?.folowingCount}
            </p>
            <p>Following</p>
          </div>
        </div>

        <hr className="my-4" />

        <div className="text-center mb-4 flex justify-between">
          <p className="text-sm text-gray-500">Successful delivery</p>
          <div>
            <p className="font-medium text-gray-800">
              {formData?.succesfullDeliveries}
            </p>
            <p className="text-xs text-gray-500">
              (Total lifetime orders: 0)
            </p>
          </div>
        </div>

        <hr className="my-4" />

        <div className="text-center mb-4 text-sm text-gray-500 flex justify-between">
          <p>Blocked User Count</p>
          <p className="font-medium">{formData?.blockedUsersCount}</p>
        </div>
      </div>
    )}
  </div>
</section>










      </div>

      <FollowingModal isOpen={isModalOpen} onClose={closeModal} />
      <FollowersModal
        isOpen={isFollowersModalOpen}
        onClose={closeFollowersModal}
      />

      {/* <ProfileResponsive /> */}
      <section className="lg:hidden block w-[100%] h-[100%] profile-section   pb-[25px]   flex flex-col justify-start items-center gap-[30px]">
        <div>
          <div
            className="flex justify-center mb-4 relative pt-[22px]"
            style={{
              background: coverImage
                ? `url(${coverImage}) center/cover no-repeat`
                : `url('../../../assets/th.jpg')`,
            }}
          >
            {!coverImage && (
              <div className="cover-pic-button  absolute right-[0px] top-[0px]">
                <label
                  htmlFor="cover"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded   py-1 px-2 text-sm font-medium text-primary hover:bg-opacity-90"
                >
                  <input
                    type="file"
                    id="cover"
                    className="sr-only"
                    onChange={(e) => handleImageChange(e, setCoverImage)}
                  />
                  <span
                    className="text-white px-[6px] text-[18px] py-[6px] rounded-full"
                    style={{ backgroundColor: "#03042F" }}
                  >
                    <IoCameraOutline />
                  </span>
                </label>
              </div>
            )}

            <div className="  h-30     rounded-full bg-black/5 p-1 backdrop-blur   sm:p-3">
              <div className="w-[115px] h-[115px] bg-red-500 text-white flex items-center justify-center rounded-full text-[55px] relative drop-shadow-2 ">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  "B"
                )}
                <label
                  htmlFor="profile"
                  className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-black text-primary hover:bg-opacity-90 sm:bottom-2 sm:right-2 p-[8px]"
                >
                  <svg
                    className="fill-current"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                      fill=""
                    />
                  </svg>
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    className="sr-only"
                    onChange={(e) => handleImageChange(e, setProfileImage)}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="px-[35px]">
            <div className="text-center mb-4">
              <h2
                className="text-[16px] primary-color"
                style={{ fontFamily: "Unbounded" }}
              >
                {formData?.userName}
              </h2>
              <p className="text-gray-500">Level {formData?.level.level}</p>
              <div className="mb-4">
                <div className="flex justify-between my-[6px]">
                  <p>Level {formData?.level.level}</p>
                  <p>
                    {formData?.level?.level ? formData.level.level + 1 : "N/A"}
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-red-500 h-2.5 rounded-full"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="py-[10px] w-full flex justify-center items-center pb-[18px]">
              <LanguageSwitcher />
            </div>
            <div className="w-full space-y-6">
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-4 w-full mr-[10px]">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">
                      {formData?.firstName}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">
                      {formData?.lastName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <div>
                  {/* <p className="text-sm text-gray-600">Email</p> */}
                </div>
              </div>

              {/* Gender */}
              <div className="flex justify-between items-center w-full">
                <div>
                  <p className="text-sm text-gray-600">
                    Gender {formData?.gender}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <div>
                  <p className="text-sm text-gray-600">
                    Date of Birth : {formData?.dob}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-[19px]">
              <div>
                <p className="text-sm text-gray-600">Description</p>
                {isEditing === "description" ? (
                  <textarea
                    name="description"
                    value={formData?.description ?? ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1 my-2"
                    rows={3}
                    cols={30}
                  ></textarea>
                ) : (
                  <p className="text-gray-800">{formData?.description}</p>
                )}
              </div>
              <FaEdit
                className="cursor-pointer text-gray-500"
                onClick={() => handleEditClick("description")}
              />
            </div>

            {isEditing && (
              <button
                className="w-full primary-background text-white py-2 px-4 rounded-md font-medium hover:bg-blue-900 mt-4"
                onClick={handleSaveClick}
              >
                Save Changes
              </button>
            )}
            <p className="text-sm text-gray-600 pt-4 pb-2">Country</p>
            {/* <div className="pb-4 flex  items-center justify-between">
     
        <select
          className="w-full border rounded-md p-2 mr-[10px]"
          onChange={(e) => {
            const selected = countries.find((c) => c.name === e.target.value);
            setSelectedCountry(selected || null);
          }}
        >
          <option value="">Select a Country</option>
          {countries.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        {selectedCountry && (
          <div className="flex items-center ">
            <img
              src={selectedCountry.flag}
              alt={selectedCountry.name}
              className="w-8 h-5 mr-2"
            />
            <span>{selectedCountry.dialCode}</span>
          </div>
        )}
      </div>        */}
            <hr className="my-4" />
            <div className="text-center mb-4 text-sm text-gray-500 flex justify-between">
              <p>Member since</p>
              {new Date(formData?.memberSince ?? "1970-01-01").toLocaleString(
                "en-US",
                {
                  month: "long",
                  year: "numeric",
                }
              )}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-center text-sm text-gray-500">
              <div>
                <p className="font-medium text-gray-800">
                  {formData?.followersCount}
                </p>
                <p>Followers</p>
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {formData?.folowingCount}
                </p>
                <p>Following</p>
              </div>
            </div>

            <hr className="my-4" />

            <div className="text-center mb-4 flex justify-between">
              <p className="text-sm text-gray-500">Successful delivery</p>
              <div>
                <p className="font-medium text-gray-800">
                  {formData?.succesfullDeliveries}
                </p>
                <p className="text-xs text-gray-500">
                  (Total lifetime orders: 0)
                </p>
              </div>
            </div>

            <hr className="my-4" />

            <div className="text-center mb-4 text-sm text-gray-500 flex justify-between">
              <p>Blocked User Count</p>
              <p className="font-medium">{formData?.blockedUsersCount}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
