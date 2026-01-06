import React from "react";
import { Link } from "react-router-dom";
import Images from "./Images";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

/* ------------------ Animation Variants ------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

/* ------------------ Component ------------------ */

const Footer = () => {
  const footerLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/stories", label: "Stories" },
    { to: "/resources", label: "Resources" },
  ];

  const socialIcons = [
    { id: "facebook", icon: FaFacebook },
    { id: "twitter", icon: FaSquareXTwitter },
    { id: "instagram", icon: FaInstagram },
  ];

  return (
    <motion.footer
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-col items-center px-8 lg:px-16 pb-10"
    >
      {/* ---------------- NAV LINKS ---------------- */}
      <motion.div
        variants={fadeUp}
        className="border-y py-6 w-full border-gray-500"
      >
        <motion.div
          variants={staggerContainer}
          className="flex gap-4 md:gap-8 items-center text-sm md:text-lg justify-center px-8"
        >
          {footerLinks.map((item, index) => (
            <motion.div key={index} variants={fadeUp}>
              <Link
                to={item.to}
                className="uppercase hover:text-red-800 duration-500 ease-in-out"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ---------------- LOGO ---------------- */}
      <motion.div
        variants={scaleIn}
        className="border-b border-gray-500 w-full py-8"
      >
        <div className="flex flex-col items-center">
          <Images
            src="main_logo.png"
            alt="logo"
            className="w-[170px] h-[170px]"
            w={500}
            h={500}
          />
          <motion.p
            variants={fadeUp}
            className="uppercase mt-6 text-sm md:text-lg"
          >
            Jesus is the light of the world.
          </motion.p>
        </div>
      </motion.div>

      {/* ---------------- FOOTER BOTTOM ---------------- */}
      <motion.div
        variants={fadeUp}
        className="max-w-7xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 items-center pt-5 md:pt-10 gap-4 md:gap-6 text-sm md:text-lg">
          {/* LEFT */}
          <motion.div
            variants={fadeUp}
            className="uppercase flex flex-col text-center md:text-left"
          >
            <span>Address:</span>
            <span>Lalitpur, Nepal</span>
          </motion.div>

          {/* CENTER (Social Icons) */}
          <motion.div
            variants={staggerContainer}
            className="flex justify-center gap-5 md:gap-8"
          >
            {socialIcons.map((item, index) => (
              <motion.a
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.15, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="opacity-50 hover:opacity-100 transition"
                aria-label={item.id}
              >
                <item.icon size={28} />
              </motion.a>
            ))}
          </motion.div>

          {/* RIGHT */}
          <motion.p
            variants={fadeUp}
            className="uppercase text-center md:text-right"
          >
            Copyright © 2026 His Mission · Privacy · Cookies
          </motion.p>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
