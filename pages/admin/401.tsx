import { useRouter } from "next/router";
import React from "react";

const NotAuthenticatedPage: React.FC = () => {
  const router = useRouter();
  return (
    <main
      className="min-h-screen bg-cover bg-top sm:bg-top"
      style={{
        backgroundImage:
          'linear-gradient(to top, rgba(8, 8, 8, 0.7), rgba(0, 0, 0, 0.7)),url("/images/banner.png")',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
        <p className="text-sm font-semibold text-white text-opacity-50 uppercase tracking-wide">
          401 error
        </p>
        <h1 className="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
          Unauthenticated
        </h1>
        <p className="mt-2 text-lg font-medium text-white text-opacity-90">
          Unfortunately you are not signed in.
        </p>
        <div className="mt-6 flex justify-center align-center space-x-4">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white text-opacity-75 bg-blue-800 bg-opacity-90 sm:bg-opacity-25 sm:hover:bg-opacity-50"
          >
            Go back home
          </button>
          <button
            onClick={() => router.push("/auth/login")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white text-opacity-75 bg-blue-800 bg-opacity-90 sm:bg-opacity-25 sm:hover:bg-opacity-50"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotAuthenticatedPage;
