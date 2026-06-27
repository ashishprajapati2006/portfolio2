import { motion } from "framer-motion";

import { ComputersCanvas } from "./canvas";
import { styles } from "../styles";
import { cn } from "../utils/lib";

// Hero
export const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={cn(
          styles.paddingX,
          "absolute inset-0 top-[90px] sm:top-[120px] max-w-7xl mx-auto flex flex-col sm:flex-row items-start gap-3 sm:gap-5 px-4 sm:px-0 z-10 pointer-events-none"
        )}
      >
        {/* Title */}
        <div className="flex flex-col justify-center items-center mt-3 sm:mt-5 pointer-events-auto">
          <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        {/* About Me */}
        <div className="flex-1 max-w-2xl pointer-events-auto">
          <h1 className={cn(styles.heroHeadText, "text-white leading-tight")}>
            Hi, I'm <br className="hidden sm:block" />
            <span className="text-[#915eff] block sm:inline">Ashish Prajapati</span>
          </h1>
          <p className={cn(styles.heroSubText, "mt-3 sm:mt-4 text-white-100 text-sm sm:text-base md:text-lg leading-relaxed")}>
            I build ML, NLP and cybersecurity <br className="sm:block hidden" />
            systems that turn data into working products
          </p>
          <a
            href="/resume/Ashish%20Resume.pdf"
            download
            className="mt-6 sm:mt-8 inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#915eff] text-white rounded-lg text-[14px] sm:text-[16px] font-medium hover:opacity-90 transition-opacity active:scale-95 touch-target"
          >
            Download Resume
          </a>
        </div>
      </div>

      {/* Computer Model */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-[55%] h-[65%] lg:h-[80%] z-0">
        <ComputersCanvas />
      </div>

      {/* Scroll to about section */}
      <div className="absolute bottom-8 sm:bottom-10 w-full flex justify-center items-center">
        <a href="#about" className="focus:outline-none focus:ring-2 focus:ring-[#915eff] rounded-full">
          <div className="w-[30px] sm:w-[35px] h-[50px] sm:h-[64px] rounded-3xl border-3 sm:border-4 border-secondary flex justify-center items-start p-1 sm:p-2">
            <motion.div
              animate={{
                y: [0, 16, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-secondary"
            />
          </div>
        </a>
      </div>
    </section>
  );
};
