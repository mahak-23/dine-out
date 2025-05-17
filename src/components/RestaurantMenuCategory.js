import React from "react";

// child component
import RestaurantMenuItemList from "./RestaurantMenuItemList";

// icons
import { MdKeyboardArrowUp } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";

const RestaurantMenuCategory = ({ data, showMenuItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div className="w-full bg-white shadow-md rounded-md p-4 my-4 transition-all">
      <div
        className="flex justify-between items-center text-lg md:text-xl font-semibold cursor-pointer text-gray-800"
        onClick={handleClick}
      >
        <span className="truncate" title={data?.title}>
          {`${data?.title} (${data?.itemCards?.length})`}
        </span>
        <div className="text-2xl text-gray-500">
          {showMenuItems ? <MdKeyboardArrowUp /> : <RiArrowDownSLine />}
        </div>
      </div>

      {showMenuItems && (
        <div className="mt-2 border-t border-gray-200 pt-4">
          <RestaurantMenuItemList items={data?.itemCards} />
        </div>
      )}
    </div>
  );
};

export default RestaurantMenuCategory;
