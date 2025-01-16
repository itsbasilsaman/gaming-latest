import React, { Fragment,Suspense,lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { UserLogin } from "./components/forms/user/userLogin";
import { UserRegister } from "./components/forms/user/userSignup";
const WelcomePage = lazy(() => import("./components/pages/welcome"))
 
 
import { PasswordChange } from "./components/forms/user/changePassword";
import Category from "./components/pages/category";
import About from "./components/pages/about";
import { Toaster } from "react-hot-toast";
import ChatComponent from "./components/pages/user/chat";
import ScrollToTop from "./ScrollToTop";
import { Profile } from "./components/forms/user/userProfile";
import EmailVerification from "./components/forms/user/emailVerification";
import { MainVerification } from "./components/forms/user/phoneVerification";
import TopUpSection from "./components/pages/Topup/topupSection";
import SellerPage from "./components/pages/Seller/sellerPage";
import { MainDetails } from "./components/forms/user/mainDetails";
import { Loading } from "./Loading";
 
 
 
 
 

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
        <Route path="/user/mainVerification" element={<MainVerification/>} />
 
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
        <Route path="/mainDetails" element={<MainDetails/>} />
        {/* <Route path="/loading" element={<Loading/>} /> */}
        <Route path="/error" element={<Loading/>} />
      </Routes>
        </Suspense>
    </Fragment>
  );
});



