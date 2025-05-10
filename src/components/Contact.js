import React, { useState } from "react";
const contactImg = "https://i.ibb.co/v4DtGPHs/contact.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for contacting with Dine Out, We will reply ASAP.");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-[calc(100vh-126px)] w-full flex flex-col md:flex-row items-center justify-evenly gap-8 px-4 py-8 bg-gray-100">
      {/* Contact Image */}
      <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
        <img
          className="w-full max-w-[400px] object-contain"
          src={contactImg}
          alt="Contact"
          loading="lazy"
        />
      </div>

      {/* Contact Form */}
      <div className="w-full md:w-1/2 max-w-[450px] bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Contact Us</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            type="text"
            placeholder="Name"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            type="email"
            placeholder="Email"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 h-32 rounded-md border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            placeholder="Type your Message here..."
            required
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
