import React from 'react';
import CardBackground from '../../../assets/Card/gamecardbg.png';
import ClashofClans from '../../../assets/Card/clashofclans.png';
 


const GameSectionOne: React.FC= React.memo(() => {
  return (
    <main className='w-full h-auto   text-white md:px-[80px] px-[20px]  flex    lg:items-center flex-col  pb-[40px]'> 
      <p className='lg:pt-[130px] pt-[110px]  lg:pb-[40px] pb-[20px]  text-left w-[100%]'>Home / Games / Clash of Clans</p>
      <div className='  w-[100%] lg:h-[182px] h-[154px] gamecard-box rounded-[13px] relative lg:px-[15px] flex lg:justify-between  ' >
          <img src={CardBackground} className='object-cover absolute top-[0px] left-[0px] w-[100%]  h-[100%] rounded-[12px] ' style={{zIndex:'-10' , objectFit:'cover'}} />
         <div className='flex  lg:flex-row flex-col justify-center lg:items-center pb-[25px] lg:pt-[0px]   pt-[18px] lg:pb-[0px] lg:gap-[25px] gap-[15px] w-[100%] lg:w-auto px-[20px] lg:px-[0px]'>
            <h1 className='lg:text-[40px] text-[30px] font-bold' style={{fontFamily:'Unbounded'}}>Clash of Clans</h1>
            <p className='offer-box px-[12px] py-[8px] w-[120px] cursor-pointer '>148 Offers</p>
         </div>
         <img src={ClashofClans} alt="" className='lg:h-[140px] hidden lg:block' />
      </div>
    </main>
  );
});

export default GameSectionOne;
