import React, { Fragment,Suspense,lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./ScrollToTop";
import { Loading } from "./Loading";
import { useNavigate } from "react-router-dom"; 
import { ToggleProfile } from "./components/pages/user/ToggleProfile";
import SellerRegistrationForm from "./components/seller/forms/SellerRegistrationForm";
import LanguageSection from "./components/Header/LanguageSection";
import CreateOfferPage from "./components/pages/Seller/CreateOfferPage";
import AddNewOfferSection from "./components/pages/Seller/AddNewOfferSection";
import OfferDetailPage from "./components/pages/Seller/offerDetailPage";

import { useDispatch } from "react-redux";
import { AppDispatch } from "./reduxKit/store";
import { userProfile } from "./reduxKit/actions/user/userProfile";
import { UserProfileData } from "./interfaces/user/profile";
import { getATKWithRTKUser } from "./reduxKit/actions/auth/authAction";

import NotFound404 from "./notFound404";
import NotFound401 from "./notFound401";

// import HorizontalScrollSection from "./components/forms/user/HorizontalScrollSection";

const WelcomePage = lazy(() => import("./components/pages/welcome"))
const UserLogin = lazy(()=> import('./components/forms/user/userLogin'))
const UserRegister = lazy(()=> import('./components/forms/user/userSignup'))
const PasswordChange = lazy(()=> import('./components/forms/user/changePassword'))
const Category = lazy(()=> import('./components/pages/category'))
const ChatComponent = lazy(()=> import('./components/pages/user/chat'))
const About = lazy(()=> import('./components/pages/about'))
const Profile = lazy(()=> import('./components/forms/user/userProfile'))
const EmailVerification = lazy(()=> import('./components/forms/user/emailVerification'))
const TopUp = lazy(()=> import('./components/pages/Topup/TopUp'))
const SellerPage = lazy(()=> import('./components/pages/Seller/sellerPage'))
 
// import { MainVerification } from "./components/forms/user/phoneVerification";
// import { MainDetails } from "./components/forms/user/mainDetails";
// import UserLogin from './components/forms/user/userLogin';

export const App: React.FC = React.memo(() => {
const dispatch=useDispatch<AppDispatch>()
const navigate = useNavigate();
    const [formData,setProfiles]= useState<UserProfileData>()

    useEffect(() => {
      const fetchProfile = async () => {
        try {
         
          const resultAction = await dispatch(userProfile());
          // console.log("resutfoterf()()()",resultAction.payload.success);
          
          if (userProfile.fulfilled.match(resultAction)) {
  
            const { data, status } = resultAction.payload;
            console.log("teh status",status);
            setProfiles(data)
          } else  {
              const response= await dispatch(getATKWithRTKUser()) 
              console.log('koooooooooooraaaaaaaaa', response);
              if (getATKWithRTKUser.fulfilled.match(response)) {
                console.log("Access token refreshed: ", response.payload);
               const reponse = await dispatch(userProfile());
                 console.log("the response_)((***)) dta ", reponse);
                 
              } else {
                console.log("Token refresh failed! Redirecting to login...");
                navigate("/");
              }
          }
        } catch (error) {
          console.error("Unexpected error while fetching the profile: ", error);

        }
      };
      fetchProfile();
    }, [dispatch,navigate]);
    
    if(formData){
      console.log("App.tsx",formData);
      
    }


  return (
    <Fragment>
      <Toaster position="top-center" />
      <ScrollToTop/>
      <Suspense fallback={<Loading/>}>
      <Routes>
      <Route path='/' element={<WelcomePage/>} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserRegister/>} />
        {/* <Route path="/user/mainVerification" element={<MainVerification/>} /> */}
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/changePassword" element={<PasswordChange />} />
        <Route path="/user/Category" element={<Category />} />
        <Route path="/about" element={<About />} />
        <Route path="/chat" element={<ChatComponent/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/user/emailVerification" element={<EmailVerification/>} />
        <Route path="/user/changepassword" element={<PasswordChange/>} />
        <Route path="/user/topup" element={<TopUp/>} />
        <Route path="/user/seller" element={<SellerPage/>} />
        {/* <Route path="/mainDetails" element={<MainDetails/>} /> */}
        {/* <Route path="/loading" element={<Loading/>} /> */}
        <Route path="/error" element={<Loading/>} />
        <Route path="/toggle" element={<ToggleProfile/>} />
        <Route path="/user/sellerSignup" element={<SellerRegistrationForm/>} />
        <Route path="/user/languageSelect" element={<LanguageSection/>} />
        <Route path="/createoffer" element={<CreateOfferPage/>} />
        <Route path="/addoffer" element={<AddNewOfferSection/>} />
        <Route path="/offerdetail" element={<OfferDetailPage/>} />
        <Route path="/404" element={<NotFound404/>} />
        <Route path="/401" element={<NotFound401/>} />
      </Routes>
        </Suspense>
    </Fragment>
  );
});




