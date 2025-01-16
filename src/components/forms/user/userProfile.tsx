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
        <section className="absolute w-[370px] h-[600px] profile-section rounded-[14px] left-[140px] top-[60px] py-[25px] px-[35px] flex flex-col justify-start items-center gap-[30px]">
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
 
