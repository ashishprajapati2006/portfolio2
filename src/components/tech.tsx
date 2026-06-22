import { useState } from "react";
import { motion } from "framer-motion";
import { BallCanvas } from "./canvas";
import { TECHNOLOGIES } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";

type TechCardProps = {
  name: string;
  icon: string;
};

// Hover-to-render optimized card for skills
const TechCard = ({ name, icon }: TechCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="flex w-14 xs:w-16 sm:w-24 md:w-28 flex-col items-center gap-1.5 sm:gap-3 cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      <div className="h-14 w-14 xs:h-16 xs:w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 flex items-center justify-center relative">
        {hovered ? (
          <BallCanvas icon={icon} />
        ) : (
          <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-tertiary flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300 border border-white/5 group-hover:border-purple-500/30">
            <img
              src={icon}
              alt={name}
              loading="lazy"
              className="w-7 h-7 xs:w-8 xs:h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain"
            />
          </div>
        )}
      </div>
      <p className="text-center text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-secondary font-medium transition-colors group-hover:text-white duration-200 line-clamp-1">
        {name}
      </p>
    </div>
  );
};

// Technologies
export const Tech = () => {
  return (
    <SectionWrapper idName="tech">
      <>
        {/* Title */}
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>My Tech Stack</p>
          <h2 className={styles.sectionHeadText}>Skills.</h2>
        </motion.div>

        {/* 3D Ball Canvas Grid (hover/touch to load WebGL context) */}
        <div className="grid grid-cols-5 sm:flex sm:flex-row sm:flex-wrap justify-center justify-items-center gap-y-6 gap-x-2 sm:gap-8 md:gap-10 mt-14 sm:mt-16">
          {/* Iterate over each technology */}
          {TECHNOLOGIES.map((technology) => (
            <TechCard 
              key={technology.name} 
              name={technology.name} 
              icon={technology.icon} 
            />
          ))}
        </div>
      </>
    </SectionWrapper>
  );
};
