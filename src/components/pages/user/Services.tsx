
import { FC, memo, useEffect, useState } from "react";
import HomeImg from "../../../assets/Images/homebg.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reduxKit/store";
import { GetServiceAction } from "../../../reduxKit/actions/service/serviceAction";
import SkeletonBox from "./SkeltonBox"; // Import the skeleton component


interface BoxItem {
  id:string
  iconUrl: string;
  name: string;
  nameAr: string;
  rounded?: string;
}

export const Services: FC = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  // const navigate=useNavigate()
  const [services, setServices] = useState<BoxItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await dispatch(GetServiceAction());
        setServices(response.payload);
      } catch (error) {
        console.error("Error fetching services", error);
      } finally {
        setLoading(false);
      }
    };
    getServices();
  }, [dispatch]);



    // const handleServiceNested=async(item:BoxItem)=>{
    //   try {
    //     if (item.id) {
    //       navigate(`/user/topup?serviceId=${item.id}&name=${item.name}&nameAr=${item.nameAr}&iconUrl=${item.iconUrl}`)
    //     }
    //   } catch (error) {
    //       console.log(error);
       
    //   }
    // }





  

  return (
    <>
      <main className="w-full h-auto home text-white -z-10 md:px-[80px] px-[20px] dlg:pt-[100px] lg:pt-[130px] relative">
        <section className="lg:items-start md:items-center lg:pl-[18px] mt-[170px] lg:mt-[30px] md:flex flex-col justify-center">
          <h1
            className="text-[28px] md:text-center lg:text-left mediumlg:text-[54px] font-bold w-[100%] leading-[33px] mediumlg:leading-[58px] mb-[5px] lg:mb-[0px]"
            style={{ fontFamily: "Unbounded" }}
          >
            Your One-Stop Shop for Gaming Goodies!
          </h1>
          <p className="lg:w-[520px] md:w-[460px] lg:text-[18px]">
            Buy and sell gaming products securely—gift cards, game coins, accounts, and more. Trusted by millions of gamers worldwide.
          </p>
        </section>
        <section className="lg:relative">
          <img src={HomeImg} alt="" className="w-[100%]" />
        </section>
      </main>

      <div className="game-slider-home-responsive md:h-[168px] h-[155px] w-[100%] lg:w-auto lg:rounded-[28px] lg:mx-[80px]">

        {loading
          ? Array.from({ length: 12 }).map((_, index) => <SkeletonBox key={index} />) // Show skeletons when loading
          : services.map((item, index) => (
              <Link to="/about" key={index} className="game-slider-box relative rounded-[16px]">
                <div className="box-item flex flex-col justify-center items-center">
                  <div className="flex flex-col justify-center items-center px-[10px] cursor-pointer">
                    <img src={item.iconUrl} alt={item.name} className="box-image w-[110px]" style={{ borderRadius: `${item.rounded}` }} />
                    <p className="box-name text-white flex-1 text-center dlg:text-[16px] lg:text-[15px] absolute bottom-2 lg:bottom-4">
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
