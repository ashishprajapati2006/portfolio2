import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { SERVICES } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

type ServiceCardProps = {
  index: number;
  title: string;
  icon: string;
};

// Service Card
const ServiceCard = ({ index, title, icon }: ServiceCardProps) => {
  return (
    <Tilt
      options={{
        max: 45,
        scale: 1,
        speed: 450,
      }}
      className="xs:w-[250px] w-full"
    >
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div className="bg-tertiary rounded-[20px] py-5 px-6 sm:px-12 min-h-[250px] sm:min-h-[280px] flex justify-evenly items-center flex-col">
          <img 
            src={icon} 
            alt={title} 
            loading="lazy"
            className="w-12 sm:w-16 h-12 sm:h-16 object-contain" 
          />
          <h3 className="text-white text-[16px] sm:text-[20px] font-bold text-center px-2">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

// About
export const About = () => {
  return (
    <SectionWrapper idName="about">
      <>
        {/* Title */}
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Profile</p>
          <h2 className={styles.sectionHeadText}>About Me.</h2>
        </motion.div>

        {/* Body */}
        <motion.p
          variants={fadeIn(undefined, undefined, 0.1, 1)}
          className="mt-4 text-secondary text-[14px] sm:text-[16px] md:text-[17px] max-w-3xl leading-[24px] sm:leading-[28px] md:leading-[30px]"
        >
          I'm Ashish Prajapati, a 3rd-year B.Tech (IT) student with hands-on
          experience in machine learning, deep learning, NLP, and
          cybersecurity. I build and deploy end-to-end Python systems using
          tools like TensorFlow, Flask, Streamlit, Hugging Face, and LLMs. I am
          currently seeking a corporate internship where I can contribute
          practical AI/ML solutions to real-world business problems.
        </motion.p>

        {/* Service Card */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-6 sm:gap-8 md:gap-10 auto-rows-max">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} index={i} {...service} />
          ))}
        </div>
      </>
    </SectionWrapper>
  );
};
