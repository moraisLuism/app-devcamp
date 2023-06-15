import React, { useState, createContext } from "react";
import { app } from "./firebase";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import ConfirmBuy from "./routes/ConfirmBuy";
import Db from "./routes/Db";
import { ToastContainer } from "react-toastify";

export const AppContext = createContext(null);

function App() {
  const [route, setRoute] = useState("home");
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <AppContext.Provider
      value={{
        route,
        setRoute,
        user,
        setUser,
        cart,
        setCart,
        isAdmin,
        setIsAdmin,
      }}
    >
      <div className="h-screen">
        <ToastContainer />
        <Header />
        <main className="px-6 pt-24 pb-20">
          {route === "home" && <Home />}
          {route === "login" && <Login />}
          {route === "register" && <Register />}
          {route === "ConfirmBuy" && <ConfirmBuy />}
          {route === "db" && <Db />}
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
