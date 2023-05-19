import React, { useState, useContext } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { AppContext } from "../App";

const auth = getAuth();

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setRoute, setUser } = useContext(AppContext);
  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast(`USER: ${email} Registered Successfully`);
        setUser(user);
        setRoute("home");
      })
      .catch((error) => {
        //const errorCode = error.code;
        //const errorMessage = error.message;
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-xl font-semibold text-sky-600 text-center">
        Register with Email and Password
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
