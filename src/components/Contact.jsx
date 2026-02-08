import React, { useState, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn, textVariant } from "../utils/motion";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import { ThemeContext } from "../context/ThemeContext";
import LazyCanvas from "./utils/LazyCanvas";

const Contact = () => {
  const { darkTheme } = useContext(ThemeContext);

  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Sandeep M",
          from_email: form.email,
          to_email: "sandeepm1298@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setLoading(false);
          toast.success(
            "Thank you. I will get back to you as soon as possible.",
          );

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          toast.error("Something went wrong. Please try again.");
        },
      );
  };
  return (
    <>
      <div
        className={`lg:mt-0 flex lg:flex-row md:flex-row  flex-wrap flex-col-reverse gap-10 justify-center place-content-center big_screen_hidden`}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className={`flex-[0.75] p-8 rounded-2xl small_spacing transition-all duration-300 
          ${darkTheme ? "bg-tertiary back_black" : "back_white"}`}
        >
          <motion.div variants={textVariant()} className="common">
            <h2 className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black">
              Get in touch
            </h2>
          </motion.div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={`mt-7 flex flex-col gap-8 common_form ${
              darkTheme ? "dark_form" : "light_form"
            }`}
          >
            <label className="flex flex-col">
              <span
                className={`font-medium mb-4 ${darkTheme ? "text-white" : "text-black"}`}
              >
                Your Name *
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className={`py-4 px-3 rounded-lg outline-none border-none font-medium ${
                  darkTheme
                    ? "text-white bg-darkInput"
                    : "text-black bg-lightInput"
                }`}
                required
              />
            </label>

            <label className="flex flex-col">
              <span
                className={`font-medium mb-4 ${darkTheme ? "text-white" : "text-black"}`}
              >
                Your email *
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email address?"
                className={`py-4 px-3 rounded-lg outline-none border-none font-medium ${
                  darkTheme
                    ? "text-white bg-darkInput"
                    : "text-black bg-lightInput"
                }`}
                required
              />
            </label>

            <label className="flex flex-col">
              <span
                className={`font-medium mb-4 ${darkTheme ? "text-white" : "text-black"}`}
              >
                Your Message
              </span>
              <textarea
                rows={3}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What you want to say?"
                className={`py-4 px-3 rounded-lg outline-none border-none font-medium ${
                  darkTheme
                    ? "text-white bg-darkInput"
                    : "text-black bg-lightInput"
                }`}
              />
            </label>

            <div className="flex flex-wrap items-center">
              <button
                type="submit"
                className={`py-3 px-8 rounded-lg outline-none w-fit font-bold shadow-md transition-all duration-300 
                ${darkTheme ? "btn_white" : "btn_light"}`}
              >
                {loading ? "Sending..." : "Send"}
              </button>

              <div className="flex-grow" />

              <div className="flex gap-6">
                <a
                  className="linked_in_icon"
                  href="https://www.linkedin.com/in/sandeep-m-4129ab172/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visit LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  className="whatsapp_icon"
                  href="https://wa.me/9481068352"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Chat on WhatsApp"
                >
                  <IoLogoWhatsapp />
                </a>
              </div>
            </div>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xs:hidden lg:flex-1"
        >
          <div className="w-full h-[600px]">
            <LazyCanvas height="100%">
              <EarthCanvas />
            </LazyCanvas>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
