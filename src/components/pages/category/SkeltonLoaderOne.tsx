import React from "react";
 
import Vector from "../../../assets/Images/Vector.png";
import Plus from "../../../assets/Images/Plus.png";
import Minus from "../../../assets/Images/Minus.png";
const SkeletonLoader: React.FC = () => {
  return (
    <>
  
  
      <main className="w-full h-auto pb-[40px]   text-white">
          <p className="pt-[120px] md:px-[80px] text-[14px] lg:text-[16px] px-[20px] ">
            {'                '}
          </p>
          <h1
          
            className="lg:py-[17px] py-[10px] lg:text-[27px] text-[24px] md:px-[80px] px-[20px]  "
          >
                       {'                '}
          </h1>
          <div className="flex justify-between  lg:hidden py-[14px] md:px-[80px] px-[20px]">
            <div className="flex gap-[12px] shimmer bg-grayShade">
               
            </div>
            <img
              src={Vector}
              alt=""
              style={{ objectFit: "contain" }}
              className="w-[45px] lg:w-auto"
            />
          </div>
          <section className="w-[100%] h-auto category-section lg:gap-[25px] md:px-[80px] px-[20px] lg:pt-[18px] ">
            <div className="category-section-one rounded-[16px] lg:px-[34px] px-[16px] py-[36px] w-full my-[15px] lg:my-[0px] shimmer bg-grayShade">
              <h1 className="lg:text-[20px] text-[18px] font-bold">
                
              </h1>
             
              <div className="w-full outline-section py-[20px]">
               
                <h1 className="block lg:hidden font-semibold text-[18px]">
                 
                </h1>
                <div className="flex justify-between lg:items-center">
                  <div className="flex lg:gap-[7px] gap-[5px]">
                    
                    <h1 className="font-semibold">  </h1>
                  </div>
                  <p> </p>
                </div>
              </div>
           
              <h1 className="lg:text-[20px] lg:font-bold lg:py-[14px] hidden lg:block">
            
              </h1>
              <p className="pb-[8px] lg:pb-[0px]">
                
              </p>
              <p>
                
              </p>
              <p>
                 
              </p>
              <p>
                
              </p>
              <p>
                
              </p>
            </div>
            <div className="category-section-two shimmer bg-grayShade rounded-[16px] lg:py-[18px]  px-[23px] hidden lg:block">
              <div className="flex justify-between">
                <div className="flex gap-[12px]">
                   
                   
                </div>
                <img src={Vector} alt="" style={{ objectFit: "contain" }} />
              </div>
              <div className=" justify-center flex  ">
                <div className=" items-center lg:text-[18px] flex    lg:py-[12px] h-10  rounded-lg w-full ">
                 
                  
                </div>
              </div>
              <h1 className="lg:text-[18px] lg:py-[20px] font-semibold">
             
              </h1>
              <h1
                style={{ color: "rgba(0, 255, 121, 1)" }}
                className="lg:text-[25px] font-bold"
              >
                
              </h1>
              <div className="w-full h-[56px] counter rounded-[1000px] lg:mt-[23px] flex justify-between items-center px-[8px] shimmer bg-grayShade">
                <img
                  src={Plus}
                  alt="Increase"
                 
                  className="cursor-pointer"
                />
                <p className="text-[19px] font-semibold"> </p>
                <img
                  src={Minus}
                  alt="Decrease"
            
                  className="cursor-pointer"
                />
              </div>
              <button
           
                className="w-full lg:h-[56px] rounded-[1000px] lg:mt-[18px] text-[18px] font-medium buy-now-button shimmer bg-grayShade"
              >
         
              </button>
            </div>
          </section>


          <div
            className="lg:hidden block md:mx-[80px] mx-[20px] px-[10px] py-[22px] flex justify-center items-start flex-col gap-[12px] rounded-[16px]"
            style={{ border: "2px solid rgba(255, 255, 255, 0.214)" }}
          >
            <h1 className="text-[18px] lg:py-[20px] font-semibold">
         
            </h1>
            <h1
              style={{ color: "rgba(0, 255, 121, 1)", fontFamily: "Unbounded" }}
              className="lg:text-[25px] text-[22px] font-bold"
            >
       
            </h1>
            <div className="w-full h-[56px] counter rounded-[1000px] lg:mt-[23px] flex justify-between items-center px-[8px]">
              <img
                src={Plus}
                alt="Increase"
          
                className="cursor-pointer"
              />
              
        
              <img
                src={Minus}
                alt="Decrease"
           
                className="cursor-pointer"
              />
            </div>
          </div>
          <div
            className="block lg:hidden py-[19px] px-[18px] fixed bottom-[0px] left-[0px] right-[0px] bg-grayShade shimmer"
            style={{ backgroundColor: "#271D8E" }}
          >
          
          <button
       
            className="w-full lg:h-[56px] rounded-[1000px] lg:mt-[18px] text-[18px] font-medium buy-now-button bg-grayShade shimmer"
          >
   
          </button>
    
          </div>
        </main>

    </>

























  );
};

export default SkeletonLoader;
