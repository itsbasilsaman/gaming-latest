import React, { useEffect, useState } from 'react';

import CardOutline from '../../../assets/Images/card-outline.png';
import Shape from '../../../assets/Images/Shape.png';
import Vector from '../../../assets/Images/Vector.png';
import Plus from '../../../assets/Images/Plus.png';
import Minus from '../../../assets/Images/Minus.png';
import Swal from 'sweetalert2';
import { IOfferDetails } from '../../../interfaces/user/offerDetailsInterface';
import { useDispatch } from 'react-redux';

import { GetOffersDetail } from '../../../reduxKit/actions/user/userOfferListing';
import { AppDispatch } from '../../../reduxKit/store';


interface OfferDetailsProps {
  offerId?:string|undefined
}

const CategorySectionOne: React.FC<OfferDetailsProps>  = React.memo(({offerId}) => {

  const dispatch=useDispatch<AppDispatch>()
  const [count, setCount] = useState(0);  
  const [offerDetail,setOfferDetails]=useState<IOfferDetails>()
  const [TotalAmount,setTotalAmount]=useState<number>()
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));
  
  
  useEffect(()=>{
    const getOfferDetailsWithOfferId= async()=>{
      try {
        console.log("my current offfer id ", offerId);
        const response= await dispatch(GetOffersDetail(offerId))
        console.log("hte response of the data ", response.payload);
        if(response.payload.success===true){
          await setOfferDetails(response.payload.data)
          await setTotalAmount(offerDetail?.unitPriceSAR)
        }
      } catch (error) {
          console.log(error);   
      }
    }
    getOfferDetailsWithOfferId()
  },[dispatch,offerId])
