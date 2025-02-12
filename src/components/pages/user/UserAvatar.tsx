import { useState, useEffect, useRef } from 'react';
import { MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { getUserProfile } from '../../../reduxKit/actions/user/userProfile';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../reduxKit/store';
import { UserProfileData } from '../../../interfaces/user/profile';

export const UserAvatar: React.FC = () => {
 

 

  const [isOpen, setIsOpen] = useState(false);
 
  const [profile, setProfile] = useState<UserProfileData | null>(null)

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const toggleSection = () => {
    setIsOpen((prev) => !prev);
  };


  const formattedDate = profile?.memberSince ?   new Date (profile.memberSince).toLocaleString("en-US", {
    year:'numeric',
    month: 'long',
    day:'numeric'
  }) : ' '

 

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


  useEffect(()=> {
    const fetchProfile = async () => {
      try {
        const getProfile = await dispatch(getUserProfile());
        if(getUserProfile.fulfilled.match(getProfile)){
          const {data} = getProfile.payload;
          setProfile(data.data);
          console.log("Profile data fetched successfully: " , getProfile.payload);
        } else {
          console.log("Failed to fetch profile: ", getProfile.payload || getProfile.error);
          
        }
      } catch (error) {
        console.error("Unexpected error while fetching the profile: ",error)
      }
    }
    fetchProfile()
  }, [dispatch])

  return (
    <>
      
        <div   className="relative" ref={dropdownRef}>
          {/* Profile Button */}
          <div
            className="relative text-black flex items-center justify-center cursor-pointer"
            onClick={toggleSection}
          >
            <div
              className={`w-[55px] h-[55px] bg-red-800 pb-[5px] profile-bar text-white rounded-full flex items-center justify-center text-2xl font-bold`}
            >
               {profile?.firstName ? profile.firstName.charAt(0).toUpperCase() : 'X'}
            </div>
            <div
              className={`absolute bottom-0 right-1 w-4 h-4 userstatus-bar text-black  border-2 border-green-400 bg-green-400 rounded-full`}
            ></div>
          </div>

          {/* Toggle Section */}
          {isOpen && (
            <div className="absolute mt-2 right-0 py-4 text-black w-[370px]  bg-white rounded-lg shadow-md">
              <div className="  rounded-lg  max-w-md mx-auto">
                {/* Header */}
                <Link to={'/profile'}>
                  <div className="flex items-center space-x-4 border-b pb-4 mb-4 px-4">
                    <div
                      className={`bg-red-800 text-white w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold`}
                    >
                      {profile?.firstName ? profile.firstName.charAt(0).toUpperCase() : 'X'}
                    </div>
                    <div>
                      <h1
                        className="text-lg font-semibold primary-color"
                        style={{ fontFamily: 'Unbounded' }}
                      >
                         {profile?.userName}
                      </h1>
                      <p className="text-sm text-gray-700"> 
                       Level {profile?.level?.level}
                      </p>
                      <p className="text-sm text-gray-700">
                          {profile?.email}
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Balances */}
                <div className="space-y-4">
                  <div className="flex justify-center items-center px-4">
                      <span className="text-[20px] font-medium primary-color"   style={{ fontFamily: 'Unbounded' }}>
                        {profile?.firstName} {profile?.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-4">
                      <div className="text-sm font-medium primary-color  flex flex-col">
                        <span>Followers </span>  <span className='text-center text-[25px] py-2'   style={{ fontFamily: 'Unbounded' }}>{profile?.followersCount}</span>
                      </div>
                      <div className="text-sm font-medium primary-color flex flex-col">
                        <span>Following</span>  <span className='text-center text-[25px] py-2'   style={{ fontFamily: 'Unbounded' }}>{profile?.folowingCount}</span>
                      </div>
                    </div>
                   
                    <div className="flex justify-between items-center px-4">
                      <span className="text-sm font-medium primary-color">
                        Member Since 
                      </span>
                      <span className="text-sm primary-color">
                      {formattedDate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-4">
                      <span className="text-sm font-medium primary-color">
                        Country 
                      </span>
                      <span className="text-sm primary-color">
                      {profile?.country}
                      </span>
                    </div>
                  </div>

                {/* Navigation */}
                <div className="mt-3">
                  <ul className="space-y-2">
                    <li>
                    <Link to={'/'}>
                        <button className="w-full text-left text-sm primary-color hover:bg-gray-200 py-3 rounded-lg flex justifu-center items-center gap-[6px] px-4"   style={{ fontFamily: 'Unbounded' }}>
                          <MdLogout className="text-[19px] "  /> Log Out
                        </button>
                    </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      
    </>
  );
};
