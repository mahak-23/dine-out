import React, { useState } from "react";
import { useParams } from "react-router-dom";

// constant
import { IMG_CDN_URL } from "../utils/constant";

// hooks
import useRestaurantMenu from "../hooks/useRestaurantMenu.js";

// child components
import RestaurantMenuCategory from "./RestaurantMenuCategory";
import Shimmer from "./ShimmerUI";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [loading, error, restaurantInfo] = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(0);

  if (loading) {
    return <Shimmer type="menu" />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error:</h2>
          <p className="text-gray-700 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!restaurantInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-lg mt-4">
          No menu available for this restaurant.
        </p>
      </div>
    );
  }

  const {
    cloudinaryImageId,
    name,
    avgRatingString,
    totalRatingsString,
    cuisines,
    locality,
    sla,
  } = restaurantInfo?.cards[2]?.card?.card?.info || {};

  const cards =
    restaurantInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const categories = cards.filter(
    (c) =>
      c?.card?.["card"]?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  return (
    <div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen px-4 md:px-0">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-center bg-black text-white p-4 rounded-lg gap-4">
          <img
            src={IMG_CDN_URL + cloudinaryImageId}
            alt={name}
            loading="lazy"
            className="w-full md:w-48 h-32 object-cover rounded-md mb-4 md:mb-0"
          />
          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-semibold">{name}</h1>
            <h3 className="text-gray-400">{locality}</h3>
            <p className="text-gray-300">{cuisines?.join(", ")}</p>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-2 text-sm md:text-base">
              <span className="flex items-center gap-1">
                ⭐ {avgRatingString || 3.8} (
                {totalRatingsString || "1K+ ratings"})
              </span>
              <span>|</span>
              <span>🕒 {sla?.slaString}</span>
            </div>
          </div>
        </div>
        {/* Categories Section */}
        <div className="mt-6 space-y-4">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <RestaurantMenuCategory
                key={category?.card?.card?.title}
                data={category?.card?.card}
                showMenuItems={index === showIndex}
                setShowIndex={() =>
                  setShowIndex(index === showIndex ? null : index)
                }
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No categories available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
