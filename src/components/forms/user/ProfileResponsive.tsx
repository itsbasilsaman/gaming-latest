import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import LanguageSwitcher from '../../Header/LanguageSwitcher';
// import DarkModeSwitcher from '../../Header/DerkModeSwitcher';
 

interface Country {
  name: string;
  flag: string;
  dialCode: string;
}

interface ApiCountry {
  name: { common: string };
  flags: { svg: string };
  idd: { root?: string; suffixes?: string[] };
}



const ProfileResponsive = () => {


  const [profileImage, setProfileImage] = useState<string | null>(null);
    // const [coverImage, setCoverImage] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [formData, setFormData] = useState({
      firstname: "Basil",
      lastname: "Saman",
      email: "basilsaman.connects@gmail.com",
      gender: "Male",
      dob: "1990-01-01",
      description: "This is a dummy description. Click edit to modify.",
      memberSince : "2024-12-22",
      followers : '0',
      following : '0' ,
      successfulDelivery :'0%',
      blockedUser : '0'
    });
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  
    useEffect(() => {
      fetch('https://restcountries.com/v3.1/all')
        .then((res) => res.json())
        .then((data: ApiCountry[]) => {
          const formattedData = data.map((country) => ({
            name: country.name.common,
            flag: country.flags.svg,
            dialCode: `${country.idd.root || ''}${country.idd.suffixes?.[0] || ''}`,
          }));
          setCountries(formattedData);
        });
    }, []);
  
    const handleEditClick = (field: string) => {
      setIsEditing(field);
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSaveClick = () => {
      setIsEditing(null);
      console.log(formData);
      
    };
  
    const handleImageChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      setImage: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
      const file = e.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file); // Generate a temporary URL for the image
        setImage(imageUrl); // Update the state with the new URL
      }
    };
    
  


  return (
    <>
      <section className="lg:hidden block w-[100%] h-[100%] profile-section   py-[25px] px-[35px] flex flex-col justify-start items-center gap-[30px]">
      <div className="">
      <div className="flex justify-center mb-4">
      <div className='  h-30     rounded-full bg-black/5 p-1 backdrop-blur   sm:p-3'>
          <div className="w-[115px] h-[115px] bg-red-500 text-white flex items-center justify-center rounded-full text-[55px] relative drop-shadow-2 ">
          {profileImage ? (
  <img
    src={profileImage}
    alt="Profile"
    className="w-full h-full rounded-full object-cover"
  />
) : (
  "B"
)}
            <label
                  htmlFor="profile"
                  className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-black text-primary hover:bg-opacity-90 sm:bottom-2 sm:right-2 p-[8px]"
                >
                  <svg
                    className="fill-current"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                      fill=""
                    />
                  </svg>
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    className="sr-only"
                    onChange={(e) => handleImageChange(e, setProfileImage)}
                  />
                </label>
          </div>
      </div>

      </div>
     
          <div className="text-center mb-4">
            <h2 className="text-[16px] primary-color" style={{ fontFamily: 'Unbounded' }}>userName</h2>
            <p className="text-gray-500">Level 1</p>
            <div className="mb-4">
              <div className="flex justify-between my-[6px]">
                <p>Level 1</p>
                <p>Level 2</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "0%" }}></div>
              </div>
               
            </div>
          </div>
          <div className='py-[10px] w-full flex justify-center items-center pb-[18px]'>
          <LanguageSwitcher/>
          </div>
          <div className="w-full space-y-6">
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-4 w-full mr-[10px]">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Firstname</p>
                  {isEditing === "name" ? (
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-2 py-1"
                    />
                  ) : (
                    <p className="text-gray-800">{formData.firstname}</p>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Lastname</p>
                  {isEditing === "name" ? (
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-2 py-1"
                    />
                  ) : (
                    <p className="text-gray-800">{formData.lastname}</p>
                  )}
                </div>
              </div>
              <FaEdit
                className="cursor-pointer text-gray-500"
                onClick={() => handleEditClick("name")}
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                {isEditing === "email" ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                  />
                ) : (
                  <p className="text-gray-800">{formData.email}</p>
                )}
              </div>
              <FaEdit
                className="cursor-pointer text-gray-500"
                onClick={() => handleEditClick("email")}
              />
            </div>

            {/* Gender */}
            <div className="flex justify-between items-center w-full">
              <div>
                <p className="text-sm text-gray-600">Gender</p>
                {isEditing === "gender" ? (
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="text-gray-800">{formData.gender}</p>
                )}
              </div>
              <FaEdit
                className="cursor-pointer text-gray-500"
                onClick={() => handleEditClick("gender")}
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                {isEditing === "dob" ? (
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1"
                  />
                ) : (
                  <p className="text-gray-800">{formData.dob}</p>
                )}
              </div>
              <FaEdit
                className="cursor-pointer text-gray-500"
                onClick={() => handleEditClick("dob")}
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-[19px]">
          <div>
            <p className="text-sm text-gray-600">Description</p>
            {isEditing === "description" ? (
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-2 py-1 my-2"
                rows={3}
                cols={30}
              ></textarea>
            ) : (
              <p className="text-gray-800">{formData.description}</p>
            )}
          </div>
          <FaEdit
            className="cursor-pointer text-gray-500"
            onClick={() => handleEditClick("description")}
          />
        </div>


          {isEditing && (
            <button
              className="w-full primary-background text-white py-2 px-4 rounded-md font-medium hover:bg-blue-900 mt-4"
              onClick={handleSaveClick}
            >
              Save Changes
            </button>
          )}

<p className="text-sm text-gray-600 pt-4 pb-2">Country</p>
<div className="pb-4 flex  items-center justify-between">
   
      <select
        className="w-full border rounded-md p-2 mr-[10px]"
        onChange={(e) => {
          const selected = countries.find((c) => c.name === e.target.value);
          setSelectedCountry(selected || null);
        }}
      >
        <option value="">Select a Country</option>
        {countries.map((country) => (
          <option key={country.name} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
      {selectedCountry && (
        <div className="flex items-center ">
          <img
            src={selectedCountry.flag}
            alt={selectedCountry.name}
            className="w-8 h-5 mr-2"
          />
          <span>{selectedCountry.dialCode}</span>
        </div>
      )}
    </div>       
        <hr className="my-4" />
      <div className="text-center mb-4 text-sm text-gray-500 flex justify-between">
        <p>Member since</p>
        <p className="font-medium">{formData.memberSince}</p>
      </div>
      <hr className="my-4" />
         <div className="flex justify-between text-center text-sm text-gray-500">
        <div>
          <p className="font-medium text-gray-800">{formData.followers}</p>
          <p>Followers</p>
        </div>
        <div>
          <p className="font-medium text-gray-800">{formData.following}</p>
          <p>Following</p>
        </div>
      </div>

      <hr className="my-4" />
 
<div className="text-center mb-4 flex justify-between">
  <p className="text-sm text-gray-500">Successful delivery</p>
 <div>
    <p className="font-medium text-gray-800">{formData.successfulDelivery}</p>
    <p className="text-xs text-gray-500">(Total lifetime orders: 0)</p>
 </div>
</div>

<hr className="my-4" />

 
      <div className="text-center mb-4 text-sm text-gray-500 flex justify-between">
        <p>Blocked User Count</p>
        <p className="font-medium">{formData.blockedUser}</p>
      </div>
 
 
    
    
      
    </div>
      </section>
    </>
  )
}

export default ProfileResponsive