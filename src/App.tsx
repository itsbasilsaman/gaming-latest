import React, { Fragment,Suspense,lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./ScrollToTop";
import { Loading } from "./Loading";
import { ToggleProfile } from "./components/pages/user/ToggleProfile";
import SellerRegistrationForm from "./components/seller/forms/SellerRegistrationForm";
import LanguageSection from "./components/Header/LanguageSection";
import HorizontalScrollSection from "./components/forms/user/HorizontalScrollSection";

const WelcomePage = lazy(() => import("./components/pages/welcome"))
const UserLogin = lazy(()=> import('./components/forms/user/userLogin'))
const UserRegister = lazy(()=> import('./components/forms/user/userSignup'))
const PasswordChange = lazy(()=> import('./components/forms/user/changePassword'))
const Category = lazy(()=> import('./components/pages/category'))
const ChatComponent = lazy(()=> import('./components/pages/user/chat'))
const About = lazy(()=> import('./components/pages/about'))
const Profile = lazy(()=> import('./components/forms/user/userProfile'))
const EmailVerification = lazy(()=> import('./components/forms/user/emailVerification'))
const TopUpSection = lazy(()=> import('./components/pages/Topup/topupSection'))
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
        <Route path="/user/topup" element={<TopUpSection/>} />
        <Route path="/user/seller" element={<SellerPage/>} />
        {/* <Route path="/mainDetails" element={<MainDetails/>} /> */}
        {/* <Route path="/loading" element={<Loading/>} /> */}
        <Route path="/error" element={<Loading/>} />
        <Route path="/toggle" element={<ToggleProfile/>} />
        <Route path="/languageselect" element={<LanguageSection/>} />
        <Route path="/sellerregistration" element={<SellerRegistrationForm/>} />
        <Route path="/scroll" element={<HorizontalScrollSection/>} />
      </Routes>
        </Suspense>
    </Fragment>
  );
});




