import React, { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import CardOne from '../../../assets/Card/1.png';
import ImgOne from '../../../assets/Card/imgOneone.png';
import CardTwo from '../../../assets/Card/2.png';
import ImgTwo from '../../../assets/Card/imgTwotwo2.png';
import CardThree from '../../../assets/Card/3.png';
import ImgThree from '../../../assets/Card/imgThreethree.png';
import CardFour from '../../../assets/Card/4.png';
import ImgFour from '../../../assets/Card/imgFour.png';
import Icon from '../../../assets/Images/game.png';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
interface GameOffer {
  title: string;
  offer: string;
  img: string;
  bg: string;
}


const gamesData: GameOffer[] = [
  { img: ImgOne, bg: CardOne, title: 'Brawl Stars', offer: '150 offers' },
  { img: ImgTwo, bg: CardTwo, title: 'Clash of Clans', offer: '148 offers' },
  { img: ImgThree, bg: CardThree, title: 'Lords Mobile', offer: '136 offers' },
  { img: ImgFour, bg: CardFour, title: 'Star Rail', offer: '150 offers' },
  { img: ImgOne, bg: CardOne, title: 'Brawl Stars', offer: '150 offers' },
  { img: ImgTwo, bg: CardTwo, title: 'Clash of Clans', offer: '148 offers' },
  { img: ImgThree, bg: CardThree, title: 'Lords Mobile', offer: '136 offers' },
  { img: ImgFour, bg: CardFour, title: 'Star Rail', offer: '150 offers' },
  { img: ImgOne, bg: CardOne, title: 'Brawl Stars', offer: '150 offers' },
  { img: ImgTwo, bg: CardTwo, title: 'Clash of Clans', offer: '148 offers' },
  { img: ImgThree, bg: CardThree, title: 'Lords Mobile', offer: '136 offers' },
  { img: ImgFour, bg: CardFour, title: 'Star Rail', offer: '150 offers' },
  { img: ImgOne, bg: CardOne, title: 'Brawl Stars', offer: '150 offers' },
  { img: ImgTwo, bg: CardTwo, title: 'Clash of Clans', offer: '148 offers' },
  { img: ImgThree, bg: CardThree, title: 'Lords Mobile', offer: '136 offers' },
  { img: ImgFour, bg: CardFour, title: 'Star Rail', offer: '150 offers' },
  { img: ImgOne, bg: CardOne, title: 'Brawl Stars', offer: '150 offers' },
  { img: ImgTwo, bg: CardTwo, title: 'Clash of Clans', offer: '148 offers' },
  { img: ImgThree, bg: CardThree, title: 'Lords Mobile', offer: '136 offers' },
  { img: ImgFour, bg: CardFour, title: 'Star Rail', offer: '150 offers' },
  { img: ImgOne, bg: CardOne, title: 'Brawl Stars', offer: '150 offers' },
  { img: ImgTwo, bg: CardTwo, title: 'Clash of Clans', offer: '148 offers' },
  { img: ImgThree, bg: CardThree, title: 'Lords Mobile', offer: '136 offers' },
  { img: ImgFour, bg: CardFour, title: 'Star Rail', offer: '150 offers' },
  { img: ImgOne, bg: CardOne, title: 'Brawl Stars', offer: '150 offers' },
  { img: ImgTwo, bg: CardTwo, title: 'Clash of Clans', offer: '148 offers' },
  { img: ImgThree, bg: CardThree, title: 'Lords Mobile', offer: '136 offers' },
  { img: ImgFour, bg: CardFour, title: 'Star Rail', offer: '150 offers' },

];

const ITEMS_PER_PAGE_BIG_SCREEN = 12;  
const ITEMS_PER_PAGE_SMALL_SCREEN = 8;  

const TopUpSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredGames, setFilteredGames] = useState<GameOffer[]>(gamesData);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_BIG_SCREEN);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 750 ? ITEMS_PER_PAGE_BIG_SCREEN : ITEMS_PER_PAGE_SMALL_SCREEN);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value

    return () => window.removeEventListener('resize', handleResize);
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

  const handleFilter = (filter: string) => {
    if (filter === 'Top Up') {
      setFilteredGames(gamesData.filter(game => game.title === 'Brawl Stars'));
    } else if (filter === 'Offer Menu') {
      setFilteredGames(gamesData.filter(game => game.title === 'Clash of Clans'));
    } else {
      setFilteredGames(gamesData);
    }
    setCurrentPage(1);  
  };

  return (
    <div className="pt-[100px] ">
      <div className="flex items-center py-2 px-6 pb-8">
        <img src={Icon} alt="Game Icon" />
        <h4 className="text-[27px] text-white" style={{ fontFamily: 'Unbounded' }}>Games</h4>
      </div>
      <div className="max-w-screen-xl mx-auto common-background lg:px-6 px-4 pb-8 rounded-[15px]">
        <div>
          <div className='flex lg:justify-between items-center lg:flex-row flex-col gap-[20px] lg:gap-[0px] py-[25px]'>
            <div className='flex lg:gap-[15px] w-[100%] lg:w-auto justify-between lg:justify-normal'>
              <span className='relative'>
                <button onClick={() => handleFilter('All')} className='blur-button lg:px-[29px] px-[15px] py-[9px] lg:text-[17px] text-white rounded-[1000px]'>All</button>
              </span>
              <span className='relative'>
                <button onClick={() => handleFilter('Top Up')} className='blur-button lg:px-[29px] px-[18px]  py-[9px] lg:text-[17px] text-white rounded-[1000px]'>Top Up</button>
              </span>
              <span className='relative'>
                <button onClick={() => handleFilter('Offer Menu')} className='blur-button lg:px-[29px] px-[14px] py-[9px] lg:text-[17px] text-white rounded-[1000px]'>Offer Menu</button>
              </span>
            </div>
            <div className='relative extralg:w-[912px] lg:w-[492px] h-[48px] w-[100%]'>
              <input type="text" className='extralg:w-[912px] lg:w-[492px] h-[48px] about-inputbox rounded-[1000px] w-[100%]' placeholder='Search for' />
              <IoSearchSharp className='absolute right-[14px] text-[22px] top-[13px] text-white' />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-6 text-white" style={{ fontFamily: "Unbounded" }}>{filteredGames.length} Top Ups</h2>
        </div>

        <div className={`grid gap-4 pt-[30px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4`}>
  {currentItems.map((game, index) => (
    <div key={index} className="relative text-white rounded-[12px] overflow-hidden extralg:w-[326px] extralg:h-[228px] h-[170px] game-card one flex flex-col items-center justify-center cursor-pointer">
      <img src={game.bg} className="absolute inset-0 object-cover w-full h-full rounded-[12px]" alt="" style={{ zIndex: '-10' }} />
      <img src={game.img} alt={game.title} className="h-[80px] extralg:h-[auto] pt-[20px] lg:pt-[0px]" />
      <h3 className="text-lg font-bold">{game.title}</h3>
      <p className="lg:px-[8px] px-[11px] lg:pl-[16px] py-[3px] lg:py-[8px] lg:w-[126px] lg:h-[45px] offer-menu lg:text-[18px] font-medium rounded-[1000px]">{game.offer}</p>
    </div>
  ))}
</div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <button onClick={handlePrevious} disabled={currentPage === 1} className="   disabled:opacity-50">
          <IoArrowBackCircleSharp className="text-[26px] text-white" />
          </button>
          <span className="text-lg font-semibold text-white" style={{ fontFamily: 'Unbounded' }}>
              {currentPage} <span  className="mx-1"  >of</span> {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages} className=" rounded disabled:opacity-50">
          <IoArrowForwardCircleSharp className="text-[26px] text-white" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default TopUpSection;