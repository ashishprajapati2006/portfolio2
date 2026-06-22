import { motion } from "framer-motion";

import { HACKATHON_ACHIEVEMENTS, CERTIFICATIONS } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { cn } from "../utils/lib";
import { fadeIn, textVariant } from "../utils/motion";

type HackathonCardProps = {
  index: number;
  title: string;
  organization: string;
  achievement: string;
  badge: string;
};

const HackathonCard = ({
  index,
  title,
  organization,
  achievement,
  badge,
}: HackathonCardProps) => (
  <motion.div
    variants={fadeIn(undefined, "spring", index * 0.5, 0.75)}
    className="bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
  >
    <div className="flex flex-col h-full justify-between">
      <div>
        <p className="text-secondary text-[12px] uppercase tracking-[0.3em] font-medium">
          {organization}
        </p>
        <p className="text-white font-bold text-[20px] mt-2 leading-[1.3]">{title}</p>
        <p className="mt-3 text-secondary text-[15px] leading-[26px]">
          {achievement}
        </p>
      </div>
      
      <div className="mt-6 flex items-center">
        <div className="bg-tertiary px-4 py-2 rounded-full border border-white/10 w-full flex justify-center">
          <p className="text-white font-semibold text-[16px] tracking-wide">{badge}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

type CertificationCardProps = {
  index: number;
  title: string;
  issuer: string;
  url: string;
};

const CertificationCard = ({
  index,
  title,
  issuer,
  url,
}: CertificationCardProps) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.5, 0.75)}
    className="bg-tertiary p-6 rounded-2xl w-full sm:w-[360px] flex flex-col justify-between hover:bg-black-200 transition-colors duration-300 group cursor-pointer"
    onClick={() => window.open(url, "_blank", "noopener noreferrer")}
  >
    <div>
      <p className="text-secondary text-[12px] uppercase tracking-[0.2em]">{issuer}</p>
      <h3 className="text-white font-bold text-[18px] mt-2 group-hover:text-[#915EFF] transition-colors">{title}</h3>
    </div>
    
    <div className="mt-6 flex justify-between items-center">
      <p className="text-[#915EFF] text-[14px] font-medium flex items-center gap-2">
        View Certificate
        <span className="text-[18px] group-hover:translate-x-1 transition-transform">→</span>
      </p>
    </div>
  </motion.div>
);

export const Feedbacks = () => {
  return (
    <SectionWrapper idName="achievements">
      <div className="mt-12 bg-black-100 rounded-[20px] overflow-hidden">
        <div
          className={cn(
            styles.padding,
            "bg-tertiary rounded-2xl min-h-[300px]"
          )}
        >
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>Hackathons & Competitions</p>
            <h2 className={styles.sectionHeadText}>Achievements.</h2>
          </motion.div>
        </div>

        <div className={cn(styles.paddingX, "-mt-20 pb-14 flex flex-wrap gap-7")}>
          {HACKATHON_ACHIEVEMENTS.map((achievement, i) => (
            <HackathonCard key={`hackathon-${i}`} index={i} {...achievement} />
          ))}
        </div>
        
        {/* Separator */}
        <div className="w-full h-[1px] bg-white/10 mx-auto max-w-7xl my-8"></div>
        
        <div className={cn(styles.paddingX, "pb-8")}>
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>Licenses & Certifications</p>
            <h2 className="text-white font-black md:text-[40px] sm:text-[35px] xs:text-[30px] text-[25px]">
              Certifications.
            </h2>
          </motion.div>
        </div>

        <div className={cn(styles.paddingX, "pb-14 flex flex-wrap gap-7")}>
          {CERTIFICATIONS.map((cert, i) => (
            <CertificationCard key={`cert-${i}`} index={i} {...cert} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
