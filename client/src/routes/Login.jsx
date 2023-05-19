import React, { useState, useContext } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AppContext } from "../App";

const auth = getAuth();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setRoute, setUser, setIsAdmin } = useContext(AppContext);
  const clickLoginWithEmail = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        const isAdmin =
          user.email === "admin@admin.com" && password === "123456789";
        setIsAdmin(isAdmin);
        if (isAdmin) {
          setRoute("db");
        } else {
          setRoute("home");
        }
      })
      .catch((error) => {
        //const errorCode = error.code;
        //const errorMessage = error.message;
      });
  };
  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl font-semibold text-sky-600">
          Login with Email and Password
        </h1>
        <form
          onSubmit={clickLoginWithEmail}
          className="flex flex-col gap-2 max-w-sm"
        >
          <input
            className="border border-gray-500 rounded py-1 px-2 ouline-none"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border border-gray-500 rounded py-1 px-2 ouline-none"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-sky-500 text-white py-1 px-3 rounded shadow hover:bg-sky-700 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
