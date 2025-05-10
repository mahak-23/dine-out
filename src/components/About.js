import React, { Component } from "react";
// child components
import ToggleSwitch from "./_common/ToggleSwitch";
import User from "./User";

// context api
import UserContext from "../context/userContext";

const foodImg = "https://i.ibb.co/xtjxxVQ2/food-logo.png";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfile: false,
    };
  }

  render() {
    const { showProfile } = this.state;

    return (
      <div className="min-h-[calc(100vh-126px)] flex flex-col items-center bg-[#f1f1f1] px-4 py-8">
        {/* Profile Toggle Section */}
        <div className="flex flex-col items-center gap-4 w-full max-w-4xl mb-8">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold">Show My Profile</h3>
            <ToggleSwitch
              value={showProfile}
              onChange={() => {
                this.setState({ showProfile: !showProfile });
              }}
            />
          </div>
          {showProfile && <User />}
        </div>

        {/* About Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-4xl">
          {/* Left Section - Text */}
          <div className="text-center md:text-left flex flex-col gap-4">
            <UserContext.Consumer>
              {(data) => (
                <h1 className="text-2xl md:text-4xl font-bold leading-snug">
                  Hi, {data.loggedInUser || "Guest"}
                </h1>
              )}
            </UserContext.Consumer>
            <h2 className="text-xl md:text-3xl font-semibold leading-relaxed">
              Welcome to <br className="hidden md:block" />
              <span className="text-orange-500">Tasty & Fresh Food</span>
            </h2>
            <p className="text-gray-700 text-base md:text-lg font-medium italic max-w-[400px]">
              "Better you will feel if you eat a{" "}
              <span className="text-orange-500">Dine Out's</span> healthy meal"
            </p>
          </div>

          {/* Right Section - Image */}
          <div className="flex justify-center">
            <img
              src={foodImg}
              alt="Food logo"
              loading="lazy"
              className="w-44 md:w-64 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default About;
