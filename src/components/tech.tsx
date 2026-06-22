import { useState, useEffect } from "react";
import { BallCanvas } from "./canvas";
import { TECHNOLOGIES } from "../constants";
import { SectionWrapper } from "../hoc";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is Mobile
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    setIsMobile(mediaQuery.matches);

    // Handle changes
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  if (isMobile) {
    // Simplified grid layout for mobile
    return (
      <SectionWrapper>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 justify-center">
          {TECHNOLOGIES.map((technology) => (
            <div 
              className="flex flex-col items-center gap-2" 
              key={technology.name}
              title={technology.name}
            >
              <div className="h-16 w-16 sm:h-20 sm:w-20">
                <img
                  src={technology.icon}
                  alt={technology.name}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-center text-xs text-secondary line-clamp-2">
                {technology.name}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    );
  }

  // 3D Ball Canvas for desktop (hover to load WebGL context)
  return (
    <SectionWrapper>
      <div className="flex flex-row flex-wrap justify-center gap-8 md:gap-10">
        {/* Iterate over each technology */}
        {TECHNOLOGIES.map((technology) => (
          <TechCard 
            key={technology.name} 
            name={technology.name} 
            icon={technology.icon} 
          />
        ))}
      </div>
    </SectionWrapper>
  );
};
