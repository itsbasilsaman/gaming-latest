import React, { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { GetBrandsWithService } from "../../../reduxKit/actions/user/userOfferListing";
import { IoArrowBackCircleSharp, IoArrowForwardCircleSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reduxKit/store";

interface nestedGameBrands {
  description: string;
  descriptionAr: string;
  image: string;
  name: string;
  nameAr: string;
  id: string;
}

interface GameBrands {
  id: string;
  brand: nestedGameBrands;
}

const ITEMS_PER_PAGE_BIG_SCREEN = 12;
const ITEMS_PER_PAGE_SMALL_SCREEN = 8;

const TopUpSection: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceId = queryParams.get("serviceId") || "";
  const ServiceName = queryParams.get("name") || "";
  // const nameAr = queryParams.get("nameAr") || "";
  const iconUrl = queryParams.get("iconUrl") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem,setSelectedItem] = useState<number>(1)
  const [filteredGames, setFilteredGames] = useState<GameBrands[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_BIG_SCREEN);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [allGames, setAllGames] = useState<GameBrands[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();


  const buttons = [
    { id: 1, label: "All" },
    { id: 2, label: "TopUp" },
    { id: 3, label: "Offer Menu" },
  ];



  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(
        window.innerWidth >= 50 ? ITEMS_PER_PAGE_BIG_SCREEN : ITEMS_PER_PAGE_SMALL_SCREEN
      );
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
  const currentItems = filteredGames.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const GetProductsWithServiceOrSubService = async () => {
      try {
        const response = await dispatch(GetBrandsWithService(serviceId));
        if (response.payload.success) {
          setAllGames(response.payload.data.data);
          setFilteredGames(response.payload.data.data);
        }
      } catch (error) {
        console.log("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };
    GetProductsWithServiceOrSubService();
  }, [dispatch, serviceId]);

  useEffect(() => {
    const results = allGames.filter(game =>
      game.brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGames(results);
    setCurrentPage(1);
  }, [searchTerm, allGames]);

  const handleSearch = () => {
    const results = allGames.filter(game =>
      game.brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGames(results);
    setCurrentPage(1);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleFilter = (filter: string) => {
    if (filter === "Top Up") {
      setFilteredGames(allGames.filter(game => game.brand.name === "FreeFire"));
    } else if (filter === "Offer Menu") {
      setFilteredGames(allGames.filter(game => game.brand.name === "FreeFire"));
    } else {
      setFilteredGames(allGames);
    }
    setCurrentPage(1);
  };

  const handleOfferByProduct = (game: GameBrands) => {
    try {
      if (game) {
        navigate(`/about?productId=${game.id}&image=${game.brand.image}&name=${game.brand.name}&description=${game.brand.description}&ServiceName=${ServiceName}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-[100px]">
      <div className="flex items-center py-2 px-6 pb-8">
        <img src={iconUrl} alt="Game Icon" className="lg:w-[150px] w-[100px]" />
        <h4 className="text-[27px] text-white" style={{ fontFamily: "Unbounded" }}>
          {ServiceName}
        </h4>
      </div>
      <div className="max-w-screen-xl mx-auto common-background lg:px-6 px-4 pb-8 rounded-[15px]">
        <div>
          <div className="flex lg:justify-between items-center lg:flex-row flex-col gap-[20px] lg:gap-[0px] py-[25px]">
           {buttons.map((item, index)=> (
             <div className="flex lg:gap-[15px] w-[100%] lg:w-auto justify-between lg:justify-normal">
             <span className="relative" key={index}>
               <button
                 onClick={() =>{ handleFilter(item.label); setSelectedItem(item.id)}}
                 className={`${selectedItem === item.id ? 'selected-button': 'blur-button' }  lg:px-[29px] px-[15px] py-[9px] lg:text-[17px] text-white rounded-[1000px]`}
               >
                {item.label}  
               </button>
             </span>
           </div>

           )) }
            <div className="relative extralg:w-[912px] lg:w-[492px] h-[48px] w-[100%]">
              <input
                type="text"
                className="extralg:w-[912px] lg:w-[492px] h-[48px] about-inputbox rounded-[1000px] w-[100%] text-white"
                placeholder="Search for"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <IoSearchSharp
                className="absolute right-[14px] text-[22px] top-[13px] text-white cursor-pointer"
                onClick={handleSearch}
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-6 text-white" style={{ fontFamily: "Unbounded" }}>
            {filteredGames?.length} Top Ups
          </h2>
        </div>

        <div className={`grid gap-4 pt-[30px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4`}>
          {loading
            ? Array.from({ length: itemsPerPage }).map((_, index) => (
                <div
                  key={index}
                  className="relative rounded-[12px] overflow-hidden extralg:w-[326px] extralg:h-[228px] h-[170px] animate-pulse flex flex-col items-center justify-center cursor-pointer"
                >
                  <div className="absolute inset-0 bg-grayShade rounded-[12px]"></div>
                </div>
              ))
            : currentItems.map((game, index) => (
                <div
                  onClick={() => handleOfferByProduct(game)}
                  key={index}
                  className="relative text-white rounded-[12px] overflow-hidden extralg:w-[326px] extralg:h-[228px] h-[170px] game-card one flex flex-col items-center justify-center cursor-pointer"
                >
                  <img
                    src={game.brand.image}
                    className="absolute inset-0 object-cover w-full h-full rounded-[12px]"
                    alt=""
                    style={{ zIndex: "-10" }}
                  />
                  {filteredGames.length > 0 && (
                    <p className="lg:px-[8px] px-[11px] lg:pl-[16px] py-[3px] lg:py-[8px] lg:w-[126px] lg:h-[45px] offer-menu lg:text-[18px] font-medium rounded-[1000px]">
                      {filteredGames.length} Offers
                    </p>
                  )}
                </div>
              ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="disabled:opacity-50"
          >
            <IoArrowBackCircleSharp className="text-[26px] text-white" />
          </button>
          <span className="text-lg font-semibold text-white" style={{ fontFamily: "Unbounded" }}>
            {currentPage} <span className="mx-1">of</span> {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="rounded disabled:opacity-50"
          >
            <IoArrowForwardCircleSharp className="text-[26px] text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopUpSection;