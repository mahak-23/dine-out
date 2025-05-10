import React from "react";
import { LINKEDIN_URL } from "../utils/constant";

const Footer = () => {
  const currentYear = () => {
    const date = new Date();
    return date.getFullYear();
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center bg-[#ff8c00] p-4 text-white shadow-md">
      <div>
        Created By <span>❤️</span>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="underline ml-1"
        >
          Mahak Kushwaha
        </a>
      </div>
      <div>
        <span>&copy; {currentYear()}</span>
        <span className="font-semibold italic mx-1">Dine Out</span>
      </div>
    </div>
  );
};

export default Footer;
