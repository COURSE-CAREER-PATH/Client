// App.js
import React from "react";
import "./test.css";

function TestApp() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200">
      <nav className="flex justify-between items-center w-full p-6 max-w-7xl">
        <div className="text-2xl font-bold text-gray-800">Grey</div>
        <div className="space-x-8 hidden md:flex">
          <a href="#" className="text-gray-800 text-base font-medium">
            Products
          </a>
          <a href="#" className="text-gray-800 text-base font-medium">
            Learn
          </a>
          <a href="#" className="text-gray-800 text-base font-medium">
            Company
          </a>
        </div>
        <div className="space-x-4 hidden md:flex">
          <button className="text-gray-800 text-base font-medium">
            Log In
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium">
            Get started — It’s free
          </button>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 py-12">
        <div className="text-left md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Inclusive global banking designed just for you.
          </h1>
          <p className="text-lg text-gray-700">
            Receive, send, exchange, and manage multiple currencies in one app.
            Open a foreign UK, US, and EU bank account from your phone for free.
          </p>
          <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full font-medium">
            Get started— It’s free
          </button>
        </div>
        <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src="https://www.webhosting.uk.com/blog/wp-content/uploads/2018/07/10-Essential-Design-and-Development-Features-for-Today%E2%80%99s-Websites-Blog.png"
            alt="Banking App"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default TestApp;