if(offerDetail){
console.log("my last offer details : ",offerDetail);
}
  const hanglebrandTopup = ()=>{
    Swal.fire({
      icon: "warning",
      title: false,
      text: "Please integrate the payment gateway",
      timer: 3000,
      toast: true,
      showConfirmButton: false,
      timerProgressBar: true,
      background: "#fff4e5", // Light orange background for warning
      color: "#856404", // Darker orange text color
      iconColor: "#fd7e14", // Custom color for the warning icon
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer); // Pause timer on hover
        toast.addEventListener("mouseleave", Swal.resumeTimer); // Resume timer on mouse leave
      },
      showClass: {
        popup: "animate_animated animate_fadeInDown", // Animation when the toast appears
      },
      hideClass: {
        popup: "animate_animated animate_fadeOutUp", // Animation when the toast disappears
      },
    });
  }
  return ( 
    <main className='w-full h-auto pb-[40px]   text-white'> 
      <p className='pt-[120px] md:px-[80px] text-[14px] lg:text-[16px] px-[20px]'>Home / {offerDetail?.product.service.name} {`>`}  {offerDetail?.product.subService ?offerDetail?.product.subService.name : `>` } {`>`} {offerDetail?.product.brand.name} {`>`} </p>
      <h1 style={{fontFamily:'Unbounded'}} className='lg:py-[17px] py-[10px] lg:text-[27px] text-[24px] md:px-[80px] px-[20px]'> {offerDetail?.title}</h1>
      <div className='flex justify-between  lg:hidden py-[14px] md:px-[80px] px-[20px]'>
                  <div className='flex gap-[12px]'>
                     <img src={Shape} alt="" className='lg:w-[70px] w-[62px]' />
                     <div >                 
                      <p>Level 12</p>
                     </div>
                  </div>
                   <img src={Vector} alt="" style={{objectFit:'contain'}} className='w-[45px] lg:w-auto' />
               </div>
      <section className='w-[100%] h-auto category-section lg:gap-[25px] md:px-[80px] px-[20px] '  >
          <div className='category-section-one rounded-[16px] lg:px-[34px] px-[16px] py-[36px] w-full my-[15px] lg:my-[0px]'>
              <h1 className='lg:text-[20px] text-[18px] font-bold'>Product Info </h1>
              <div className='line pt-[29px]  '></div>
              <div className='w-full outline-section py-[20px]'>
                {/* <div className='flex justify-between lg:items-center'> */}
                 {/* <div className='flex lg:gap-[7px] gap-[5px]'>
                    <img src={AlarmOutline} alt="Alarm-outline object-cover" className='lg:w-[20px]' />
                    <h1 className='font-semibold'>Delivery Speed:</h1>
                 </div> */}
                 {/* <p>50 mins (30.77%)</p> */}
                {/* </div> */}
                <h1 className='block lg:hidden font-semibold text-[18px]'>Details:</h1>
                <div className='flex justify-between lg:items-center'>
                  <div className='flex lg:gap-[7px] gap-[5px]'>
                      <img src={CardOutline} alt="Alarm-outline" className='lg:w-[20px]' />
                      <h1 className='font-semibold'>Delivery Method: </h1>
                  </div>
                  <p>Direct Top Up</p>
                </div>
              </div>
              <div className='line  hidden lg:block'></div>
              <h1 className='lg:text-[20px] lg:font-bold lg:py-[14px] hidden lg:block'>Details:</h1>
              <p className='pb-[8px] lg:pb-[0px]'>Fill Up Order Form And Provide Details Like This</p>
              <p> ➤ <span className='font-semibold'>Account Box</span>: Write There Your Game Account Linked / Connect Mail Adress. </p>
              <p>➤ <span className='font-semibold'>Password Box</span>: Type Anything No Need Account Password.</p>
              <p> ➤ <span className='font-semibold'>Username Box</span>: Your Game Account Name </p>
              <p>➤ <span className='font-semibold'>Server Id Box</span>: Type Supercell Id  Please send us your email registered with Supercell and login code How to take log in code: Log out Supercell account ingame Log in Game will send 6 digits code to email  Send us that code.</p>
          </div>
          <div className='category-section-two rounded-[16px] lg:py-[18px] px-[23px] hidden lg:block'  >
               <div className='flex justify-between'>
                  <div className='flex gap-[12px]'>
                     <img src={Shape} alt="" className='lg:w-[70px]' />
                     <div >
                      <p className='lg:text-[18px] underline'>{offerDetail?.seller.userName}</p>
                      <p>Level 1</p>
                     </div>
                  </div>
                   <img src={Vector} alt="" style={{objectFit:'contain'}} />
               </div>
                   <div className=" justify-center flex  ">

               <div className=' items-center lg:text-[18px] flex justify-between  lg:py-[12px] h-10  rounded-lg w-full '>
               <h2>Minimum PQT : {offerDetail?.minQty}  </h2>
               <h2>Available : {offerDetail?.apiQty}  </h2>
                   </div>
               </div>
               <h1 className='lg:text-[18px] lg:py-[20px] font-semibold'>Total Amount:</h1>
               <h1 style={{color:'rgba(0, 255, 121, 1)'}} className='lg:text-[25px] font-bold'>{TotalAmount} SAR</h1>
               <div className="w-full h-[56px] counter rounded-[1000px] lg:mt-[23px] flex justify-between items-center px-[8px]">
      <img src={Plus} alt="Increase" onClick={increment} className="cursor-pointer" />
      <p className="text-[19px] font-semibold">{count}</p>
      <img src={Minus} alt="Decrease" onClick={decrement} className="cursor-pointer" />
    </div>
               <button onClick={hanglebrandTopup} className='w-full lg:h-[56px] rounded-[1000px] lg:mt-[18px] text-[18px] font-medium buy-now-button'   >Buy now</button>
          </div>
      </section>
      <div className='lg:hidden block md:mx-[80px] mx-[20px] px-[10px] py-[22px] flex justify-center items-start flex-col gap-[12px] rounded-[16px]' style={{border: '2px solid rgba(255, 255, 255, 0.214)'}}>
                <h1 className='text-[18px] lg:py-[20px] font-semibold'>Total Amount:</h1>
               <h1 style={{color:'rgba(0, 255, 121, 1)' , fontFamily:'Unbounded'}} className='lg:text-[25px] text-[22px] font-bold'>{TotalAmount }  SAR </h1>
               <div className="w-full h-[56px] counter rounded-[1000px] lg:mt-[23px] flex justify-between items-center px-[8px]">
      <img src={Plus} alt="Increase" onClick={increment} className="cursor-pointer" />
      <p className="text-[19px] font-semibold">{count}</p>
      <img src={Minus} alt="Decrease" onClick={decrement} className="cursor-pointer" />
    </div>
      </div>
     <div className='block lg:hidden py-[19px] px-[18px] fixed bottom-[0px] left-[0px] right-[0px]' style={{backgroundColor:'#271D8E'}}>
       <button onClick={hanglebrandTopup} className='w-full lg:h-[56px] py-[12px] lg:py-[0px] rounded-[1000px] lg:mt-[18px] text-[18px] font-medium buy-now-button'  >Buy now</button>
     </div>
    </main>
  );
});

export default CategorySectionOne;
