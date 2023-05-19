import React, { useState, useEffect, useContext } from "react";
import { getProducts } from "../firebase/productController";
import { AppContext } from "../App";
import { updateProduct } from "../firebase/productController";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

const Home = () => {
  const { setCart } = useContext(AppContext);
  const [products, setProduct] = useState([]);
  const [cartCounts, setCartCounts] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const initializeProducts = async () => {
      try {
        const p = await getProducts();
        setProduct([...p]);
      } catch (e) {
        console.error(e);
      }
    };
    initializeProducts();
  }, []);

  /*useEffect(() => {
    if (imagesLoaded) {
    }
  }, [imagesLoaded]);*/

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
            return { ...item, quantity: item.quantity + 1, price, name };
          } else {
            return item;
          }
        });
      } else {
        return [...currentItems, { id, name, quantity: 1, price }];
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
    setProduct((currentProducts) => {
      const updatedProduct = currentProducts.find(
        (product) => product.id === productId
      );
      if (updatedProduct) {
        const updatedProductData = {
          id: updatedProduct.id,
          name: updatedProduct.name,
          price: updatedProduct.price,
          img: updatedProduct.img,
          stock: newStock,
        };
        updateProduct(updatedProductData);
        return currentProducts.map((product) =>
          product.id === productId ? { ...product, stock: newStock } : product
        );
      }
      return currentProducts;
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
        {productsToShow.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cartCounts={cartCounts}
            addToCart={addToCart}
            removeFromTheCart={removeFromTheCart}
            updateStock={updateStock}
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
