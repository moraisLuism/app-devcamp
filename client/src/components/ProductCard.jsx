import React, { useContext } from "react";
import { AppContext } from "../App";

const ProductCard = React.memo(
  ({ product, cartCounts, addToCart, removeFromTheCart, updateStock }) => {
    const { user } = useContext(AppContext);

    return (
      <div
        key={product.id}
        className="rounded-lg border border-sky-600 p-4 flex flex-col gap-2"
      >
        {cartCounts[product.id] > 0 && user && (
          <span className="p-1 bg-sky-500 rounded text-xl font-semibold text-white">
            {cartCounts[product.id]}
          </span>
        )}
        <div className="border-t border-sky-600"></div>
        <div>
          <img className="object-cover h-48 w-48" src={product.img} alt="" />
        </div>
        <div className="border-t border-sky-600"></div>
        <div className="flex gap-2">
          <div className="font-semibold">{product.name} </div>
        </div>
        <div className="border-t border-sky-600"></div>
        <div className="font-semibold">{product.price} €</div>
        <div className="border-t border-sky-600"></div>
        <div className="font-semibold">{product.stock} UDS</div>
        {user ? (
          <>
            <div className="border-t border-sky-600"></div>
            <div className="flex justify-around">
              {cartCounts[product.id] > 0 ? (
                <button
                  className="bg-sky-500 text-white py-1 px-2 rounded shadow hover:bg-sky-700 transition"
                  disabled={product.stock === 0}
                  onClick={() => {
                    if (product.stock !== 0) {
                      addToCart(
                        product.id,
                        product.price,
                        product.name,
                        product.stock
                      );
                      updateStock(product.id, product.stock - 1);
                    }
                  }}
                >
                  {product.stock === 0 ? "SOLD OUT" : "ADD+"}
                </button>
              ) : (
                <div className="flex justify-center">
                  <button
                    className="bg-sky-500 text-white py-1 px-5 rounded shadow hover:bg-sky-700 transition"
                    disabled={product.stock === 0}
                    onClick={() => {
                      if (product.stock !== 0) {
                        addToCart(
                          product.id,
                          product.price,
                          product.name,
                          product.stock
                        );
                        updateStock(product.id, product.stock - 1);
                      }
                    }}
                  >
                    {product.stock === 0 ? "SOLD OUT" : "ADD CART"}
                  </button>
                </div>
              )}

              {cartCounts[product.id] > 0 && (
                <>
                  <div className="flex justify-center">
                    <button
                      className="bg-red-600 text-white py-1 px-3 rounded shadow hover:bg-red-700 transition"
                      onClick={() => {
                        removeFromTheCart(product.id, product.stock);
                        updateStock(product.id, product.stock + 1);
                      }}
                    >
                      REMOVE
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : null}
      </div>
    );
  }
);

export default ProductCard;
