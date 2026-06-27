// Contains constant data for using in website
// ! Don't remove anything from here if not sure

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { IconType } from "react-icons";
import {
  SiCplusplus,
  SiDocker,
  SiFlask,
  SiGit,
  SiKalilinux,
  SiKeras,
  SiNumpy,
  SiPandas,
  SiPython,
  SiOpenjdk,
  SiScikitlearn,
  SiStreamlit,
  SiTensorflow,
} from "react-icons/si";

import {
  mobile,
  backend,
  creator,
  web,
  project1,
  project2,
  project3,
  linkedin,
  github,
} from "../assets";

const toSvgDataUrl = (Icon: IconType, color: string) => {
  const svg = renderToStaticMarkup(
    createElement(Icon, { size: 256, color }),
  );

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

// Navbar Links
export const NAV_LINKS = [
  {
    id: "about",
    title: "About",
    link: null,
  },
  {
    id: "work",
    title: "Work",
    link: null,
  },
  {
    id: "achievements",
    title: "Achievements",
    link: null,
  },
  {
    id: "contact",
    title: "Contact",
    link: null,
  },
  {
    id: "resume",
    title: "Resume",
    link: "/resume/Ashish%20Resume.pdf",
  },
  {
    id: "source-code",
    title: "GitHub",
    link: "https://github.com/ashish2772006",
  },
] as const;

// Services
export const SERVICES = [
  {
    title: "Machine Learning",
    icon: web,
  },
  {
    title: "Deep Learning",
    icon: mobile,
  },
  {
    title: "Cybersecurity",
    icon: backend,
  },
  {
    title: "Deployment & MLOps",
    icon: creator,
  },
] as const;

// Technologies
export const TECHNOLOGIES = [
  {
    name: "Python",
    icon: toSvgDataUrl(SiPython, "#3776AB"),
  },
  {
    name: "C / C++",
    icon: toSvgDataUrl(SiCplusplus, "#00599C"),
  },
  {
    name: "Java",
    icon: toSvgDataUrl(SiOpenjdk, "#ED8B00"),
  },
  {
    name: "TensorFlow",
    icon: toSvgDataUrl(SiTensorflow, "#FF6F00"),
  },
  {
    name: "Keras",
    icon: toSvgDataUrl(SiKeras, "#D00000"),
  },
  {
    name: "Scikit-learn",
    icon: toSvgDataUrl(SiScikitlearn, "#F7931E"),
  },
  {
    name: "Pandas",
    icon: toSvgDataUrl(SiPandas, "#150458"),
  },
  {
    name: "NumPy",
    icon: toSvgDataUrl(SiNumpy, "#013243"),
  },
  {
    name: "Streamlit",
    icon: toSvgDataUrl(SiStreamlit, "#FF4B4B"),
  },
  {
    name: "Flask",
    icon: toSvgDataUrl(SiFlask, "#000000"),
  },
  {
    name: "Git",
    icon: toSvgDataUrl(SiGit, "#F05032"),
  },
  {
    name: "Docker",
    icon: toSvgDataUrl(SiDocker, "#2496ED"),
  },
  {
    name: "Kali Linux",
    icon: toSvgDataUrl(SiKalilinux, "#557C94"),
  },
] as const;

// Experiences
export const EXPERIENCES = [
  {
    title: "Machine Learning Intern",
    company_name: "PharmSight Research and Analytics",
    iconLabel: "ML",
    iconBg: "#383E56",
    date: "June 2025 - July 2025",
    points: [
      "Performed feature engineering and exploratory data analysis on healthcare datasets using Python, Pandas, and NumPy.",
      "Implemented and benchmarked supervised and unsupervised models such as SVM, KMeans, and Random Forest for clinical predictions.",
      "Built and deployed a multiple disease prediction system with SVM and Streamlit for real-time user access.",
      "Improved understanding of model optimization, deployment pipelines, and healthcare data compliance.",
    ],
  },
  {
    title: "Research Intern",
    company_name: "Cybersecurity - MNIT Jaipur",
    iconLabel: "SEC",
    iconBg: "#E6DEDD",
    date: "June 2025 - July 2025",
    points: [
      "Conducted reverse engineering and exploit analysis in a cybersecurity research environment.",
      "Studied real-world Metasploit payloads including EternalBlue, VSFTPD v2.3.4 backdoor, and Samba Username Map Script.",
      "Gained hands-on penetration testing practice with Kali Linux, Metasploit Framework, and Meterpreter shells.",
      "Documented payload execution techniques and defense mechanisms for lab research reports.",
    ],
  },
] as const;

// Hackathon Achievements
export const HACKATHON_ACHIEVEMENTS = [
  {
    title: "National CyberShield Hackathon",
    organization: "MP Police",
    achievement: "National Finalist (Top 35)",
    badge: "🥉 Finalist"
  },
  {
    title: "TechJam 2.0",
    organization: "Code Rangers × Microsoft",
    achievement: "National Finalist (Top 40)",
    badge: "🏆 Finalist"
  },
  {
    title: "Arjuna 2.0",
    organization: "NIT Agartala",
    achievement: "National Finalist (Top 5)",
    badge: "🏆 Finalist"
  }
] as const;

// Certifications
export const CERTIFICATIONS = [
  {
    title: "Industrial Training Certificate",
    issuer: "MNIT, Jaipur",
    url: "/Certificate/MNIT_ashish_certificate.pdf"
  },
  {
    title: "Industrial Training Certificate",
    issuer: "PharmSight Research and Analytics",
    url: "/Certificate/Ashish Pharmsight certi.pdf"
  },
  {
    title: "National CyberShield Hackathon Certificate",
    issuer: "MP Police",
    url: "/Certificate/National Cybershield Hackathon Certi.jpg"
  },
  {
    title: "AI/ML for Geodata Analysis",
    issuer: "ISRO",
    url: "/Certificate/AI ML certificate isro.png"
  },
  {
    title: "Arjuna 2.0 Hackathon Certificate",
    issuer: "NIT Agartala",
    url: "/Certificate/Arjuna 2.0 certificate.png"
  },
  {
    title: "Rajasthan Digifest X Tie Global Hackathon",
    issuer: "Rajasthan Government",
    url: "/Certificate/Rajasthan Digifest X Tie Global Hackathon certificate.jpg"
  }
] as const;

// Projects
export const PROJECTS = [
  {
    name: "EcoPilot AI",
    description:
      "Coordinate your path to Net Zero with AI-driven carbon calculation, utility bill scanning (Gemini Vision OCR), visual appliance audits, and conversational coaching to reduce environmental footprint.",
    tags: [
      {
        name: "Next.js",
        color: "blue-text-gradient",
      },
      {
        name: "Gemini API",
        color: "green-text-gradient",
      },
      {
        name: "TypeScript",
        color: "pink-text-gradient",
      },
      {
        name: "TailwindCSS",
        color: "blue-text-gradient",
      },
    ],
    image: "/img/Ecopilot ai.png",
    source_code_link: "https://github.com/ashishprajapati2006/Carbon-Footprint",
    live_site_link: "https://carbon-footprint-dun.vercel.app/",
  },
  {
    name: "Multi-Language Translator",
    description:
      "Combines fine-tuned mBART (Transformer) and custom LSTM Seq2Seq for accurate and flexible translation. Transfer learning implementation with pre-trained mBART for domain-specific translation, Flask and Streamlit apps with Hugging Face integration",
    tags: [
      {
        name: "mBART",
        color: "blue-text-gradient",
      },
      {
        name: "Transformer",
        color: "green-text-gradient",
      },
      {
        name: "LSTM",
        color: "pink-text-gradient",
      },
      {
        name: "Flask",
        color: "blue-text-gradient",
      },
      {
        name: "Streamlit",
        color: "green-text-gradient",
      },
      {
        name: "Hugging Face",
        color: "pink-text-gradient",
      },
    ],
    image: "/img/Multi Language Translator.jpeg",
    source_code_link: "https://github.com/ashishprajapati2006/Multi-Language-Translator",
    live_site_link: "https://multi-language-translator.streamlit.app/",
  },
  {
    name: "Face Mask Recognizer",
    description:
      "CNN-based face mask detection model for images and live video. TensorFlow/Keras CNN with OpenCV, delivered via Streamlit/Flask. Supports single-image, group-photo, and webcam inference",
    tags: [
      {
        name: "CNN",
        color: "blue-text-gradient",
      },
      {
        name: "TensorFlow",
        color: "green-text-gradient",
      },
      {
        name: "Keras",
        color: "pink-text-gradient",
      },
      {
        name: "OpenCV",
        color: "blue-text-gradient",
      },
      {
        name: "Streamlit",
        color: "green-text-gradient",
      },
      {
        name: "Flask",
        color: "pink-text-gradient",
      },
    ],
    image: "/img/FACE MASK RECOGNIZER.jpeg",
    source_code_link: "https://github.com/ashishprajapati2006/Face-Mask-recognition",
    live_site_link: "https://face-mask-recognition.streamlit.app/",
  },
  {
    name: "Movie Sentiment Analysis System",
    description:
      "Built a sentiment analyzer using SimpleRNN deep learning model trained on IMDB dataset. Implemented preprocessing pipeline with word embedding (128-dim), sequence padding, and binary classification with sigmoid activation",
    tags: [
      {
        name: "SimpleRNN",
        color: "blue-text-gradient",
      },
      {
        name: "Deep Learning",
        color: "green-text-gradient",
      },
      {
        name: "Python",
        color: "pink-text-gradient",
      },
      {
        name: "IMDB",
        color: "blue-text-gradient",
      },
      {
        name: "Streamlit",
        color: "green-text-gradient",
      },
    ],
    image: "/img/MOVIE SENTIMENT ANALYSIS SYSTEM.jpeg",
    source_code_link: "https://github.com/ashishprajapati2006/Movie-Sentiment-Analyzer",
    live_site_link: "https://movie-sentiment-analyzer-app.streamlit.app/",
  },
  {
    name: "Multiple Disease Prediction System",
    description:
      "Multi-disease prediction system for Diabetes, Heart Disease, and Parkinson's using SVM, integrated into one Streamlit web app with user-friendly UI",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "SVM",
        color: "green-text-gradient",
      },
      {
        name: "Streamlit",
        color: "pink-text-gradient",
      },
    ],
    image: "/img/multiple disease prediction systeam.jpeg",
    source_code_link: "https://github.com/ashishprajapati2006/Multiple-disease-prediction-system",
    live_site_link: "https://multiple-disease-prediction-system-j33cjgvi47vrzknqyigkag.streamlit.app/",
  },
  {
    name: "Forest Fire Weather Index (FWI) Prediction System",
    description:
      "Ridge Regression model to predict forest fire risk with interactive Streamlit app for real-time predictions, deployed on Streamlit Cloud",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "Ridge Regression",
        color: "green-text-gradient",
      },
      {
        name: "Streamlit",
        color: "pink-text-gradient",
      },
    ],
    image: "/img/Forest Fire Weather Index (FWI) Prediction System.jpeg",
    source_code_link: "https://github.com/ashishprajapati2006/Fire-Weather-Index",
    live_site_link: "https://fire-weather-index.streamlit.app/",
  },
  {
    name: "Student Performance Prediction System",
    description:
      "ML models to predict student exam scores across multiple algorithms, with Flask and Streamlit apps for testing and demonstration",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "Machine Learning",
        color: "green-text-gradient",
      },
      {
        name: "Flask",
        color: "pink-text-gradient",
      },
      {
        name: "Streamlit",
        color: "blue-text-gradient",
      },
    ],
    image: "/img/Student Performance Prediction System.jpeg",
    source_code_link: "https://github.com/ashishprajapati2006/student-performance-flask",
    live_site_link: "https://student-exam.streamlit.app/",
  },
] as const;

import { MdEmail, MdPhone } from "react-icons/md";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export const CONTACT_INFO = [
  {
    icon: MdEmail,
    label: "Email",
    value: "ashish2772006@gmail.com",
    link: "mailto:ashish2772006@gmail.com",
  },
  {
    icon: MdPhone,
    label: "Phone",
    value: "+91 8168027116",
    link: "tel:+918168027116",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "ashishprajapati27",
    link: "https://www.linkedin.com/in/ashishprajapati27/",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "ashishprajapati2006",
    link: "https://github.com/ashishprajapati2006",
  },
] as const;
