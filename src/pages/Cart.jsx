import React from "react";

const Cart = () => {
  return (
    <div className="bg-white min-h-screen p-6 text-black">
      <h1 className="text-3xl font-bold">My Cart</h1>
      <div className="flex flex-col md:flex-row mt-6 gap-6">
        {/* Cart Items */}
        <div className="w-full md:w-3/4 p-4 border border-gray-200">
          <div className="flex items-center gap-4">
            {/* Cart Item Content */}
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-full md:w-1/4 p-4 border border-gray-200">
          <div>
            <h2 className="text-xl font-bold">Course Summary</h2>
            <div className="flex justify-between mt-4">
              <p>Price</p>
              <p>THB --.--</p>
            </div>
            <div className="flex justify-between text-gray-500 text-sm">
              <p>Taxes</p>
              <p>Calculated at Checkout</p>
            </div>
            <div className="flex justify-between font-semibold mt-4">
              <p>Subtotal</p>
              <p>THB --.--</p>
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700">
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
