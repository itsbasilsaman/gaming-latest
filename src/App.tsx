import React, { Fragment,Suspense,lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./ScrollToTop";
import { Loading } from "./Loading";
import { ToggleProfile } from "./components/pages/user/ToggleProfile";
import SellerRegistrationForm from "./components/seller/forms/SellerRegistrationForm";
import LanguageSection from "./components/Header/LanguageSection";
import CreateOfferPage from "./components/pages/Seller/CreateOfferPage";
import AddNewOfferSection from "./components/pages/Seller/AddNewOfferSection";
import OfferDetailPage from "./components/pages/Seller/offerDetailPage";
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
        <Route path="/loading" element={<Loading/>} />
        <Route path="/error" element={<Loading/>} />
        <Route path="/toggle" element={<ToggleProfile/>} />
        <Route path="/user/sellerSignup" element={<SellerRegistrationForm/>} />
        <Route path="/user/languageSelect" element={<LanguageSection/>} />
        <Route path="/createoffer" element={<CreateOfferPage/>} />
        <Route path="/addoffer" element={<AddNewOfferSection/>} />
        <Route path="/offerdetail" element={<OfferDetailPage/>} />
      </Routes>
        </Suspense>
    </Fragment>
  );
});




