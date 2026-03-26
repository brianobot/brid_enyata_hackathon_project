import { useEffect, useState, useRef } from 'react';

const useCountUp = (endValue, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [isIntersecting, setIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Use a decimal if the endValue is a float (like 99.9)
      const currentCount = progress * endValue;
      setCount(endValue % 1 === 0 ? Math.floor(currentCount) : currentCount.toFixed(1));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isIntersecting, endValue, duration]);

  return { count, elementRef };
};

const StatItem = ({ label, value, suffix }) => {
  const { count, elementRef } = useCountUp(value);

  return (
    <div ref={elementRef} className="flex flex-col items-center p-6 transition-all duration-500 hover:scale-105">
      <div className="text-2xl font-bold tracking-tight text-[#376491] drop-shadow-sm">
        {count}{suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-slate-500 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
};

// Usage in your Landing Page:
const StatsSection = () => (
  <section>
    <div className="max-w-7xl mx-auto grid grid-cols-3 md:grid-cols-3 gap-8">
      <StatItem label="Business Databases" value={5} suffix="+" />
      <StatItem label="Countries Covered" value={2} suffix="+" />
      <StatItem label="Uptime Guarantee" value={99.9} suffix="%" />
    </div>
  </section>
);

export default StatsSection
