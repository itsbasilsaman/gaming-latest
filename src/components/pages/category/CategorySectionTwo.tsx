import React, { useEffect, useState } from 'react';
import Shape from '../../../assets/Images/Shape.png';
import { GetOtherSellersAction } from '../../../reduxKit/actions/seller/seller';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../reduxKit/store';

interface CategorySectionTwoProps {
  offerId : string | undefined;
}

interface othersellerdata {
  offerId : string | undefined ;
  isOnline: boolean
}
 
const CategorySectionTwo: React.FC <CategorySectionTwoProps> = React.memo(( {offerId}) => {
  const [isOn, setIsOn] = useState<boolean>(false);
  // const [otherSeller , setOtherSeller] = useState([])
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedOption(event.target.value);
  };

  const toggleHandler = (): void => {
    setIsOn((prevState) => !prevState);
  };

  const sellerDate : othersellerdata = {
    offerId,
    isOnline : isOnline
  }


  useEffect(()=> {
    const getOtherSeller = async () => {
      try {
        const response = await dispatch(GetOtherSellersAction(sellerDate))
        console.log('111122222',response.payload);
        // setOtherSeller(response.payload.data)
      } catch (error) {
        console.error(error)
      }
    }
    getOtherSeller()
  }, [dispatch])

  return (
    <div className='w-full h-auto text-white md:px-[80px] px-[20px] lg:pt-[30px]'> 
    <div className='flex lg:flex-row flex-col   lg:items-center lg:justify-between'>
       <h1 style={{fontFamily:'Unbounded'}} className='lg:py-[17px] py-[10px] lg:text-[27px] text-[24px]'>Other Sellers   </h1>
       <div className='flex gap-[20px] justify-between'>
             <div className='flex gap-[10px] justify-center items-center'>
                <div
      className={`toggle-container ${isOn ? 'on' : 'off'}`}
      onClick={toggleHandler}
    >
      
      <label className="toggle-container">
        <input
          type="checkbox"
          checked={isOnline}
          onChange={() => setIsOnline((prev) => !prev)}
          className="toggle-input"
        />
        <div className="toggle-button"></div>
      </label>
                </div>
                <p className='md:text-[17px] text-[15px] lg:mr-[20px]'>{isOnline ? "Online" : "Offline"}</p>
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
                   <img src={Shape} alt="" className='lg:w-[70px] w-[62px]' />
                   <div >
                    <p className='text-[18px] underline'>Musfiqur Rahman</p>
                    <p>Level 8</p>
                   </div>
                </div>
                <div className='flex gap-[12px]'>
                   <img src={Shape} alt="" className='lg:w-[70px] w-[62px]' />
                   <div >
                    <p className='text-[18px] underline'>Mohammed Saleel vt </p>
                    <p>Level 24</p>
                   </div>
                </div>
                <div className='flex gap-[12px]'>
                   <img src={Shape} alt="" className='lg:w-[70px] w-[62px]' />
                   <div >
                    <p className='text-[18px] underline'>Nasih k </p>
                    <p>Level 45</p>
                   </div>
                </div>
                <div className='flex gap-[12px]'>
                   <img src={Shape} alt="" className='lg:w-[70px] w-[62px]' />
                   <div >
                    <p className='text-[18px] underline'>Amna sherin k</p>
                    <p>Level 12</p>
                   </div>
                </div>
                   </div>
   
  </div>
  );
});

export default CategorySectionTwo;
