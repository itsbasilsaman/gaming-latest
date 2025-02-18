import React from "react";

const SkeletonBox: React.FC = () => {
  return (
    <div className="game-slider-box relative rounded-[16px] animate-pulse  ">
      <div className="box-item flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center    cursor-pointer">
          <div className="w-full h-[110px] bg-grayShade rounded-[16px]" ></div>
          <div className="w-[110px] h-[20px] bg-grayShade rounded-[7px] mt-2"></div>
        </div>
      </div>
    </div>
  );
};


export default SkeletonBox;
