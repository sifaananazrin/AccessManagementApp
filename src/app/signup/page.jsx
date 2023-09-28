"use client"
import React, { useState,useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Correct import for useRouter
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const router = useRouter(); // Get the router object

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setValues({
      ...values,
      [id]: value
    });
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/signup", values);
      console.log("signup success", response.data);
      toast.success("Signup Success");
      router.push('/login');
    } catch (error) {
      console.log('signup failed', error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if(values.email.length > 0 && values.password.length > 0 && values.name.length > 0) {
        setButtonDisabled(false);
    } else {
        setButtonDisabled(true);
    }
}, [values]);

  return (
  <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">      
    <Toaster position="top-center" />
  <div className="bg-white shadow-lg rounded p-8 w-full lg:w-1/3">
      {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="newName"
          >
            Name
          </label>
          <input
            onChange={handleInputChange}
            value={values.name}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter your Name"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="newEmail"
          >
            Email Address
          </label>
          <input
            onChange={handleInputChange}
            value={values.email}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="newPassword"
          >
            Password
          </label>
          <input
            onChange={handleInputChange}
            value={values.password}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between">
          <button
            onClick={onSubmit}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
            type="button"
          >
            Sign Up
          </button>
          <a className="text-blue-500 hover:text-blue-800 font-bold text-sm mt-2 md:mt-0 transition duration-300 ease-in-out transform hover:scale-105">
            <Link href="/login">Have an account? Login here.</Link>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SignupComponent;
