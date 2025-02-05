import { FC, memo, useEffect, useState } from 'react';
import HomeImg from '../../../assets/Images/homebg.png';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../reduxKit/store';
import { GetServiceAction } from '../../../reduxKit/actions/service/serviceAction';
// import { IoIosArrowDropright } from "react-icons/io";




interface BoxItem {
  iconUrl: string ;
  name: string;
  nameAr: string;
  rounded?: string;
}

export const Services: FC = memo(() => {
  const dispatch=useDispatch<AppDispatch>()
  const [services,setServices]=useState<BoxItem[]>([])
  

  useEffect(()=>{

    const getServices=async ()=>{
        try {
          const response=await dispatch(GetServiceAction())
          console.log("the last data",response);
          await setServices(response.payload)

        } catch (error) {
          console.log("error",error);
          
        }
      }
      getServices()
  },[dispatch])


  if(services){
console.log("the services for map ", services);

  }



  return (
    <>
        <main className='w-full  h-auto home text-white   -z-10 md:px-[80px] px-[20px] dlg:pt-[100px] lg:pt-[130px]'>
         <section className='    lg:items-start md:items-center   lg:pl-[18px] mt-[170px] lg:mt-[30px] md:flex  flex-col justify-center  '>
          <h1 className=' text-[47px] md:text-center lg:text-left   mediumlg:text-[54px] font-bold w-[100%] leading-[49px] mediumlg:leading-[58px] mb-[5px] lg:mb-[0px]' style={{fontFamily:"Unbounded"}}>Your One-Stop Shop for Gaming Goodies!</h1>
          <p className='lg:w-[520px] md:w-[460px]  lg:text-[18px]'>Buy and sell gaming products securely—gift cards, game coins, accounts, and more. Trusted by millions of gamers worldwide.</p>
         </section>
         <section className='lg:relative'>
          <img src={HomeImg} alt="" className=' w-[100%] ' />
         </section>
        
      </main>

<div className="game-slider-home-responsive md:h-[168px] h-[155px]  w-[100%] lg:w-auto    lg:rounded-[28px] lg:mx-[80px]  ">
  {services.map((item, index) => (
    <Link to="/about" key={index} className='game-slider-box rounded-[16px]'>
      <div className="box-item flex flex-col justify-center items-center ">
        <div className="flex flex-col justify-center items-center py-[8px] px-[10px]  cursor-pointer ">
          <img
            src={item.iconUrl}
            alt={item.name}
            className="box-image w-[110px]"
            style={{ borderRadius: `${item.rounded}` }}
          />
          <p className="box-name text-white flex-1 text-center dlg:text-[16px] lg:text-[14px]">
            {item.name}
          </p>
        </div>
      </div>
    </Link>
  ))}
</div>


      
    </>
  );
});


