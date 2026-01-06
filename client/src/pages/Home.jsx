import React, { useState } from "react";
import PageWrapper from "../Components/PageWrapper";
import Navbar from "../Components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

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

/* ------------------ Tabs Data ------------------ */

const tabs = [
  { id: "doctrine", label: "OUR DOCTRINE" },
  { id: "focus", label: "OUR FOCUS" },
  { id: "hope", label: "OUR HOPE" },
];

const tabContent = {
  doctrine: [
    `Jesus commanded the church to make disciples by going, baptizing, and
     teaching (Matthew 28:19-20)... Doctrine is not the antagonist of the
     Christian faith, but its foundation.`,
    `HeartCry holds unwaveringly to the Scriptures as the only inspired,
     infallible, inerrant, and sufficient standard of the Christian faith
     (II Timothy 3:15-17)...`,
  ],
  focus: [
    `Whenever we ask the question, “How can we strengthen the church?” the
     answer is always the same... The church is built through biblical
     ministry.`,
    `To reach the unreached we must send men who can teach, shepherd, and
     train others in the field.`,
  ],
  hope: [
    `HeartCry Missionary Society was established for two great purposes:
     partnering with indigenous missionaries and trusting God through prayer.`,
    `Thus, our every need will be obtained through prayer alone. If the
     ministry is of the Lord, He will provide.`,
  ],
};

/* ------------------ Component ------------------ */

const Home = () => {
  const [activeTab, setActiveTab] = useState("doctrine");

  return (
    <div>
      {/* ---------------- HERO SECTION ---------------- */}
      <PageWrapper bg="home">
        <Navbar />

        <div className="flex items-center justify-center h-[calc(100vh-100px)] lg:h-[calc(100vh-90px)]">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl md:text-4xl text-center uppercase"
          >
            Welcome to our Blog
          </motion.h1>
        </div>
      </PageWrapper>

      {/* ---------------- MISSION SECTION ---------------- */}
      <section className="h-screen bg-[#0b1c2d] flex items-center justify-center text-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-2/3 lg:w-2/5 flex flex-col text-center"
        >
          <motion.h1 variants={fadeUp} className="text-2xl md:text-4xl/snug uppercase">
            Partnering With Indigenous churches across the globe…
          </motion.h1>

          <motion.h2 variants={fadeUp} className="mt-8 text-md md:text-xl/snug">
            …That they might send forth their missionaries in a manner worthy of God.
          </motion.h2>

          <motion.p variants={fadeUp} className="text-sm italic md:text-lg mt-8">
            “Send them on their way in a manner worthy of God…” — III John 5–8
          </motion.p>
        </motion.div>
      </section>

      {/* ---------------- TABS SECTION ---------------- */}
      <section className="px-6 py-10 md:py-20 flex flex-col items-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-2xl md:text-4xl text-center uppercase mb-16"
        >
          What Matters to Us
        </motion.h1>

        {/* Tabs */}
        <div className="flex gap-8 md:gap-x-20 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-lg md:text-2xl font-semibold tracking-wide transition-colors
                ${
                  activeTab === tab.id
                    ? "text-red-800 border-b-2 border-red-800"
                    : "text-gray-800 hover:text-red-800"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Animated Tab Content */}
        <div className="w-full md:w-3/4 bg-gray-300 px-6 py-6 text-gray-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
            >
              {tabContent[activeTab].map((text, index) => (
                <motion.p
                  key={index}
                  variants={fadeUp}
                  className="text-sm md:text-lg mb-6"
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Home;
