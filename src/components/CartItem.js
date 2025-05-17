import React from "react";

import { useDispatch } from "react-redux";

// constants
import { IMG_CDN_URL } from "../utils/constant";

// redux action
import { addItemToCart, removeItemFromCart } from "../store/slice/cartSlice";

// hooks
import useSimpleConfirm from "../hooks/useSimpleConfirm";

export default function CartItem({ details }) {
  const { name, price, defaultPrice, imageId } = details?.item;
  const { quantity } = details;
  const { confirm, ConfirmModal } = useSimpleConfirm();
  const dispatch = useDispatch();

  const handleAddItemToCart = (item) => {
    confirm(
      <>
        Are you sure you want to add another{" "}
        <span className="text-orange-600 font-bold animate-pulse">{name}</span>{" "}
        to the cart?
      </>,
      (result) => {
        if (result) {
          dispatch(addItemToCart(item));
        }
      }
    );
  };

  const handleRemoveItemFromCart = (item) => {
    confirm(
      <>
        Are you sure you want to remove{" "}
        <span className="text-orange-600 font-bold animate-pulse">{name}</span>{" "}
        from the cart?
      </>,
      (result) => {
        if (result) {
          dispatch(removeItemFromCart(item));
        }
      }
    );
  };

  return (
    <div className="flex items-center gap-4 p-3 border-b last:border-b-0 flex-wrap md:flex-nowrap">
      <img
        src={`${IMG_CDN_URL}${imageId}`}
        alt={name}
        loading="lazy"
        className="w-14 md:w-16 h-14 md:h-16 object-cover rounded"
      />
      <div className="flex flex-col justify-between w-[calc(100%-200px)] truncate">
        <div className="text-sm md:text-lg font-semibold truncate" title={name}>
          {name}
        </div>
        <p className="text-sm md:text-lg text-gray-600">
          ₹ {(price / 100) * quantity || (defaultPrice / 100) * quantity}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-2 md:mt-0">
        <button
          onClick={() => handleRemoveItemFromCart(details?.item)}
          className="w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-600 font-bold rounded-full hover:bg-orange-200 transition"
        >
          -
        </button>
        <span className="text-sm md:text-lg font-semibold">{quantity}</span>
        <button
          onClick={() => handleAddItemToCart(details?.item)}
          className="w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-600 font-bold rounded-full hover:bg-orange-200 transition"
        >
          +
        </button>
      </div>
      {ConfirmModal}
    </div>
  );
}
