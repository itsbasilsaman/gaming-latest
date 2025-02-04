import React from 'react';

export const Loading: React.FC = () => {
  return (


    <div className="flex justify-center items-center h-screen  loading">
    <div className=" flex items-center flex-col">

      <div className="w-12 h-12 border-5 border-t-4 border-t-blue-950 border-blue-950 rounded-full animate-spin"></div>
      <p className="mt-4  primary-color text-[22px] font-semibold tracking-wide"  style={{fontFamily:'Unbounded'}}>
        Loading<span className="primary-color">...</span>
      </p>
      <p className="text-sm primary-color mt-2 font-semibold"  >
        Please wait, your content is on the way.
      </p>
    </div>
</div>

);
};