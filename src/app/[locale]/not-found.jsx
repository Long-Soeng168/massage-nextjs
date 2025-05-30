import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br ">
      <div className="p-10 bg-white border border-black rounded-xl md:flex md:items-center md:space-x-10">
        <div className="text-center md:text-left">
          <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-gray-800 to-black">
            404
          </h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-800">
            Page Not Found
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          {/* <Link href="/" className="inline-block px-8 py-3 mt-6 text-base font-semibold text-white transition duration-300 ease-in-out transform bg-black rounded-lg shadow-md hover:bg-gray-800 hover:scale-105">
              Go Back Home
          </Link> */}
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
};

export default NotFoundPage;
