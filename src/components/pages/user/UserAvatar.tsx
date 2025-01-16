import { useState, useEffect, useRef } from 'react';
import ScoreCard from '../../../assets/Images/sc.png';
import Points from '../../../assets/Images/points.png';
import { MdLogout } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { FiChevronUp } from 'react-icons/fi';

export const UserAvatar: React.FC = () => {
  interface UserProfile {
    text: string; // Text inside the profile bar
    profileBgColor: string; // Background color for the profile bar
    userStatusColor: string; // Background color for the user status bar
  }

  const userProfiles: UserProfile[] = [
    { text: 'A', profileBgColor: 'bg-red-600', userStatusColor: 'bg-green-500' },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isSellingOpen, setIsSellingOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleSection = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleSelling = () => {
    setIsSellingOpen((prev) => !prev);
  };

  const toggleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  // Close the dropdown if the user clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {userProfiles.map((user, index) => (
        <div key={index} className="relative" ref={dropdownRef}>
          {/* Profile Button */}
          <div
            className="relative flex items-center justify-center cursor-pointer"
            onClick={toggleSection}
          >
            <div
              className={`w-[55px] h-[55px] ${user.profileBgColor} pb-[5px] profile-bar text-white rounded-full flex items-center justify-center text-2xl font-bold`}
            >
              {user.text}
            </div>
            <div
              className={`absolute bottom-0 right-1 w-4 h-4 userstatus-bar ${user.userStatusColor} border-2 border-white rounded-full`}
            ></div>
          </div>

          {/* Toggle Section */}
          {isOpen && (
            <div className="absolute mt-2 right-0 py-4 w-[370px] bg-white rounded-lg shadow-md">
              <div className="bg-white rounded-lg max-w-md mx-auto">
                {/* Header */}
                <div className="flex items-center space-x-4 border-b pb-4 mb-4 px-4">
                  <div
                    className={`${user.profileBgColor} text-white w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold`}
                  >
                    {user.text}
                  </div>
                  <div>
                    <h1
                      className="text-lg font-semibold primary-color"
                      style={{ fontFamily: 'Unbounded' }}
                    >
                      Basilbackup6
                    </h1>
                    <p className="text-sm text-gray-500">Level 1</p>
                    <p className="text-sm text-gray-500">
                      Account ID 1002098510
                    </p>
                  </div>
                </div>

                {/* Balances */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-4">
                    <span className="text-sm font-medium primary-color">
                      G2G Store Credit
                    </span>
                    <span className="text-sm font-medium text-green-600 flex gap-[5px]">
                      <img src={ScoreCard} className="w-[20px]" /> SC 0.00
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4">
                    <span className="text-sm font-medium primary-color">
                      G2G Points
                    </span>
                    <span className="text-sm font-medium flex gap-[5px]">
                      <img src={Points} className="w-[20px]" /> 0
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4">
                    <span className="text-sm font-medium primary-color">
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
                      <button className="w-full text-left text-sm primary-color hover:bg-gray-100 py-2 rounded-lg flex justifu-center items-center gap-[6px] px-4">
                        <MdLogout className="text-[19px]" /> Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};
