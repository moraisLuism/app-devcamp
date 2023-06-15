import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

const Home = () => {
  const setLoading = useState(false);
  const { setCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [cartCounts, setCartCounts] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://app-api-server.vercel.app/api/products/"
      );
      const productsWithStock = response.data.map((product) => {
        return {
          ...product,
          stock: product.stock || 0,
        };
      });
      setProducts(productsWithStock);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async (productId, updatedProductData) => {
    try {
      setLoading(true);
      await axios.put(
        `https://app-api-server.vercel.app/api/products/${productId}`,
        updatedProductData
      );
      fetchProducts();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  const productsPerPage = 6;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToShow = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const addToCart = (id, price, name, stock) => {
    setCart((currentItems) => {
      const isItemFound = currentItems.find((item) => item.id === id);
      if (isItemFound) {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...currentItems, { id, name, quantity: 1, price, stock }];
      }
    });
    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
  };

  const removeFromTheCart = (id, stock) => {
    setCart((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      }
    });

    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) - 1,
    }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const updateStock = (productId, newStock) => {
    setProducts((currentProducts) => {
      const updatedProduct = currentProducts.find(
        (product) => product._id === productId
      );
      if (updatedProduct) {
        const { _id, name, price, img } = updatedProduct;
        const updatedProductData = {
          _id,
          name,
          price,
          img,
          stock: newStock,
        };

        updateProduct(productId, updatedProductData);
        return currentProducts.map((product) =>
          product._id === productId ? { ...product, stock: newStock } : product
        );
      }
      return currentProducts;
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mt-4">
        {productsToShow.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            cartCounts={cartCounts}
            addToCart={addToCart}
            removeFromTheCart={removeFromTheCart}
            updateStock={updateStock}
            stock={product.stock}
          />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      {!imagesLoaded && (
        <div className="hidden">
          {products.map((product) => (
            <img
              key={product.id}
              src={product.img}
              alt=""
              onLoad={handleImageLoad}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
