import { IMG_CDN_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";

// redux actions
import { addItemToCart, removeItemFromCart } from "../store/slice/cartSlice.js";

// hooks
import useSimpleConfirm from "../hooks/useSimpleConfirm";

const RestaurantMenuItemList = ({ items }) => {
  const dispatch = useDispatch();
  const { confirm, ConfirmModal } = useSimpleConfirm();
  const cart = useSelector((store) => store.cart.cartItems);

  const handleAddToCart = (item) => {
    confirm(
      <>
        Are you sure you want to add{" "}
        <span className="text-orange-600 font-bold animate-pulse">
          {item.name}
        </span>{" "}
        to the cart?
      </>,
      (result) => {
        if (result) {
          dispatch(addItemToCart(item));
        }
      }
    );
  };

  const handleRemoveFromCart = (item) => {
    confirm(
      <>
        Are you sure you want to remove{" "}
        <span className="text-orange-600 font-bold animate-pulse">
          {item.name}
        </span>{" "}
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
    <>
      <div className="mt-4 space-y-4">
        {items.map((item) => {
          const {
            id,
            name,
            price,
            defaultPrice,
            ratings,
            imageId,
            description,
          } = item.card.info;
          const avgRatingString = ratings?.aggregatedRating?.rating || 3.8;
          const cartItem = cart && cart[id] ? cart[id] : null;

          return (
            <div
              key={id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 border-b border-gray-200"
            >
              <div className="flex flex-col w-full md:w-[70%] mb-4 md:mb-0">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
                  {name}
                </h2>
                <p className="text-gray-600 mt-1 text-sm md:text-base line-clamp-2">
                  {description
                    ? description.slice(0, 100)
                    : "Description not available"}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-lg font-medium text-orange-600">
                    ₹{price / 100 || defaultPrice / 100}
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                    ⭐ {avgRatingString}
                    <span>
                      ({ratings?.aggregatedRating?.ratingCountV2 || 6} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center w-full md:w-[30%]">
                <img
                  className="w-full md:w-32 h-24 object-cover rounded-md mb-2"
                  src={IMG_CDN_URL + imageId}
                  alt={name}
                  loading="lazy"
                />

                {cartItem ? (
                  <div className="flex items-center space-x-3 text-orange-600 bg-white font-semibold rounded-md text-lg px-2 py-1">
                    <button
                      onClick={() => handleRemoveFromCart(cartItem.item)}
                      className="w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-600 font-bold rounded-full hover:bg-orange-200 transition"
                    >
                      -
                    </button>
                    <span className="font-semibold">{cartItem.quantity}</span>
                    <button
                      onClick={() => handleAddToCart(cartItem.item)}
                      className="w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-600 font-bold rounded-full hover:bg-orange-200 transition"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(item.card.info)}
                    className="text-orange-600 bg-white font-semibold rounded-md text-lg px-4 py-1 border border-orange-600 hover:bg-orange-600 hover:text-white transition"
                  >
                    ADD
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {ConfirmModal}
    </>
  );
};

export default RestaurantMenuItemList;
