import React, { useState } from "react";

interface GameOffer {
  name: string;
  offers: number;
  image: string;
}

const gamesData: GameOffer[] = [
  { name: "Brawl Stars", offers: 150, image: "path_to_brawl_stars_image" },
  { name: "Clash of Clans", offers: 148, image: "path_to_clash_of_clans_image" },
  { name: "Lords Mobile", offers: 136, image: "path_to_lords_mobile_image" },
  { name: "Star Rail", offers: 150, image: "path_to_star_rail_image" },
  { name: "Game 5", offers: 130, image: "path_to_game_5_image" },
  { name: "Game 6", offers: 140, image: "path_to_game_6_image" },
  { name: "Game 7", offers: 135, image: "path_to_game_7_image" },
  { name: "Game 8", offers: 120, image: "path_to_game_8_image" },
  { name: "Game 9", offers: 110, image: "path_to_game_9_image" },
  { name: "Game 10", offers: 125, image: "path_to_game_10_image" },
  { name: "Game 11", offers: 145, image: "path_to_game_11_image" },
  { name: "Game 12", offers: 155, image: "path_to_game_12_image" },
  { name: "Star Rail", offers: 150, image: "path_to_star_rail_image" },
  { name: "Game 5", offers: 130, image: "path_to_game_5_image" },
  { name: "Game 6", offers: 140, image: "path_to_game_6_image" },
  { name: "Game 7", offers: 135, image: "path_to_game_7_image" },
  { name: "Game 8", offers: 120, image: "path_to_game_8_image" },
  { name: "Game 9", offers: 110, image: "path_to_game_9_image" },
  { name: "Star Rail", offers: 150, image: "path_to_star_rail_image" },
  { name: "Game 5", offers: 130, image: "path_to_game_5_image" },
  { name: "Game 6", offers: 140, image: "path_to_game_6_image" },
  { name: "Game 7", offers: 135, image: "path_to_game_7_image" },
  { name: "Game 8", offers: 120, image: "path_to_game_8_image" },
  { name: "Game 9", offers: 110, image: "path_to_game_9_image" },
  { name: "Star Rail", offers: 150, image: "path_to_star_rail_image" },
  { name: "Game 5", offers: 130, image: "path_to_game_5_image" },
  { name: "Game 6", offers: 140, image: "path_to_game_6_image" },
  { name: "Game 7", offers: 135, image: "path_to_game_7_image" },
  { name: "Game 8", offers: 120, image: "path_to_game_8_image" },
  { name: "Game 9", offers: 110, image: "path_to_game_9_image" },
];

const ITEMS_PER_PAGE_BIG_SCREEN = 12; // 4 columns x 3 rows
const ITEMS_PER_PAGE_SMALL_SCREEN = 8; // 2 columns x 4 rows

const TopUpSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Determine items per page based on viewport size
  const itemsPerPage =
    window.innerWidth >= 750 ? ITEMS_PER_PAGE_BIG_SCREEN : ITEMS_PER_PAGE_SMALL_SCREEN;

  const totalPages = Math.ceil(gamesData.length / itemsPerPage);

  const currentItems = gamesData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto ">
      <h2 className="text-2xl font-bold mb-6">Top Ups</h2>
      <div
        className={`grid gap-4 ${
          window.innerWidth >= 750 ? "grid-cols-4 grid-rows-3" : "grid-cols-2 grid-rows-4"
        }`}
      >
        {currentItems.map((game, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-4 flex flex-col items-center justify-center shadow-md"
          >
            <img src={game.image} alt={game.name} className="h-24 mb-4" />
            <h3 className="text-lg font-bold">{game.name}</h3>
            <p className="mt-2">{game.offers} Offers</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TopUpSection;
