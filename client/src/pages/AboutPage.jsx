import React from "react";
import PageWrapper from "../Components/PageWrapper";
import Navbar from "../Components/Navbar";
import AboutLinks from "../Components/AboutLinks";
import { motion } from "framer-motion";

/* ------------------ Animation Variants ------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/* ------------------ Component ------------------ */

const AboutPage = () => {
  return (
    <div>
      {/* ---------------- HERO SECTION ---------------- */}
      <PageWrapper bg="about">
        <Navbar />

        <div className="flex items-center justify-center h-[calc(100vh-100px)] lg:h-[calc(100vh-90px)]">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl md:text-4xl uppercase"
          >
            Know about us
          </motion.h1>
        </div>
      </PageWrapper>

      {/* ---------------- CONTENT SECTION ---------------- */}
      <section className="py-20 flex px-8 lg:px-16 gap-8 lg:gap-16 lg:flex-row flex-col-reverse">
        {/* Text Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:w-4/5 text-justify"
        >
          {[
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque possimus adipisci dicta eveniet explicabo dolore dolores consectetur cupiditate numquam vero?",
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque possimus adipisci dicta eveniet explicabo dolore dolores consectetur cupiditate numquam vero?",
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque possimus adipisci dicta eveniet explicabo dolore dolores consectetur cupiditate numquam vero?",
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque possimus adipisci dicta eveniet explicabo dolore dolores consectetur cupiditate numquam vero?",
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque possimus adipisci dicta eveniet explicabo dolore dolores consectetur cupiditate numquam vero?",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. In reiciendis odit rerum reprehenderit pariatur itaque voluptatem? Ex fugit enim cupiditate ullam?",
          ].map((text, index) => (
            <motion.p
              key={index}
              variants={fadeUp}
              className="mb-6"
            >
              {text}
            </motion.p>
          ))}
        </motion.div>

        {/* Side Menu */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:w-1/5"
        >
          <AboutLinks />
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
