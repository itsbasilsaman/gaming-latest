 
import GameSectionThree from '../about/GameSectionThree'
import GameSectionFour from '../about/GameSectionfour'
import { Navbar } from '.././user/Navbar'
import Footer from '.././user/Footer'
import CardBackground from '../../../assets/Card/gamecardbg.png';
import BrawlCards from '../../../assets/Card/imgFourfour.png';
import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import Icon from '../../../assets/Images/chevron-down.png';
import { CiHeart } from "react-icons/ci";
import { Link } from 'react-router-dom';
function StarRail() {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedOption(event.target.value);
  };
  return (
    <> 
       <Navbar/>
       

       <main className='w-full h-auto   text-white md:px-[80px] px-[20px]  flex    lg:items-center flex-col  pb-[40px]'> 
      <p className='lg:pt-[130px] pt-[110px]  lg:pb-[40px] pb-[20px]  text-left w-[100%]'>Home / Games / Star Rail</p>
      <div className='  w-[100%] lg:h-[182px] h-[154px] gamecard-box rounded-[13px] relative lg:px-[15px] flex lg:justify-between  ' >
          <img src={CardBackground} className='object-cover absolute top-[0px] left-[0px] w-[100%]  h-[100%] rounded-[12px] ' style={{zIndex:'-10' , objectFit:'cover'}} />
         <div className='flex  lg:flex-row flex-col justify-center lg:items-center pb-[25px] lg:pt-[0px]   pt-[18px] lg:pb-[0px] lg:gap-[25px] gap-[15px] w-[100%] lg:w-auto px-[20px] lg:px-[0px]'>
            <h1 className='lg:text-[40px] text-[30px] font-bold' style={{fontFamily:'Unbounded'}}>Star Rail</h1>
            <p className='offer-box px-[12px] py-[8px] w-[120px] cursor-pointer '>178 Offers</p>
         </div>
         <img src={BrawlCards} alt="" className='lg:h-[120px] hidden lg:block' />
      </div>
    </main>
    <main className='md:px-[80px] px-[20px] w-full   h-auto  text-white  '>
    <div className='flex lg:justify-between items-center lg:flex-row flex-col gap-[20px] lg:gap-[0px]'>
   <div className='relative extralg:w-[912px] lg:w-[492px] h-[48px] w-[100%]'>
       <input type="text" className='extralg:w-[912px] lg:w-[492px] h-[48px] about-inputbox rounded-[1000px] w-[100%]' placeholder='Search for' />
       <IoSearchSharp className='absolute right-[14px] text-[22px] top-[13px]' />
   </div>
    <div  className='flex lg:gap-[20px] w-[100%] lg:w-auto justify-between  lg:justify-normal '>
       <span className='relative'>
         <button className='blur-button px-[19px] py-[9px] pr-[59px] lg:text-[17px] rounded-[1000px]'>Region</button>
         <img src={Icon} alt="" className='absolute right-[8px] top-[12px]' />
       </span>
       <span className='relative'>
         <button className='blur-button px-[19px] py-[9px]  pr-[35px] lg:text-[17px] rounded-[1000px]'>Delivery Method</button>
         <img src={Icon} alt="" className='absolute right-[8px] top-[12px]' />
       </span>
    </div>
    </div>
    <div className='lg:flex lg:justify-between lg:pt-[55px] pt-[40px]'>
        <h1 style={{fontFamily:'Unbounded'}} className='text-[23px]'>11 Top Ups</h1>
        <div className='flex lg:gap-[50px] lg:flex-row justify-between lg:justify-normal py-[11px] py-[6px]'>
         <p className='lg:text-[18px]'>Sort by:</p>
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
   
   <label  className='lg:text-[18px]'>
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
    <Link to={'/user/Category'}>
      <div className='top-up-section lg:gap-[19px] lg:pt-[25px]  pt-[5px] pb-[25px]'  >
         <section className='lg:h-[125px] rounded-[16px]  top-up-box p-[19px] flex flex-col justify-between'>
           <div className='flex justify-between'>
             <h1 className='text-[20px] font-medium'>Gold Pass</h1>
             <CiHeart className='text-[44px]' />
           </div>
           <div className='flex justify-between items-center'>
             <p className='game-offer-button py-[6px] px-[8px] rounded-[8px]'>12 Offer</p>
             <p className='font-semibold text-[22px]' style={{color:'rgba(0, 255, 121, 1)'}}>101 USD</p>
           </div>
         </section>
         <section className='lg:h-[125px] rounded-[16px]  top-up-box p-[19px] flex flex-col justify-between'>
           <div className='flex justify-between'>
             <h1 className='text-[20px] font-medium'>Gold Pass</h1>
             <CiHeart className='text-[44px]' />
           </div>
           <div className='flex justify-between items-center'>
             <p className='game-offer-button py-[6px] px-[8px] rounded-[8px]'>14 Offer</p>
             <p className='font-semibold text-[22px]' style={{color:'rgba(0, 255, 121, 1)'}}>54.23 USD</p>
           </div>
         </section>
         <section className='lg:h-[125px] rounded-[16px]  top-up-box p-[19px] flex flex-col justify-between'>
           <div className='flex justify-between'>
             <h1 className='text-[20px] font-medium'>Gold Pass</h1>
             <CiHeart className='text-[44px]' />
           </div>
           <div className='flex justify-between items-center'>
             <p className='game-offer-button py-[6px] px-[8px] rounded-[8px]'>12 Offer</p>
             <p className='font-semibold text-[22px]' style={{color:'rgba(0, 255, 121, 1)'}}>71 USD</p>
           </div>
         </section>
         <section className='lg:h-[125px] rounded-[16px]  top-up-box p-[19px] flex flex-col justify-between'>
           <div className='flex justify-between'>
             <h1 className='text-[20px] font-medium'>Gold Pass</h1>
             <CiHeart className='text-[44px]' />
           </div>
           <div className='flex justify-between items-center'>
             <p className='game-offer-button py-[6px] px-[8px] rounded-[8px]'>16 Offer</p>
             <p className='font-semibold text-[22px]' style={{color:'rgba(0, 255, 121, 1)'}}>141 USD</p>
           </div>
         </section>
         <section className='lg:h-[125px] rounded-[16px]  top-up-box p-[19px] flex flex-col justify-between'>
           <div className='flex justify-between'>
             <h1 className='text-[20px] font-medium'>Gold Pass</h1>
             <CiHeart className='text-[44px]' />
           </div>
           <div className='flex justify-between items-center'>
             <p className='game-offer-button py-[6px] px-[8px] rounded-[8px]'>17 Offer</p>
             <p className='font-semibold text-[22px]' style={{color:'rgba(0, 255, 121, 1)'}}>11 USD</p>
           </div>
         </section>
         <section className='lg:h-[125px] rounded-[16px]  top-up-box p-[19px] flex flex-col justify-between'>
           <div className='flex justify-between'>
             <h1 className='text-[20px] font-medium'>Gold Pass</h1>
             <CiHeart className='text-[44px]' />
           </div>
           <div className='flex justify-between items-center'>
             <p className='game-offer-button py-[6px] px-[8px] rounded-[8px]'>52 Offer</p>
             <p className='font-semibold text-[22px]' style={{color:'rgba(0, 255, 121, 1)'}}>151.53 USD</p>
           </div>
         </section>
         <section className='lg:h-[125px] rounded-[16px]  top-up-box p-[19px] flex flex-col justify-between'>
           <div className='flex justify-between'>
             <h1 className='text-[20px] font-medium'>Gold Pass</h1>
             <CiHeart className='text-[44px]' />
           </div>
           <div className='flex justify-between items-center'>
             <p className='game-offer-button py-[6px] px-[8px] rounded-[8px]'>62 Offer</p>
             <p className='font-semibold text-[22px]' style={{color:'rgba(0, 255, 121, 1)'}}>51 USD</p>
           </div>
         </section>
         <section className='lg:h-[125px] rounded-[16px]  top-up-box p-[19px] flex flex-col justify-between'>
           <div className='flex justify-between'>
             <h1 className='text-[20px] font-medium'>Gold Pass</h1>
             <CiHeart className='text-[44px]' />
           </div>
           <div className='flex justify-between items-center'>
             <p className='game-offer-button py-[6px] px-[8px] rounded-[8px]'>12 Offer</p>
             <p className='font-semibold text-[22px]' style={{color:'rgba(0, 255, 121, 1)'}}>17.24 USD</p>
           </div>
         </section>
         <section className='lg:h-[125px] rounded-[16px]  top-up-box p-[19px] flex flex-col justify-between'>
           <div className='flex justify-between'>
             <h1 className='text-[20px] font-medium'>Gold Pass</h1>
             <CiHeart className='text-[44px]' />
           </div>
           <div className='flex justify-between items-center'>
             <p className='game-offer-button py-[6px] px-[8px] rounded-[8px]'>12 Offer</p>
             <p className='font-semibold text-[22px]' style={{color:'rgba(0, 255, 121, 1)'}}>61.53 USD</p>
           </div>
         </section>
      </div>
    </Link>
 </main>


       <GameSectionThree/>
       <GameSectionFour/>
       <Footer/>
    </>
  )
}
export default StarRail