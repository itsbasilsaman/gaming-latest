import React, { useState } from 'react';
import Shape from '../../../assets/Images/Shape.png';



const CategorySectionTwo: React.FC = React.memo(() => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedOption(event.target.value);
  };

  const toggleHandler = (): void => {
    setIsOn((prevState) => !prevState);
  };

  return (
    <div className='w-full h-auto text-white md:px-[80px] px-[20px] lg:pt-[30px]'> 
    <div className='flex lg:flex-row flex-col   lg:items-center lg:justify-between'>
       <h1 style={{fontFamily:'Unbounded'}} className='lg:py-[17px] py-[10px] text-[27px] '>Other Sellers (8) </h1>
       <div className='flex gap-[20px] justify-between'>
             <div className='flex gap-[10px] justify-center items-center'>
                <div
      className={`toggle-container ${isOn ? 'on' : 'off'}`}
      onClick={toggleHandler}
    >
      <div className="toggle-button"></div>
                </div>
                <p className='md:text-[17px] text-[15px] lg:mr-[20px]'>Online</p>
             </div>
             <div className='flex lg:gap-[28px] gap-[15px]'> 
                <label className='flex justify-center items-center'>
        <input
          type="radio"
          value="Option1"
          checked={selectedOption === "Option1"}
          onChange={handleChange}
        />
        <span className='ml-[4px] text-[14px] md:text-[16px]'>LowestPrice</span>
      </label>
      <label  className='flex justify-center items-center'>
        <input
          type="radio"
          value="Option2"
          checked={selectedOption === "Option2"}
          onChange={handleChange}
        />
        <span className='ml-[4px] text-[14px] md:text-[16px]'>Recommended</span>
      </label>
             </div>
       </div>
    </div>

    <div className='category-slider py-[28px] pt-[60px] gap-[45px] lg:gap-[0px]'>
                <div className='flex gap-[12px]'>
                   <img src={Shape} alt="" className='w-[70px]' />
                   <div >
                    <p className='text-[18px] underline'>Musfiqur Rahman</p>
                    <p>Level 12</p>
                   </div>
                </div>
                <div className='flex gap-[12px]'>
                   <img src={Shape} alt="" className='w-[70px]' />
                   <div >
                    <p className='text-[18px] underline'>Musfiqur Rahman</p>
                    <p>Level 12</p>
                   </div>
                </div>
                <div className='flex gap-[12px]'>
                   <img src={Shape} alt="" className='w-[70px]' />
                   <div >
                    <p className='text-[18px] underline'>Musfiqur Rahman</p>
                    <p>Level 12</p>
                   </div>
                </div>
                <div className='flex gap-[12px]'>
                   <img src={Shape} alt="" className='w-[70px]' />
                   <div >
                    <p className='text-[18px] underline'>Musfiqur Rahman</p>
                    <p>Level 12</p>
                   </div>
                </div>
    </div>
   
  </div>
  );
});

export default CategorySectionTwo;
