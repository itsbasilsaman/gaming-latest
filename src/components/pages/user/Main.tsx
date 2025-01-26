import { FC, memo } from 'react';
import HomeImg from '../../../assets/Images/homebg.png';

import One from "../../../assets/Images/two.svg"
// import Two from '../../../assets/Images/two.svg';
import Three from '../../../assets/Images/three.svg';
import Four from '../../../assets/MainCardImages/payment.png';
import Five from '../../../assets/MainCardImages/tabular-coin1.png';
import Six from '../../../assets/MainCardImages/item.png';
import Seven from '../../../assets/MainCardImages/heart2222.png';
import Eight from '../../../assets/Images/eight.png';
import { Link } from 'react-router-dom';
// import { IoIosArrowDropright } from "react-icons/io";




interface BoxItem {
  img: string ;
  name: string;
  rounded?: string;
}

export const Main: FC = memo(() => {
  const boxItems: BoxItem[] = [
    {
      img: One,
      name: 'Gift Cards',
    },
    {
      img: Six,
      name: 'Games',
    },
    {
      img: Three,
      name: 'Software & Apps',
    },
    {
      img: Four,
      name: 'Payment Cards',
    },
    {
      img: Five,
      name: 'Game Coins',
    },
    {
      img: Six,
      name: 'Items',
      rounded: '1000px',
    },
    {
      img: Seven,
      name: 'Boosting',
    },
    {
      img: Eight,
      name: 'Accounts',
    },
    // {
    //   img: <IoIosArrowDropright />
    // }
  ];

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
      {/* <div className='dlg:h-[168px] lg:h-[155px] game-slider-home hidden lg:grid rounded-[28px] md:mx-[80px] mx-[20px]'>
  {boxItems.map((item, index) => (
    <Link to="/about" key={index}>
      <div className="box-item flex flex-col justify-center items-center">
        <div className='flex flex-col justify-center items-center py-[8px] px-[10px] game-slider-box cursor-pointer rounded-[8px]'>
          <img
            src={item.img}
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
</div> */}

<div className="game-slider-home-responsive md:h-[168px] h-[155px]  w-[100%] lg:w-auto    lg:rounded-[28px] lg:mx-[80px]  ">
  {boxItems.map((item, index) => (
    <Link to="/about" key={index}>
      <div className="box-item flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center py-[8px] px-[10px] game-slider-box cursor-pointer rounded-[8px]">
          <img
            src={item.img}
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


