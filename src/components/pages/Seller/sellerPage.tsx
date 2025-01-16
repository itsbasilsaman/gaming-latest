import React from 'react';
import { SellerHeader } from './sellerHeader';
import { SellerHome } from './sellerHome';
import WhySellWithUs from './whySellWithUsPage';
import Testimonials from './Testimonials';
// import Card from './Card';
 

const SellerPage: React.FC = () => {
  return (
     <div className='bg-white '>
     <SellerHeader/>
     <SellerHome/>
     <WhySellWithUs/>
     <Testimonials/>
     {/* <Card/> */}
     </div>
  );
};

export default SellerPage;
