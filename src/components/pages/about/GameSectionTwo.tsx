import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import Icon from '../../../assets/Images/chevron-down.png';
import { CiHeart } from "react-icons/ci";
import { Link } from 'react-router-dom';

const GameSectionTwo: React.FC = React.memo(() => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedOption(event.target.value);
  };

  return (
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
             <p className='font-semibold text-[22px]' style={{color:'rgba(0, 255, 121, 1)'}}>111.23 USD</p>
           </div>
         </section>
         <section className='lg:h-[125px] rounded-[16px]  top-up-box p-[19px] flex flex-col justify-between'>
           <div className='flex justify-between'>
             <h1 className='text-[20px] font-medium'>Gold Pass</h1>
             <CiHeart className='text-[44px]' />
           </div>
           <div className='flex justify-between items-center'>
             <p className='game-offer-button py-[6px] px-[8px] rounded-[8px]'>12 Offer</p>
             <p className='font-semibold text-[22px]' style={{color:'rgba(0, 255, 121, 1)'}}>111.23 USD</p>
           </div>
         </section>
         <section className='lg:h-[125px] rounded-[16px]  top-up-box p-[19px] flex flex-col justify-between'>
           <div className='flex justify-between'>
             <h1 className='text-[20px] font-medium'>Gold Pass</h1>
             <CiHeart className='text-[44px]' />
           </div>
           <div className='flex justify-between items-center'>
             <p className='game-offer-button py-[6px] px-[8px] rounded-[8px]'>12 Offer</p>
             <p className='font-semibold text-[22px]' style={{color:'rgba(0, 255, 121, 1)'}}>111.23 USD</p>
           </div>
         </section>
         <section className='lg:h-[125px] rounded-[16px]  top-up-box p-[19px] flex flex-col justify-between'>
           <div className='flex justify-between'>
             <h1 className='text-[20px] font-medium'>Gold Pass</h1>
             <CiHeart className='text-[44px]' />
           </div>
           <div className='flex justify-between items-center'>
             <p className='game-offer-button py-[6px] px-[8px] rounded-[8px]'>12 Offer</p>
             <p className='font-semibold text-[22px]' style={{color:'rgba(0, 255, 121, 1)'}}>111.23 USD</p>
           </div>
         </section>
         <section className='lg:h-[125px] rounded-[16px]  top-up-box p-[19px] flex flex-col justify-between'>
           <div className='flex justify-between'>
             <h1 className='text-[20px] font-medium'>Gold Pass</h1>
             <CiHeart className='text-[44px]' />
           </div>
           <div className='flex justify-between items-center'>
             <p className='game-offer-button py-[6px] px-[8px] rounded-[8px]'>12 Offer</p>
             <p className='font-semibold text-[22px]' style={{color:'rgba(0, 255, 121, 1)'}}>111.23 USD</p>
           </div>
         </section>
         <section className='lg:h-[125px] rounded-[16px]  top-up-box p-[19px] flex flex-col justify-between'>
           <div className='flex justify-between'>
             <h1 className='text-[20px] font-medium'>Gold Pass</h1>
             <CiHeart className='text-[44px]' />
           </div>
           <div className='flex justify-between items-center'>
             <p className='game-offer-button py-[6px] px-[8px] rounded-[8px]'>12 Offer</p>
             <p className='font-semibold text-[22px]' style={{color:'rgba(0, 255, 121, 1)'}}>111.23 USD</p>
           </div>
         </section>
         <section className='lg:h-[125px] rounded-[16px]  top-up-box p-[19px] flex flex-col justify-between'>
           <div className='flex justify-between'>
             <h1 className='text-[20px] font-medium'>Gold Pass</h1>
             <CiHeart className='text-[44px]' />
           </div>
           <div className='flex justify-between items-center'>
             <p className='game-offer-button py-[6px] px-[8px] rounded-[8px]'>12 Offer</p>
             <p className='font-semibold text-[22px]' style={{color:'rgba(0, 255, 121, 1)'}}>111.23 USD</p>
           </div>
         </section>
         <section className='lg:h-[125px] rounded-[16px]  top-up-box p-[19px] flex flex-col justify-between'>
           <div className='flex justify-between'>
             <h1 className='text-[20px] font-medium'>Gold Pass</h1>
             <CiHeart className='text-[44px]' />
           </div>
           <div className='flex justify-between items-center'>
             <p className='game-offer-button py-[6px] px-[8px] rounded-[8px]'>12 Offer</p>
             <p className='font-semibold text-[22px]' style={{color:'rgba(0, 255, 121, 1)'}}>111.23 USD</p>
           </div>
         </section>
         <section className='lg:h-[125px] rounded-[16px]  top-up-box p-[19px] flex flex-col justify-between'>
           <div className='flex justify-between'>
             <h1 className='text-[20px] font-medium'>Gold Pass</h1>
             <CiHeart className='text-[44px]' />
           </div>
           <div className='flex justify-between items-center'>
             <p className='game-offer-button py-[6px] px-[8px] rounded-[8px]'>12 Offer</p>
             <p className='font-semibold text-[22px]' style={{color:'rgba(0, 255, 121, 1)'}}>111.23 USD</p>
           </div>
         </section>
      </div>
    </Link>
 </main>
  );
});

export default GameSectionTwo;
