import React from "react";
import { useSelector, useDispatch } from "react-redux";

// redux action
import { clearCart } from "../store/slice/cartSlice";

// child components
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import PaymentDetails from "./PaymentDetails";

// hooks
import useSimpleConfirm from "../hooks/useSimpleConfirm";

// icons
import { FiTrash2 } from "react-icons/fi";

const Cart = () => {
  const { confirm, ConfirmModal } = useSimpleConfirm();
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart.cartItems);
  const cartItems = Object.values(cart);

  const handleClearCart = async () => {
    confirm("Do you want to Clear the Cart?", (result) => {
      if (result) {
        dispatch(clearCart());
      }
    });
  };

  return (
    <div className="min-h-[calc(100vh-126px)] w-full flex flex-col items-center justify-center bg-[#f1f1f1] py-8 px-4">
      {cartItems.length ? (
        <div className="w-full max-w-[800px] flex flex-col gap-4">
          {/* Cart Header */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
              Your Shopping Cart 🛒
            </h1>
            <button
              onClick={handleClearCart}
              className="text-[12px] md:text-[16px] flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 md:py-2 md:px-6 rounded-md shadow-md transition-all duration-200"
            >
              <FiTrash2 className="text-[12px] md:text-[16px]" />
              Clear Cart
            </button>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center gap-[20px]">
            {/* Items Card */}
            <div className="w-full">
              <div className="bg-white rounded-md">
                {cartItems.map((item) => (
                  <CartItem key={item?.item?.id} details={item} />
                ))}
              </div>
            </div>
            {/* Bill Card */}
            <div className="bg-white w-full rounded-md">
              <PaymentDetails cartItems={cartItems} />
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
      {ConfirmModal}
    </div>
  );
};

export default Cart;
