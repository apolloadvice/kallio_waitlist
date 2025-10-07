import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <Card 
      className="p-6 bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
};

export default FeatureCard;
