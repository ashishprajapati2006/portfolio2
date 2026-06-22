import { lazy, Suspense, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { CustomCursor } from "./components/cursor";
import { Hero } from "./components/hero";
import { Navbar } from "./components/navbar";
import Banner from "./components/banner";
import Footer from "./components/footer";

// Lazy load below-the-fold components
const About = lazy(() => import("./components/about").then((m) => ({ default: m.About })));
const Experience = lazy(() => import("./components/experience").then((m) => ({ default: m.Experience })));
const Tech = lazy(() => import("./components/tech").then((m) => ({ default: m.Tech })));
const Works = lazy(() => import("./components/works").then((m) => ({ default: m.Works })));
const Feedbacks = lazy(() => import("./components/feedbacks").then((m) => ({ default: m.Feedbacks })));
const Contact = lazy(() => import("./components/contact").then((m) => ({ default: m.Contact })));
const StarsCanvas = lazy(() => import("./components/canvas/stars"));

// Premium fallback placeholder while loading lazy-loaded sections
const SectionFallback = () => (
  <div className="w-full min-h-[300px] flex items-center justify-center bg-primary">
    <div className="w-8 h-8 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
  </div>
);

// App
const App = () => {
  const [hide, setHide] = useState(true);

  return (
    <BrowserRouter>
      <CustomCursor />
      <Banner hide={hide} setHide={setHide} />
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar hide={hide} />
          <Hero />
        </div>
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Experience />
          <Tech />
          <Works />
          <Feedbacks />

          {/* Contact */}
          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
