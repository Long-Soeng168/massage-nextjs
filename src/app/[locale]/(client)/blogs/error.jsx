"use client";
import Image from "next/image";
import Link from "next/link";

 // Error boundaries must be Client Components

export default function Error() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br ">
      <div className="p-10 bg-white border border-black rounded-xl md:flex md:items-center md:space-x-10">
        <div className="text-center md:text-left">
          <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-gray-800 to-black">
            Error
          </h1>
          
          <Link
            href="/"
            className="inline-block px-8 py-3 mt-6 text-base font-semibold text-white transition duration-300 ease-in-out transform bg-black rounded-lg shadow-md hover:bg-gray-800 hover:scale-105"
          >
            Go Back Home
          </Link>
        </div>
        <div className="mt-10 md:mt-0">
          <Image
            width={200}
            height={200}
            src="/images/icons/404-error.png"
            alt="Not Found Illustration"
            className="w-64 mx-auto md:w-80"
          />
        </div>
      </div>
    </div>
  );
}
