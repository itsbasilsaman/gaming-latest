/* eslint-disable @typescript-eslint/no-explicit-any */

import CardBackground from '../../../assets/Card/gamecardbg.png';
import React, { useEffect, useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import Icon from '../../../assets/Images/chevron-down.png';
import { CiHeart } from "react-icons/ci";

import { useDispatch } from 'react-redux';
import { GetOffersByBrand } from '../../../reduxKit/actions/user/userOfferListing';
import { AppDispatch } from '../../../reduxKit/store';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface GameSectionOneProps {
  productId: string | null;
  image: string|undefined
  name: string | null;
  ServiceName: string | null;
}

const GameSectionOne: React.FC<GameSectionOneProps> = React.memo(({ productId, image, name, ServiceName }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate=useNavigate()
  const [offers,setOffers]=useState<any[]>([])
  const [selectedOption, setSelectedOption] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setSelectedOption(event.target.value);
  };

   useEffect(()=>{

    const GetOffersByProduct= async () => {
      try {
        console.log(productId);
        
        if(productId){
          const response = await dispatch(GetOffersByBrand(productId))
          const data = response.payload as { data: { data: any } };
            console.log("response of the GetOffersByBrand ", data.data.data.data);
            setOffers(data.data.data.data.offers)
        }
      } catch (error:any) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text:error.message || "Offer Not Fetched",
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


    }
    GetOffersByProduct()
   },[dispatch])

   if(offers){
console.log('the offers ', offers);


   }
  
   const handleOfferDetails=async(id:string)=>{
    try {
      console.log("peera id ", id);
      if(id){
        navigate(`/user/Category?offerId=${id}`)
      }
      
    } catch (error) {
      console.log(error);
      
    }
   }

  return (
      <main className='w-full h-auto text-white md:px-[80px] px-[20px] flex flex-col lg:items-center pb-[40px]'>
          <p className='lg:pt-[130px] pt-[110px] lg:pb-[40px] pb-[20px] text-[14px] lg:text-[16px] text-left w-[100%]'>
              Home / {ServiceName} /{name}
          </p>
          <div className='w-[100%] lg:h-[182px] h-[154px] gamecard-box rounded-[13px] relative lg:px-[15px] flex lg:justify-between'>
              <img src={CardBackground} className='object-cover absolute top-[0px] left-[0px] w-[100%] h-[100%] rounded-[12px]' style={{ zIndex: '-10', objectFit: 'cover' }} />
              <div className='flex lg:flex-row flex-col justify-center lg:items-center pb-[25px] lg:pt-[0px] pt-[18px] lg:pb-[0px] lg:gap-[25px] gap-[12px] w-[100%] lg:w-auto px-[20px] lg:px-[0px]'>
                  <h1 className='lg:text-[40px] text-[28px] font-bold' style={{ fontFamily: 'Unbounded' }}>Clash of Clans</h1>
                  <p className='offer-box px-[12px] py-[8px] w-[120px] cursor-pointer'>148 Offers</p>
              </div>
             <div className='flex justify-center items-center h-full'>
               <img src ={image} alt="" className='lg:h-[140px] hidden lg:block' />
             </div>
            
          </div>

          {/* Remove the incorrect extra closing main here */}
 
          <div className='w-full h-auto mt-12 text-white'>
              <div className='flex lg:justify-between items-center  lg:flex-row flex-col gap-[20px] lg:gap-[0px]'>
                  <div className='relative extralg:w-[912px] lg:w-[492px] h-[48px] w-[100%]'>
                      <input type="text" className='extralg:w-[912px] lg:w-[492px] h-[48px] about-inputbox rounded-[1000px] w-[100%]' placeholder='Search for' />
                      <IoSearchSharp className='absolute right-[14px] text-[22px] top-[13px]' />
                  </div>
                  <div className='flex lg:gap-[20px] w-[100%] lg:w-auto justify-between lg:justify-normal'>
                      <span className='relative'>
                          <button className='blur-button px-[19px] py-[9px] pr-[59px] lg:text-[17px] rounded-[1000px]'>Region</button>
                          <img src={Icon} alt="" className='absolute right-[8px] top-[12px]' />
                      </span>
                      <span className='relative'>
                          <button className='blur-button px-[19px] py-[9px] pr-[35px] lg:text-[17px] rounded-[1000px]'>Delivery Method</button>
                          <img src={Icon} alt="" className='absolute right-[8px] top-[12px]' />
                      </span>
                  </div>
              </div>

              <div className='lg:flex lg:justify-between lg:pt-[55px] pt-[40px]'>
                  <h1 style={{ fontFamily: 'Unbounded' }} className='text-[20px] py-2 lg:py-0'>15 Top Ups</h1>
                  <div className='flex lg:gap-[50px] lg:flex-row justify-between lg:justify-normal py-[11px] py-[6px]'>
                      <p className='lg:text-[18px]'>Sort by</p>
                      <div className='flex lg:gap-[20px] gap-[9px]'>
                          <label className='lg:text-[18px]'>
                              <input
                                  type="radio"
                                  value="Option 1"
                                  checked={selectedOption === "Option 1"}
                                  onChange={handleChange}
                                  className='mr-[5px]'
                              />
                              Lowest Price
                          </label>
                          <label className='lg:text-[18px]'>
                              <input
                                  type="radio"
                                  value="Option 2"
                                  checked={selectedOption === "Option 2"}
                                  onChange={handleChange}
                                  className='mr-[5px]'
                              />
                              Trending
                          </label>
                      </div>
                  </div>
              </div>  
              {offers.map((MyOffer, index) => (

              <div key={index} onClick={()=>handleOfferDetails(MyOffer.id)}>
                  <div className='top-up-section lg:gap-[19px] lg:pt-[25px] pt-[5px] pb-[25px]'>
                      <section className='lg:h-[125px] rounded-[16px] top-up-box p-[19px] flex flex-col justify-between'>
                          <div className='flex justify-between'>
                              <h1 className='text-[20px] font-medium'>{MyOffer.title}</h1>
                              <CiHeart className='text-[44px]' />
                          </div>
                          <div className='flex justify-between items-center'>
                              <p className='game-offer-button py-[6px] px-[8px] rounded-[8px]'>{MyOffer.apiQty}Offer</p>
                              <p className='font-semibold text-[18px]' style={{ color: 'rgba(0, 255, 121, 1)' }}>{MyOffer.unitPriceUSD} USD</p>
                              <p className='font-semibold text-[18px]' style={{ color: 'rgba(0, 255, 121, 1)' }}>{MyOffer.unitPriceSAR} SAR</p>
                          </div>
                      </section>
                  </div>
              </div>
                        ))}
          </div>
      </main>
  );
});

export default GameSectionOne;
