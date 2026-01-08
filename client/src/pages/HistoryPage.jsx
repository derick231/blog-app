import React from "react";
import PageWrapper from "../Components/PageWrapper";
import Navbar from "../Components/Navbar";
import AboutLinks from "../Components/AboutLinks";
import { motion } from "framer-motion";

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

const HistoryPage = () => {
  return (
    <div>
      <PageWrapper bg="history">
        {/* TOP SECTION */}
        <div className=" ">
          <Navbar />

          {/* breadcrumbs */}
          {/* <div className="flex gap-3 items-center px-8 lg:px-16">
            <Link to="/" className="text-sm">
              Home
            </Link>
            <GoDotFill size={10} />
            <span className="text-sky-500 text-xs">Blogs and Articles</span>
          </div> */}
        </div>

        {/* center content */}
        <div className="flex items-center justify-center h-[calc(100vh-100px)] lg:h-[calc(100vh-90px)]  ">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl md:text-4xl center uppercase"
          >
            Our History
          </motion.h1>
        </div>
      </PageWrapper>

      <section className="py-20 flex px-8 lg:px-16 gap-8 lg:gap-16 lg:flex-row flex-col-reverse ">
        {/* contents */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:w-4/5 text-justify"
        >
          <motion.p variants={fadeUp}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque
            possimus adipisci dicta eveniet explicabo dolore dolores consectetur
            cupiditate numquam vero?
          </motion.p>
          <br />
          <motion.p variants={fadeUp}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque
            possimus adipisci dicta eveniet explicabo dolore dolores consectetur
            cupiditate numquam vero?
          </motion.p>
          <br />
          <motion.p variants={fadeUp}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque
            possimus adipisci dicta eveniet explicabo dolore dolores consectetur
            cupiditate numquam vero?
          </motion.p>
          <br />
          <motion.p variants={fadeUp}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque
            possimus adipisci dicta eveniet explicabo dolore dolores consectetur
            cupiditate numquam vero?
          </motion.p>
          <br />

          <motion.p variants={fadeUp}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque
            possimus adipisci dicta eveniet explicabo dolore dolores consectetur
            cupiditate numquam vero?
          </motion.p>
          <br />
          <motion.p variants={fadeUp}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque
            possimus adipisci dicta eveniet explicabo dolore dolores consectetur
            cupiditate Lorem ipsum dolor sit amet consectetur adipisicing elit.
            In reiciendis odit rerum reprehenderit pariatur itaque voluptatem?
            Ex fugit enim cupiditate ullam? Voluptate voluptatum itaque
            architecto ab, ut odio impedit iusto unde officiis ratione rem
            obcaecati saepe nam vitae aliquid in. Ab dolor quia quo explicabo,
            officia vitae ea amet mollitia eos numquam quis odit sit error quas
            consectetur! Nihil, numquam. Adipisci dolorem porro dicta delectus?
            Provident distinctio nemo qui totam maxime vel ea, ipsam assumenda.
            Rem fuga explicabo id porro quasi error neque ea. Ducimus, numquam
            quidem vitae voluptas doloribus cumque non ex molestias nobis
            officia. Eum natus consequuntur molestiae. numquam vero?
          </motion.p>
          <br />
        </motion.div>
        {/* Menu */}
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

export default HistoryPage;
