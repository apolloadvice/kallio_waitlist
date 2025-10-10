import { useEffect, useState } from "react";

const commands = [
  "trim the dead space in all the clips",
  "add viral story telling captions that match the vibe of the video",
  "cut out all the parts when I'm in the water",
];

const FlashingCommands = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % commands.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-20 flex items-center justify-center mb-8">
      <div
        className={`text-lg md:text-xl text-primary font-medium px-6 py-3 rounded-lg bg-primary/5 border border-primary/20 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        "{commands[currentIndex]}"
      </div>
    </div>
  );
};

export default FlashingCommands;
