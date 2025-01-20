import { useState, useRef } from 'react';
import ScoreCard from '../../../assets/Images/sc.png';
import Points from '../../../assets/Images/points.png';
import { MdLogout } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { FiChevronUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const ToggleProfile: React.FC = () => {
  interface UserProfile {
    text: string; // Text inside the profile bar
    profileBgColor: string; // Background color for the profile bar
    userStatusColor: string; // Background color for the user status bar
  }

  const userProfiles: UserProfile[] = [
    { text: 'A', profileBgColor: 'bg-red-600', userStatusColor: 'bg-green-500' },
  ];

 
  const [isSellingOpen, setIsSellingOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

 

  const toggleSelling = () => {
    setIsSellingOpen((prev) => !prev);
  };

  const toggleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  // Close the dropdown if the user clicks outside
  

   
    

  return (
    <>
      {userProfiles.map((user, index) => (
        <div key={index} className="relative" ref={dropdownRef}>
           

         
            <div className="  mt-2   py-4 w-[370px]  rounded-lg shadow-md">
              <div className="  rounded-lg max-w-md mx-auto">
                {/* Header */}
                <Link to={'/profile'}>
                  <div className="flex items-center space-x-4 border-b pb-4 mb-4 px-4">
                    <div
                      className={`${user.profileBgColor} text-white w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold`}
                    >
                      {user.text}
                    </div>
                    <div>
                      <h1
                        className="text-lg font-semibold text-white"
                        style={{ fontFamily: 'Unbounded' }}
                      >
                        Basilbackup6
                      </h1>
                      <p className="text-sm text-gray-400">Level 1</p>
                      <p className="text-sm text-gray-400">
                        Account ID 1002098510
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Balances */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-4">
                    <span className="text-sm font-medium text-white">
                      G2G Store Credit
                    </span>
                    <span className="text-sm font-medium text-green-600 flex gap-[5px]">
                      <img src={ScoreCard} className="w-[20px]" /> SC 0.00
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4">
                    <span className="text-sm font-medium text-white">
                      G2G Points
                    </span>
                    <span className="text-sm font-medium flex gap-[5px]">
                      <img src={Points} className="w-[20px]" /> 0
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4">
                    <span className="text-sm font-medium text-white">
                      Available Balance
                    </span>
                    <span className="text-[18px] text-black">
                      0.00 <span className="text-[12px]">USD</span>
                    </span>
                  </div>
                </div>

                {/* Navigation */}
                <div className="mt-1">
                  <ul className="space-y-2">
                    <li>
                      <button className="w-full text-left text-sm primary-color hover:bg-gray-100 py-2 rounded-lg px-4">
                        Overview
                      </button>
                    </li>
                    <li>
                      <button className="w-full text-left text-sm primary-color hover:bg-gray-100 rounded-lg px-4">
                        Purchase Orders
                      </button>
                    </li>
                    <li>
                      <div>
                        <button
                          onClick={toggleSelling}
                          className="w-full text-left text-sm primary-color hover:bg-gray-100 py-2 rounded-lg flex justify-between items-center px-4"
                        >
                          Selling
                          <span>
                            {isSellingOpen ? (
                              <FiChevronUp className="text-[20px]" />
                            ) : (
                              <IoIosArrowDown className="text-[18px]" />
                            )}
                          </span>
                        </button>
                        {isSellingOpen && (
                          <ul className="space-y-1">
                            <li className="text-sm text-gray-600 px-4">
                              Selling Item 1
                            </li>
                            <li className="text-sm text-gray-600 px-4">
                              Selling Item 2
                            </li>
                          </ul>
                        )}
                      </div>
                    </li>
                    <li>
                      <div>
                        <button
                          onClick={toggleSettings}
                          className="w-full text-left text-sm primary-color hover:bg-gray-100 py-2 rounded-lg flex justify-between items-center px-4"
                        >
                          Settings
                          <span>
                            {isSettingsOpen ? (
                              <FiChevronUp className="text-[20px]" />
                            ) : (
                              <IoIosArrowDown className="text-[18px]" />
                            )}
                          </span>
                        </button>
                        {isSettingsOpen && (
                          <ul className="space-y-1">
                            <li className="text-sm text-gray-600 px-4">
                              Setting Item 1
                            </li>
                            <li className="text-sm text-gray-600 px-4">
                              Setting Item 2
                            </li>
                          </ul>
                        )}
                      </div>
                    </li>
                    <li>
                    <Link to={'/'}>
                        <button className="w-full text-left text-sm primary-color hover:bg-gray-100 py-2 rounded-lg flex justifu-center items-center gap-[6px] px-4">
                          <MdLogout className="text-[19px]" /> Log Out
                        </button>
                    </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
       
        </div>
      ))}
    </>
  );
};
