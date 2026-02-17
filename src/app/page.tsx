"use client";

import { motion } from "framer-motion";
import { HeroSection, BentoGrid, WhySection } from "./components/dashboard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      <HeroSection />
      <BentoGrid />
      <WhySection />
    </motion.div>
  );
}
