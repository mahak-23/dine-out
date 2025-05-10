import React, { useEffect, useState } from "react";
import {
  GITHUB_USER_API,
  GITHUB_USERNAME,
  GiTHUB_LINK,
  GITHUB_REPOSITORY_NAME,
  GITHUB_REPO_API,
} from "../utils/constant";

// child components
import Shimmer from "./ShimmerUI";
import SocialMedia from "./SocialMedia";

const User = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loader, setLoader] = useState(false);
  const [repoInfo, setRepoInfo] = useState({});
  const [loaderRepo, setLoaderRepo] = useState(false);

  const fetchUserInfo = async () => {
    try {
      setLoader(true);
      const response = await fetch(GITHUB_USER_API + GITHUB_USERNAME);
      const json = await response.json();
      setUserInfo(json);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoader(false);
    }
  };

  const fetchRepoInfo = async () => {
    try {
      setLoaderRepo(true);
      const response = await fetch(
        `${GITHUB_REPO_API}${GITHUB_USERNAME}/${GITHUB_REPOSITORY_NAME}`
      );
      const json = await response.json();
      setRepoInfo(json);
    } catch (error) {
      console.error("Error fetching repo data:", error);
    } finally {
      setLoaderRepo(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchRepoInfo();
  }, []);

  return loader || loaderRepo ? (
    <Shimmer type="profile" />
  ) : (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 p-6 bg-white rounded-xl shadow-md w-full max-w-4xl">
      {/* Left Profile Section */}
      <div className="flex flex-col items-center text-center md:text-left md:items-start gap-4">
        <h1 className="text-2xl font-bold">About Me</h1>
        <a
          href={GiTHUB_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center"
        >
          <img
            src={userInfo.avatar_url}
            alt="User Avatar"
            loading="lazy"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
          />
          <h2 className="text-xl text-blue-600 font-semibold mt-2">
            {userInfo.name}
          </h2>
          <p className="text-gray-600 max-w-xs">{userInfo.bio}</p>
        </a>
      </div>

      {/* Right Profile Section */}
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold">Repository</h3>
          <a
            href={repoInfo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-medium hover:underline"
          >
            {repoInfo.name || "Repository Name"}
          </a>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "JavaScript",
              "HTML",
              "CSS",
              "Tailwind",
              "Redux",
              "REST APIs",
            ].map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Social</h3>
          <SocialMedia />
        </div>
      </div>
    </div>
  );
};

export default User;
