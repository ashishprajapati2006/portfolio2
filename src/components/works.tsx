import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { github, preview } from "../assets";
import { PROJECTS } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { cn } from "../utils/lib";
import { fadeIn, textVariant } from "../utils/motion";

type ProjectCardProps = (typeof PROJECTS)[number] & {
  index: number;
};

// Project Card
const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_site_link,
}: ProjectCardProps) => (
  <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
    <Tilt
      options={{
        max: 45,
        scale: 1,
        speed: 450,
      }}
      className="bg-tertiary p-4 sm:p-5 rounded-2xl w-full sm:w-[360px]"
    >
      <div className="relative w-full h-[180px] sm:h-[230px]">
        {/* Work image */}
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover rounded-2xl"
        />

        {/* Live Site & Github */}
        <div className="absolute inset-0 flex justify-end gap-2 m-2 sm:m-3 card-img_hover opacity-100 transition-opacity duration-300">
          <button
            onClick={() => window.open(live_site_link, "_blank", "noreferrer")}
            className="black-gradient w-8 sm:w-10 h-8 sm:h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform active:scale-95 touch-target"
            aria-label="View live site"
          >
            <img
              src={preview}
              alt="Live Site"
              className="w-2/3 h-2/3 object-contain"
            />
          </button>

          {/* Github */}
          <button
            onClick={() =>
              window.open(source_code_link, "_blank", "noreferrer")
            }
            className="black-gradient w-8 sm:w-10 h-8 sm:h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform active:scale-95 touch-target"
            aria-label="View source code"
          >
            <img
              src={github}
              alt="Github"
              className="w-1/2 h-1/2 object-contain"
            />
          </button>
        </div>
      </div>

      {/* Work Info */}
      <div className="mt-3 sm:mt-5">
        <h3 className="text-white font-bold text-[18px] sm:text-[24px] line-clamp-2">{name}</h3>
        <p className="mt-2 text-secondary text-[13px] sm:text-[14px] line-clamp-3">{description}</p>
      </div>

      {/* Work Tag */}
      <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
        {tags.map((tag, tagIdx) => (
          <p key={`Tag-${tagIdx}`} className={cn(tag.color, "text-[12px] sm:text-[14px]")}>
            #{tag.name}
          </p>
        ))}
      </div>
    </Tilt>
  </motion.div>
);

// Works
export const Works = () => {
  return (
    <SectionWrapper>
      <>
        {/* Title */}
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>My Work</p>
          <h2 className={styles.sectionHeadText}>Projects.</h2>
        </motion.div>

        {/* About */}
        <div className="w-full flex">
          <motion.p
            variants={fadeIn(undefined, undefined, 0.1, 1)}
            className="mt-3 text-secondary text-[15px] sm:text-[17px] max-w-3xl leading-[25px] sm:leading-[30px]"
          >
            These projects highlight my work in NLP, computer vision, and
            applied machine learning. Each one was built to solve a practical
            problem and then packaged into a deployable web application.
          </motion.p>
        </div>

        {/* Project Card */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-7 auto-rows-max">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={`project-${i}`} index={i} {...project} />
          ))}
        </div>
      </>
    </SectionWrapper>
  );
};
