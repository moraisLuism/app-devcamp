import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";

const Db = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [img, setImg] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://app-api-server.vercel.app/api/products/"
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createProduct = async () => {
    try {
      await axios.post("https://app-api-server.vercel.app/api/products/", {
        name,
        price,
        stock,
        img,
      });
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async (productId) => {
    try {
      await axios.put(
        `https://app-api-server.vercel.app/api/products/${productId}`,
        {
          name,
          price,
          stock,
          img,
        }
      );
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `https://app-api-server.vercel.app/api/products/${productId}`
      );
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setStock("");
    setImg("");
    setEditingProductId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProductId) {
      updateProduct(editingProductId);
    } else {
      createProduct();
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product._id);
    setName(product.name);
    setPrice(product.price);
    setStock(product.stock);
    setImg(product.img);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const productsPerPage = 6;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToShow = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <>
      <div className="mt-0.5">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <ProductForm
            createProduct={createProduct}
            updateProduct={updateProduct}
            handleSubmit={handleSubmit}
            name={name}
            price={price}
            stock={stock}
            img={img}
            setName={setName}
            setPrice={setPrice}
            setStock={setStock}
            setImg={setImg}
            editingProductId={editingProductId}
            resetForm={resetForm}
          />
          <ProductList
            products={productsToShow}
            handleEdit={handleEdit}
            deleteProduct={deleteProduct}
          />
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Db;
