import React, { useState, useEffect, useRef } from "react";

type OffscreenObserverProps = {
  children: React.ReactNode;
  heightClass?: string;
};

export const OffscreenObserver = ({ children, heightClass = "h-full" }: OffscreenObserverProps) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { 
        rootMargin: "200px", // Trigger loading 200px before the element enters the viewport
        threshold: 0.01 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={`w-full ${heightClass}`}>
      {isIntersecting ? children : null}
    </div>
  );
};
