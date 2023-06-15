import React from "react";

const ProductList = ({ products, handleEdit, deleteProduct }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mt-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="rounded-lg border border-sky-600 p-4 flex flex-col gap-2"
        >
          <div className="font-semibold">
            <img
              className="object-scale-down h-48 w-96"
              src={product.img}
              alt=""
            />
          </div>
          <div className="border-t border-sky-600"></div>
          <div className="font-semibold">{product.name}</div>
          <div className="border-t border-sky-600"></div>
          <div className="font-semibold">PRICE: {product.price} €</div>
          <div className="border-t border-sky-600"></div>
          <div className="font-semibold">STOCK: {product.stock}</div>
          <div className="border-t border-sky-600"></div>
          <div className="flex justify-between">
            <button
              onClick={() => handleEdit(product)}
              className="bg-sky-500 text-white py-1 px-3 rounded shadow hover:bg-sky-700 transition"
            >
              EDIT
            </button>
            <button
              onClick={() => deleteProduct(product._id)}
              className="bg-red-600 text-white py-1 px-3 rounded shadow hover:bg-red-700 transition"
            >
              DELETE
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
