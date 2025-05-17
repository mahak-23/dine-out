import React, { useState } from "react";

function useSimpleConfirm() {
  const [confirmState, setConfirmState] = useState({
    open: false,
    message: "",
    onConfirm: null,
  });

  // Function to trigger the confirmation modal
  const confirm = (message, onConfirm) => {
    setConfirmState({
      open: true,
      message,
      onConfirm: (result) => {
        onConfirm(result);
        setConfirmState({ open: false, message: "", onConfirm: null });
      },
    });
  };

  const ConfirmModal = confirmState.open ? (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[2000]">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative">
        <p className="text-gray-600 text-center mb-6">{confirmState.message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => confirmState.onConfirm(true)}
            className="bg-[#f18500] hover:bg-[#e07000] text-white font-bold py-2 px-6 rounded-lg transition duration-200"
          >
            Yes
          </button>
          <button
            onClick={() => confirmState.onConfirm(false)}
            className="border border-gray-400 hover:bg-gray-100 text-gray-700 font-bold py-2 px-6 rounded-lg transition duration-200"
          >
            No
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return { confirm, ConfirmModal };
}

export default useSimpleConfirm;
