import { motion } from "framer-motion";
import { useState } from "react";

const BlogTitle = ({ title }: { title: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative  font-bold mb-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="relative z-10 text-3xl text-gray-800">{title}</h2>
      <motion.span
        className="absolute bottom-0 left-0 h-3 bg-yellow-500"
        style={{ zIndex: 1 }}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        variants={{
          initial: { width: "0%", opacity: 0 },
          hover: {
            width: "90%",
            opacity: 0.6,
            transition: { duration: 0.6, ease: "easeInOut" },
          },
        }}
      ></motion.span>
    </motion.div>
  );
};

export default BlogTitle;
