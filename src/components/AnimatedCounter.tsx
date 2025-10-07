import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
}

const AnimatedCounter = ({ target, duration = 2000 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * target);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [target, duration]);

  return (
    <div className="text-center animate-counter">
      <div className="text-6xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        {count.toLocaleString()}
      </div>
      <div className="text-muted-foreground text-lg mt-2">Creators on the waitlist</div>
    </div>
  );
};

export default AnimatedCounter;
