import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// icons
import {
  FaShoppingCart,
  FaHome,
  FaInfo,
  FaPhone,
  FaEdit,
} from "react-icons/fa";
import { MdClose, MdMenu, MdKeyboardArrowDown } from "react-icons/md";

// hooks
import useOnline from "../hooks/useOnline";

// context
import UserContext from "../context/userContext";

const foodLogo = "https://i.ibb.co/xtjxxVQ2/food-logo.png";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { loggedInUser, setUserName } = useContext(UserContext);
  const totalItems = useSelector((store) => store.cart.totalItems);
  const navigate = useNavigate();
  const location = useLocation();
  const isOnline = useOnline();
  const sidebarRef = useRef();
  const dropdownRef = useRef();

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update username
  const handleUpdateUser = () => {
    if (newUsername.trim() !== "") {
      setUserName(newUsername);
      setEditMode(false);
      setNewUsername("");
      setDropdownOpen(false);
    }
  };

  const handleLogout = () => {
    setUserName("");
    navigate("/login");
    setSidebarOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "About", path: "/about", icon: <FaInfo /> },
    { name: "Contact", path: "/contact", icon: <FaPhone /> },
  ];

  return (
    <div className="w-full flex justify-between items-center px-4 py-3 bg-[#f18500] fixed top-0 z-[1000] h-[70px] shadow-md">
      {/* Logo */}
      <Link to="/" className="flex items-center cursor-pointerr">
        <img
          src={foodLogo}
          alt="Food Logo"
          loading="lazy"
          className="w-12 h-12 rounded-full"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6 text-white font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`relative text-white text-[14px] font-medium transition-all after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300 ${
              location.pathname === link.path ? "after:w-full" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}

        <Link
          to="/cart"
          className={`relative text-white text-[14px] font-medium transition-all after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300 ${
            location.pathname === "/cart" ? "after:w-full" : ""
          }`}
        >
          <FaShoppingCart size={16} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        {/* User Profile with Dropdown */}
        <div className="relative ml-4 text-[14px]" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 bg-white text-[#f18500] font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition-all"
          >
            <div
              className={`w-3 h-3 rounded-full ${
                isOnline ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="max-w-[100px] truncate">
              {loggedInUser || "Profile"}
            </span>
            <MdKeyboardArrowDown size={20} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
              <button
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setEditMode(true);
                  setDropdownOpen(false);
                }}
              >
                Edit Profile
              </button>
              <button
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  navigate("/login");
                  setDropdownOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          )}

          {editMode && (
            <div className="absolute right-0 mt-2 w-[250px] bg-white p-5 rounded-lg shadow-lg z-50 flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-4">
                <h3 className="font-bold text-[14px] text-[#333]">
                  Edit Username
                </h3>
                <button
                  className="text-gray-500 hover:text-black"
                  onClick={() => setEditMode(false)}
                >
                  <MdClose size={20} />
                </button>
              </div>
              <input
                type="text"
                placeholder="New Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="text-[14px] text-slate-700 w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#f18500]"
              />
              <button
                onClick={handleUpdateUser}
                className="text-[14px] bg-[#f18500] hover:bg-[#e07000] text-white font-semibold py-2 w-full rounded transition-all"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
        <MdMenu size={28} className="text-white" />
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[250px] bg-white shadow-md transform transition-transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        ref={sidebarRef}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <img
            src={foodLogo}
            alt="Food Logo"
            loading="lazy"
            className="w-10 h-10 rounded-full"
          />
          <button onClick={() => setSidebarOpen(false)}>
            <MdClose size={24} />
          </button>
        </div>
        <nav className="flex flex-col p-4 text-gray-800 font-medium gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-2 ${
                location.pathname === link.path ? "text-[#f18500]" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon} {link.name}
            </Link>
          ))}
          <Link
            to="/cart"
            className={`flex items-center gap-2 ${
              location.pathname === "/cart" ? "text-[#f18500]" : ""
            }`}
          >
            <FaShoppingCart />
            Cart
            {totalItems > 0 && (
              <span className="ml-1 text-xs text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <div className="mt-2 flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isOnline ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="max-w-[100px] truncate">
              {loggedInUser || "Guest"}
            </span>
            <FaEdit
              className="ml-2 cursor-pointer text-gray-600"
              onClick={() => setEditMode(true)}
            />
          </div>

          {editMode && (
            <div className="mt-2 flex flex-col items-center py-2 px-4 rounded-md border-2 border-solid">
              <div className="flex items-center justify-between w-full mb-4">
                <h3 className="font-bold text-[14px] text-[#333]">
                  Edit Username
                </h3>
                <button
                  className="text-gray-500 hover:text-black"
                  onClick={() => setEditMode(false)}
                >
                  <MdClose size={20} />
                </button>
              </div>
              <input
                type="text"
                placeholder="New Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="text-[14px] text-slate-700 w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#f18500]"
              />
              <button
                onClick={handleUpdateUser}
                className="text-[14px] bg-[#f18500] hover:bg-[#e07000] text-white font-semibold py-2 w-full rounded transition-all"
              >
                Save
              </button>
            </div>
          )}
          {loggedInUser ? (
            <button
              onClick={handleLogout}
              className="text-[14px] bg-[#f18500] hover:bg-[#e07000] text-white font-semibold py-2 w-full rounded transition-all"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-[14px] bg-[#f18500] hover:bg-[#e07000] text-white font-semibold py-2 w-full rounded transition-all"
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
