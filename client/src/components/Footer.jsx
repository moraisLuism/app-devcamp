import React, { useContext, useState, useEffect } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { BsFillCartFill, BsList } from "react-icons/bs";
import { AppContext } from "../App";

const Footer = () => {
  const { setRoute, user, isAdmin, route } = useContext(AppContext);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    setIsAdminLoggedIn(isAdmin);
  }, [isAdmin]);

  const handleHomeClick = () => {
    setRoute("home");
  };

  const handleDbClick = () => {
    setRoute("db");
  };

  return (
    <div className="fixed h-16 w-full bg-sky-600 bottom-0 flex justify-evenly items-center">
      <div className="flex items-center gap-2">
        {user && (
          <p className="text-xl font-semibold text-white">
            User logged in: {user.email}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <BsFillCartFill className="text-2xl text-white" />
        <span className="text-xl font-semibold text-white">
          Ecommerce devCamp
        </span>
      </div>

      {isAdminLoggedIn && (
        <>
          <div className="flex items-center gap-2">
            <div
              className="text-4xl text-white cursor-pointer"
              onClick={handleHomeClick}
            >
              <IoHomeSharp />
            </div>
          </div>
        </>
      )}
      {isAdminLoggedIn && user && route === "home" ? (
        <>
          <div
            className="text-4xl text-white cursor-pointer"
            onClick={handleDbClick}
          >
            <BsList />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Footer;
