import { useState } from 'react';
import { FaEdit, FaUserEdit } from 'react-icons/fa';

export const Profile: React.FC = () => {
  const [isArabic, setIsArabic] = useState<boolean>(false);

  const toggleLanguage = (): void => {
    setIsArabic((prev) => !prev);
  };

  return (
    <>
      <div className="w-full h-screen profile-main   relative">
        <div
          className="banner-section"
          style={{
            background: 'linear-gradient(to left bottom, rgb(3, 5, 53), rgb(22, 26, 73))',
          }}
        ></div>
        <div className="main-section bg-white"></div>
        <section className="absolute w-[370px] h-[600px] profile-section rounded-[14px] left-[140px] top-[60px] py-[25px] px-[26px] flex flex-col justify-start items-center gap-[30px]">
        <div className="">
      {/* Profile Picture */}
      <div className="flex justify-center mb-4">
        <div className="w-[115px] h-[115px] bg-red-500 text-white flex items-center justify-center rounded-full text-[55px] ">
          B
        </div>
      </div>

      {/* Username and Level */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold">basilbackup6</h2>
        <p className="text-gray-500">Level 1</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
       <div className='flex justify-between my-[6px]'>
          <p>Level 1</p>
          <p>Level 2</p>
       </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '0%' }}></div>
        </div>
        <p className="text-[12px] text-gray-500 mt-2">
          Buy or sell 5 USD of products to reach the next user level. <span className='underline cursor-pointer'>Learn more</span>
        </p>
      </div>

      {/* Upgrade Button */}
      <button className="w-full bg-red-500 text-white py-3 px-4 rounded-md font-medium hover:bg-red-600 my-[6px]">
        Upgrade to business account
      </button>

      {/* View Profile Button */}
      <button className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-md font-medium mt-2 hover:bg-gray-200 my-[6px]">
        View my profile as a Public
      </button>

      <hr className="my-4" />

      {/* Membership Info */}
      <div className="text-center mb-4 text-sm text-gray-500 flex justify-between">
        <p>Member since</p>
        <p className="font-medium">December, 2024</p>
      </div>

      <hr className="my-4" />

      {/* Successful Delivery */}
      <div className="text-center mb-4">
        <p className="text-sm text-gray-500">Successful delivery</p>
        <p className="font-medium text-gray-800">🎖️ 0%</p>
        <p className="text-xs text-gray-500">(Total lifetime orders: 0)</p>
      </div>

      <hr className="my-4" />

      {/* Ratings */}
      <div className="text-center mb-4">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <p>Last 90 Days</p>
          <p className="flex items-center gap-1">
            <span className="text-green-500">👍 0%</span>
            <span className="text-red-500">👎 0%</span>
          </p>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <p>All time rating</p>
          <p className="flex items-center gap-1">
            <span className="text-green-500">👍 0%</span>
            <span className="text-red-500">👎 0%</span>
          </p>
        </div>
      </div>

      <hr className="my-4" />

      {/* Followers and Following */}
      <div className="flex justify-between text-center text-sm text-gray-500">
        <div>
          <p className="font-medium text-gray-800">0</p>
          <p>Followers</p>
        </div>
        <div>
          <p className="font-medium text-gray-800">0</p>
          <p>Following</p>
        </div>
      </div>
    </div>
        </section>
      </div>

      <section className="lg:hidden block w-[100%] h-[100%] profile-section mt-[100px] py-[25px] px-[35px] flex flex-col justify-start items-center gap-[30px]">
        <div
          className="w-[150px] h-[150px] rounded-[1000px] flex justify-center items-center"
          style={{ backgroundColor: 'rgb(3, 5, 53)' }}
        >
          <FaUserEdit className="text-white text-[48px]" />
        </div>
        <div
          className="relative w-[8rem] h-10 bg-gray-200 rounded-full cursor-pointer"
          onClick={toggleLanguage}
        >
          <div
            className={`absolute top-1 left-1 h-8 w-[62px] text-white flex items-center justify-center rounded-full transform transition-transform duration-300 ${
              isArabic ? 'translate-x-14' : 'translate-x-0'
            }`}
            style={{ backgroundColor: '#070A39' }}
          >
            {isArabic ? 'Arabic' : 'English'}
          </div>
        </div>
        <div className="flex w-[100%] justify-between">
          <div>
            <p className="text-[14px] text-gray-600">Firstname</p>
            <p className="text-[21px] flex justify-center items-center gap-[30px]">
              Basil <FaEdit className="cursor-pointer text-[17px]" />
            </p>
          </div>
          <div>
            <p className="text-[14px] text-gray-600">Lastname</p>
            <p className="text-[21px] flex justify-center items-center gap-[30px]">
              Saman <FaEdit className="cursor-pointer text-[17px]" />
            </p>
          </div>
        </div>
        <div className="w-[100%]">
          <p className="text-[14px] text-gray-600">Email</p>
          <p className="text-[17px] flex justify-between items-center gap-[30px]">
            basilsaman.connects@gmail.com <FaEdit className="cursor-pointer text-[17px]" />
          </p>
        </div>
        <div className="w-[100%]">
          <p className="text-[14px] text-gray-600">Phone</p>
          <p className="text-[17px] flex justify-between items-center gap-[30px]">
            9539167604 <FaEdit className="cursor-pointer text-[17px]" />
          </p>
        </div>
        <div className="w-[100%]">
          <p className="text-[14px] text-gray-600">Password</p>
          <p className="text-[17px] flex justify-between items-center gap-[30px]">
            ▪▪▪▪▪▪▪▪▪▪▪▪▪
            <FaEdit className="cursor-pointer text-[17px]" />
          </p>
        </div>
      </section>
    </>
  );
};
 
