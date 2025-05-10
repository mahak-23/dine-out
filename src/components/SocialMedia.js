import React from "react";

// constant
import { LINKEDIN_URL, GiTHUB_LINK, EMAIL_LINK } from "../utils/constant";

// icons
import { SiGmail, SiLinkedin, SiGithub } from "react-icons/si";

const SocialMedia = () => {
  return (
    <div className="flex gap-4 mt-2">
      <a
        href={LINKEDIN_URL}
        className="bg-blue-600 text-white p-3 rounded-full transition-transform hover:scale-110"
        target="_blank"
        rel="noreferrer"
      >
        <SiLinkedin size={20} />
      </a>
      <a
        href={GiTHUB_LINK}
        className="bg-gray-800 text-white p-3 rounded-full transition-transform hover:scale-110"
        target="_blank"
        rel="noreferrer"
      >
        <SiGithub size={20} />
      </a>
      <a
        href={"mailto:" + EMAIL_LINK}
        className="bg-red-500 text-white p-3 rounded-full transition-transform hover:scale-110"
      >
        <SiGmail size={20} />
      </a>
    </div>
  );
};

export default SocialMedia;
