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
      className="flex w-24 sm:w-28 flex-col items-center gap-3 cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      <div className="h-24 w-24 sm:h-28 sm:w-28 flex items-center justify-center relative">
        {hovered ? (
          <BallCanvas icon={icon} />
        ) : (
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-tertiary flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300 border border-white/5 group-hover:border-purple-500/30">
            <img
              src={icon}
              alt={name}
              loading="lazy"
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
            />
          </div>
        )}
      </div>
      <p className="text-center text-xs sm:text-sm text-secondary font-medium transition-colors group-hover:text-white duration-200">
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
        <div className="flex flex-row flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 mt-14 sm:mt-16">
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
