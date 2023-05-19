//import React, { useState } from "react";
//import axios from "axios";

const ProductForm = ({
  createProduct,
  updateProduct,
  resetForm,
  editingProductId,
  name,
  price,
  stock,
  img,
  setName,
  setPrice,
  setStock,
  setImg,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProductId) {
      updateProduct(editingProductId);
    } else {
      createProduct();
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center"
      >
        <div className="font-semibold">
          <input
            type="text"
            placeholder="Name"
            className="border shadow outline-none focus:ring ring-sky-600 rounded px-2 py-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="font-semibold">
          <input
            type="number"
            placeholder="Price"
            className="border shadow outline-none focus:ring ring-sky-600 rounded px-2 py-1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="font-semibold">
          <input
            type="number"
            placeholder="Stock"
            className="border shadow outline-none focus:ring ring-sky-600 rounded px-2 py-1"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div className="font-semibold">
          <input
            type="text"
            placeholder="Image URL"
            className="border shadow outline-none focus:ring ring-sky-600 rounded px-2 py-1"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>
        <div className="flex justify-between space-x-4">
          <button
            type="submit"
            className="bg-sky-500 text-white py-1 px-3 rounded shadow hover:bg-sky-700 transition"
          >
            {editingProductId ? "UPDATE" : "ADD"}
          </button>
          {editingProductId && (
            <button
              type="button"
              className="bg-red-500 text-white py-1 px-3 rounded shadow hover:bg-red-700 transition"
              onClick={resetForm}
            >
              CANCEL
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
