import React from "react";
import { Link } from "react-router-dom";
import { IMG_CDN_URL } from "../utils/constant";

const RestaurantCard = ({ restaurantData }) => {
  const {
    id,
    cloudinaryImageId,
    name,
    areaName,
    avgRating,
    cuisines,
    costForTwo,
    sla,
  } = restaurantData;
  return (
    <Link
      to={"/restaurants/" + id}
      className="w-[280px] h-[350px] bg-white rounded-[8px] shadow-md cursor-pointer overflow-hidden hover:scale-[0.99]"
    >
      {" "}
      <img
        src={IMG_CDN_URL + cloudinaryImageId}
        alt={name}
        loading="lazy"
        className="w-full h-[60%] m-0 rounded-t-lg"
      />
      <div className="h-fit px-3 text-sm">
        <h3 className="font-bold text-lg my-1 truncate" title={name}>
          {name}
        </h3>
        <p className="text-gray-500 font-[500] text-sm truncate  pb-1">
          🍽️
          {cuisines.join(", ")}
        </p>
        <p className="text-gray-500 font-[500] text-sm truncate  pb-1">
          {" "}
          📍{areaName}
        </p>

        <div className="flex justify-between items-center my-1">
          <h4 className="flex items-center gap-1">⭐{avgRating}</h4>
          <h4 className="flex items-center gap-1"> 🏷️{costForTwo}</h4>
          <h4 className="flex items-center gap-1">🕒{sla?.slaString}</h4>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;

export const withDiscountOffer = (RestaurantCard) => {
  return (props) => {
    const { aggregatedDiscountInfoV3 } = props.restaurantData;

    return (
      <div
        className="w-[280px] h-[350px] bg-white rounded-[8px] shadow-md cursor-pointer overflow-hidden hover:scale-[0.99]"
        style={{ position: "relative" }}
      >
        {aggregatedDiscountInfoV3 && (
          <div className="py-[4px] px-[8px] rounded-md text-white bg-black text-[12px] font-[600] absolute top-[2px] left-[2px]">{`${
            aggregatedDiscountInfoV3.header || ""
          } ${aggregatedDiscountInfoV3.subHeader || ""}`}</div>
        )}
        <RestaurantCard {...props} />
      </div>
    );
  };
};
