import React, { useState } from "react";
// icons
import { IoIosClose } from "react-icons/io";

// child components
import RestaurantCard, { withDiscountOffer } from "./RestaurantCard";
import ShimmerUI from "./ShimmerUI";
import ToggleSwitch from "./_common/ToggleSwitch";

// hooks
import useRestaurantsList from "../hooks/useRestaurantsList.js";

const Body = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(false);
  const RestaurantCardWithDiscount = withDiscountOffer(RestaurantCard);
  const [
    loading,
    error,
    restaurantList,
    filteredRestaurants,
    setFilteredRestaurants,
  ] = useRestaurantsList();

  const handleSearchValue = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterRestaurants = (type) =>
    type === "rating"
      ? restaurantList.filter((rest) => rest.info.avgRating > 4.3)
      : restaurantList.filter((rest) =>
          rest.info.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const handleSearch = () => {
    const filteredData = filterRestaurants();
    setFilteredRestaurants(filteredData);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredRestaurants(restaurantList);
  };

  return loading ? (
    <ShimmerUI type="card" />
  ) : (
    <div className="flex flex-col items-center min-h-[calc(100vh-126px)] py-[20px] bg-gray-100 w-[100%]">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 mb-6 w-[100%] px-4">
        {/* Search Box */}
        <div className="flex w-full md:w-[50%] justify-center items-center bg-white p-2 rounded-md shadow-sm">
          <input
            value={searchTerm}
            onChange={handleSearchValue}
            className="truncate flex-1 px-4 py-2 outline-none text-gray-700 text-sm md:text-base"
            placeholder="Search Restaurant Name, Area, Cuisines..."
          />
          {searchTerm && (
            <IoIosClose
              className="text-2xl md:text-3xl text-gray-500 cursor-pointer rounded-full p-[2px] hover:bg-slate-300 transition"
              onClick={clearSearch}
            />
          )}
          <span
            className="text-lg md:text-xl text-gray-500 cursor-pointer rounded-full p-[4px] hover:bg-slate-300 transition"
            onClick={handleSearch}
          >
            🔍
          </span>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-[6px] text-gray-700 font-medium text-sm md:text-base">
          <span className="whitespace-nowrap">Top Rated Restaurants</span>
          <ToggleSwitch
            value={filter}
            onChange={() => {
              setFilter(!filter);
              setFilteredRestaurants(
                filter ? filterRestaurants() : filterRestaurants("rating")
              );
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-[20px] w-[85%]">
        {restaurantList.length > 0 ? (
          filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) =>
              restaurant.info.aggregatedDiscountInfoV3 ? (
                <RestaurantCardWithDiscount
                  key={restaurant.info.id}
                  restaurantData={restaurant.info}
                />
              ) : (
                <RestaurantCard
                  key={restaurant.info.id}
                  restaurantData={restaurant.info}
                />
              )
            )
          ) : (
            <div className="text-red-500 font-semibold text-center">
              No Restaurant matches your filter!!
            </div>
          )
        ) : (
          <div className="text-red-500 font-semibold text-center">
            {error ? error : "No Restaurants Data Available"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
