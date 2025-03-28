import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full mb-3 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded-md"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 w-full rounded">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
