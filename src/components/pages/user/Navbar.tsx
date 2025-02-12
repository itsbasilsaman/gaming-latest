import React, { useEffect, useRef, useState } from 'react';
import { HiMiniBars3 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Flag from './Images/flag.png';
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import Logo from '../../../assets/gaminggate-logo.png';
import  ToggleProfile  from './ToggleProfile';
import { UserAvatar } from './UserAvatar';
import { AiFillMessage } from "react-icons/ai";

import { IoMdNotifications } from "react-icons/io";
import { useSelector } from 'react-redux';
import { RootState } from '../../../reduxKit/store';
// import { UserAvatar } from './UserAvatar';
export const Navbar: React.FC = React.memo(() => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [selectedBoxItem, setSelectedBoxItem] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [isLocalizationOpen, setIsLocalizationOpen] = useState<boolean>(false);
const {isLoggedUserWithSeller,isLoggedUser}=useSelector((state:RootState)=>state.logAuth)




  // Handle outside click to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleModal = (): void => setIsModalOpen(!isModalOpen);
  const toggleDropdown = (): void => {
    if (!dropdownOpen) {
      setDropdownOpen(true);
      setShowCategories(false); // Initially show "Popular Searches"
    } else {
      setShowCategories(!showCategories); // Toggle between views
    }
  };

  const togglePanel = (): void => {
    setIsPanelOpen(!isPanelOpen);
  };

  const toggleLocalization = (): void => {
    setIsLocalizationOpen(!isLocalizationOpen);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedBoxItem(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedItem(event.target.value);
  };

  const items: string[] = ["English", "Arabic"];

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isPanelOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isPanelOpen]);

  // Calculate the background color based on scroll position
  const background: string = scrollY > 0 ? `linear-gradient(to bottom left, #030535,rgb(22, 26, 73))` : 'transparent';

  return (
    <>
      <div className='flex justify-center fixed items-center text-white lg:px-[90px] px-[25px] h-[90px] lg:gap-[20px] gap-[10px] header fixed top-0 left-0 w-full ' style={{ background, zIndex: '10' }}>
        <Link to={'/'}><div className='text-[19px] font-semibold flex justify-center items-center'><img src={Logo} alt="" className='w-[60px] hidden lg:block' /><span className='text-[17px] '   style={{ fontFamily: 'Unbounded' }}>GATE  </span></div></Link>
        <div className="lg:relative   w-full lg:mx-[30px] lg:px-0">
          <div ref={searchRef} className="relative w-full">
            <div className="flex items-center rounded-full header-input-section   shadow-md p-2 transition-all duration-300 ease-in-out w-full">
              <input
                type="text"
                placeholder="Game Gate"
                className="flex-1 header-inputbox pl-[10px] w-full "
              />
              <MdOutlineKeyboardArrowDown
                className="text-[24px] mx-[5px] cursor-pointer"
                onClick={toggleDropdown}
              />
            </div>

            {/* {dropdownOpen && (
              <div
                className={`absolute top-[77px] left-0 right-0 bg-white text-black header-dropdown shadow-lg rounded-lg p-4 z-10 transition-transform duration-300 ease-in-out ${
                  dropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              >
                {showCategories ? (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Search in service</h3>
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { name: "All", icon: "🔲" },
                        { name: "Gift Cards", icon: "🎁" },
                        { name: "Games", icon: "🎮" },
                        { name: "Software & Apps", icon: "💻" },
                        { name: "Payment Cards", icon: "💳" },
                        { name: "Game Coins", icon: "🪙" },
                        { name: "Items", icon: "📦" },
                        { name: "Accounts", icon: "👤" },
                        { name: "Boosting", icon: "🚀" },
                        { name: "Telco", icon: "📱" },
                        { name: "Coaching", icon: "🎓" },
                        { name: "Skins", icon: "🎨" },
                      ].map((item, index) => (
                        <div key={index} className="flex flex-col items-center cursor-pointer">
                          <div className="text-2xl">{item.icon}</div>
                          <p className="mt-2 text-sm">{item.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Popular searches</h3>
                    <div className="flex flex-wrap gap-2">
                      {["vandal", "free fire id", "skins", "sell", "pc"].map(
                        (item, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gray-200 rounded-[16px] cursor-pointer game-offer-button"
                          >
                            {item}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )} */}
          </div>
        </div>

        <div className='flex justify-center items-center lg:gap-[20px] hidden lg:flex'>
          <button className=' w-[92px] pr-[4px] lg:h-[56px] country-button modal-country-button flex justify-center items-center gap-[10px] rounded-[1000px] lg:text-[19px]' onClick={toggleModal}><img src={Flag} alt="" className='w-[43px]' /> IN</button>
          { isLoggedUserWithSeller ?
         <div className='flex gap-[12px]'>
             <Link to={'/user/selectDetailsOffer'}><button className='lg:w-[188px] lg:h-[56px] country-button rounded-[1000px] lg:text-[19px] '>Create Offer</button></Link>
           
            <Link to={'/chat'}>
              <div className=' p-[15px] rounded-full country-button cursor-pointer'>
              <AiFillMessage className='text-[22px] ' />
              </div>
           </Link>
            <div className=' p-[15px] rounded-full country-button cursor-pointer'>
            <IoMdNotifications className='text-[22px]' />
  
            </div>
           <UserAvatar/>
         </div>
          :
        <div className='flex gap-[12px]'>
           { isLoggedUser ? 
          <div className='flex gap-[12px]'> 
             <Link to={'/user/seller'}><button className='lg:w-[188px] lg:h-[56px] country-button rounded-[1000px] lg:text-[19px] '>Become a Seller</button></Link>
             
             <Link to={'/chat'}>
               <div className=' p-[15px] rounded-full country-button cursor-pointer'>
               <AiFillMessage className='text-[22px] ' />
               </div>
            </Link>
             <div className=' p-[15px] rounded-full country-button cursor-pointer'>
             <IoMdNotifications className='text-[22px]' />   
             </div>
            <UserAvatar/>
          </div> :
            <Link to={'/user/login'}><button className='lg:w-[228px] lg:h-[56px] login-signup-button rounded-[1000px] lg:text-[19px]'>Login / Signup</button></Link>
        }
        </div>
         }

        
        </div>
        <div
          className={`w-[27px] h-[27px] lg:hidden block flex justify-center items-center transition-all duration-300 ease-in-out `}
          onClick={togglePanel}
        >
          <HiMiniBars3 className="text-[29px]" />
        </div>
      </div>

      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 ease-in-out ${isModalOpen ? "scale-100 opacity-100" : "scale-75 opacity-0 pointer-events-none"}`}
      >
        <div className='px-[29px] py-[25px]  w-[550px] modal-main '>
          <section className='w-full flex justify-between items-center pb-[15px]'>
            <p className='text-[20px] font-semibold' style={{ fontFamily: 'Unbounded' }}>Localization setting</p>
            <IoClose className='text-[23px] cursor-pointer' onClick={toggleModal} />
          </section>
          <section className='header-modal-section gap-[25px]'>
            <div>Country / Region</div>
            <div>
              <div className='flex justify-start gap-[8px] '><img src={Flag} alt="" className='w-[25px]' /> <span>India</span></div>
              <p>To change the country, you need a valid mobile number for the new country.</p>
            </div>
            <div>
              <p>Language</p>
            </div>
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {items.map((item) => (
                  <label key={item} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="items"
                      value={item}
                      checked={selectedItem === item}
                      onChange={handleChange}
                      style={{ width: "20px", height: "20px", accentColor: "blue" }}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p>Currency</p>
            </div>
            <div>
              <select id="items" value={selectedBoxItem} onChange={handleSelectChange} className='text-white py-[4px] px-[8px] rounded-[6px] country-button'>
                <option value="Item 1">United States Dollar (USD)</option>
                <option value="Item 2">Saudi Riyal (INR)</option>
              </select>
            </div>
          </section>
          <section className='w-full h-auto flex justify-end my-[25px] gap-[8px]'>
            <button className='bg-white text-black px-[15px] py-[7px] rounded-[10px] font-medium' onClick={toggleModal} >Cancel</button>
            <button className='bg-white text-black px-[15px] py-[7px] rounded-[10px] font-medium' onClick={toggleModal} >Save</button>
          </section>
        </div>
      </div>

      {isPanelOpen && <div className="fixed inset-0 text-white z-50 flex flex-col shadow-lg animate-slide-in" style={{ backgroundColor: '#00002A' }}>
        <div className="flex items-center justify-between p-6 h-[80px] header-background"  >
          <div className='flex items-center '>
            <img src={Logo} alt="" className='w-[55px]' />
            <h2 className="text-[22px] font-semibold">GATE</h2>
          </div>
         
          <IoMdClose onClick={togglePanel} className='text-[26px]' />
        </div>

          
       
    
    
        <div className="p-[25px]  space-y-6">
             { isLoggedUserWithSeller && isLoggedUser ? 
            <div className='flex justify-center items-center flex-col'>
               <ToggleProfile/>
                <div>
                  <Link to={'/user/selectDetailsOffer'}><span className='text-[20px] w-full font-semibold country-button px-[24px] py-[15px] rounded-full'>Create Offer</span></Link>
                </div>
            </div>
              :
            <div>
               {  isLoggedUser ?
              <div  className='flex justify-center items-center flex-col'>
                  <ToggleProfile/>
                  <div className=' '>
                    <Link to={'/user/seller'}><span className='text-[20px] w-full font-semibold country-button px-[24px] py-[12px] rounded-full'>Become a Seller</span></Link>
                  </div>
              </div> : 
            <div className='flex w-full justify-center items-center'>  <Link to={'/user/login'}><button className='px-[30px] py-[13px] login-signup-button rounded-[1000px] text-[19px]'>Login / Signup</button></Link></div>
                }
            </div>
            }
      
 
     



   { isLoggedUserWithSeller || isLoggedUser && <div className='flex justify-center items-center'>      <button className=' pr-[14px] px-[6px] py-[6px] country-button modal-country-button flex justify-center items-center gap-[10px] rounded-full text-[19px]' onClick={toggleLocalization}><img src={Flag} alt="" className='w-[43px]' /> Localization Setting</button></div>}
          
          <div className={`localization-setting transition-all duration-300 ease-in-out overflow-hidden ${isLocalizationOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div>
              <div className='flex justify-between items-center py-[15px]'>
                <label className="block text-sm font-medium">Country / Region</label>
                <div className='flex justify-start gap-[8px] '><img src={Flag} alt="" className='w-[25px]' /> <span>India</span></div>
              </div>
              <span className='text-gray-400'>
                To change the country, you need a valid mobile number for the new
                country.
              </span>
            </div>
  
            <div>
              <label className="block text-sm font-medium pb-[19px]">Language</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {items.map((item) => (
                  <label key={item} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="items"
                      value={item}
                      checked={selectedItem === item}
                      onChange={handleChange}
                      style={{ width: "20px", height: "20px", accentColor: "blue" }}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
  
            <div>
              <label className="block text-sm font-medium pb-[15px]">Currency</label>
              <div>
                <select id="items" value={selectedBoxItem} onChange={handleSelectChange} className='text-white py-[8px] px-[12px] rounded-[6px] country-button'>
                  <option value="">Japanese Yen (JPY)</option>
                  <option value="Item 1">United States Dollar (USD)</option>
                  <option value="Item 2">Indian Rupee (INR)</option>
                  <option value="Item 3">Canadian Dollar (CAD)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end p-4 gap-[6px] ">
            <button className="px-4 py-2 text-black bg-white border rounded " onClick={togglePanel}>
              Cancel
            </button>
            <button className="px-4 py-2 text-black bg-white border rounded " onClick={togglePanel}>
              Save
            </button>
          </div>
          </div>
  
         
        </div>
      </div>}
    </>
  );
});