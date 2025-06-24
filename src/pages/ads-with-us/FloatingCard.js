"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingImage = () => {
  const controls = useAnimation();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    controls.start({
      y: [-10, 10],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          ease: "easeInOut",
        },
      },
    });
  }, [controls]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    controls.start({
      rotate: 2,
      scale: 1.05,
      transition: { type: "spring", stiffness: 200 },
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    controls.start({
      rotate: 0,
      scale: 1,
      y: [-10, 10],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          ease: "easeInOut",
        },
      },
    });
  };

  return (
    <motion.div
      animate={controls}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative max-w-1xl mx-auto ml-3"
    >

      {/* Image Container with same styling as the card */}
      <div className="bg-gradient-to-br from-purple-500/35 to-purple-600 p-6 rounded-2xl shadow-xl relative overflow-hidden">
        {/* Replace this img src with your desired image */}
        <img 
          src="/B2B-advertising page-banner.png"
          alt="Your image description"
          className="w-full h-[15vh] ll:h-[40vh] object-cover rounded-lg"
        />
        
        {/* Decorative elements - same as original */}
        {/* <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div> */}
      </div>
    </motion.div>
  );
};

export default FloatingImage;