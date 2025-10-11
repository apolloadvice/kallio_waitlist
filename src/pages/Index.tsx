import { MessageSquare, Brain, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import WaitlistForm from "@/components/WaitlistForm";
import AnimatedCounter from "@/components/AnimatedCounter";
import FeatureCard from "@/components/FeatureCard";
import ThemeToggle from "@/components/ThemeToggle";
import FlashingCommands from "@/components/FlashingCommands";
import kallioLogo from "@/assets/kallio-logo.png";

const Index = () => {
  const [signupCount, setSignupCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const { data, error } = await supabase.rpc("waitlist_signup_count");
      if (!isMounted) return;
      if (error) {
        // Fallback: keep base only if error
        setSignupCount(0);
        return;
      }
      setSignupCount(typeof data === "number" ? data : 0);
    })();
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      
      {/* Gradient overlay effects */}
      <div className="fixed inset-0 bg-gradient-radial opacity-30 pointer-events-none" />
      <div className="fixed top-0 right-0 w-1/2 h-1/2 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-1/2 h-1/2 bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-20 pb-16 text-center">
          <div className="animate-fade-in">
            <img 
              src={kallioLogo} 
              alt="Kallio" 
              className="w-24 h-24 mx-auto mb-8 animate-float"
            />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
              Your AI Video Editor
              <br />
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Just tell Kallio what you want. Kallio understands your vision and edits videos.
            </p>
          </div>

          {/* Demo Video */}
          <div className="mb-12 max-w-4xl mx-auto px-4">
            <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: '56.250%' }} className="rounded-lg shadow-lg overflow-hidden">
              <iframe 
                allow="fullscreen" 
                allowFullScreen 
                height="100%" 
                src="https://streamable.com/e/wezd20?" 
                width="100%" 
                style={{ border: 'none', width: '100%', height: '100%', position: 'absolute', left: 0, top: 0, overflow: 'hidden' }}
              />
            </div>
          </div>

          {/* Counter */}
          <div className="mb-16">
            <AnimatedCounter target={(590 + (signupCount ?? 0))} duration={2500} />
          </div>

          {/* Waitlist Form */}
          <div className="flex justify-center animate-slide-up">
            <WaitlistForm />
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Powered by AI That Gets You
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Kallio learns your style, understands your content, and delivers professional edits in minutes.
          </p>
          
          <FlashingCommands />
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={<MessageSquare size={40} />}
              title="Just Chat & Create"
              description="Tell Kallio what you want in plain English. Just describe your vision and watch it come to life."
              delay={0}
            />
            <FeatureCard
              icon={<Brain size={40} />}
              title="Context-Aware Intelligence"
              description="Kallio understands your content's context, emotion, and pacing. It knows when to cut, when to highlight, and how to keep your audience engaged."
              delay={200}
            />
            <FeatureCard
              icon={<TrendingUp size={40} />}
              title="Learns Your Style"
              description="The more you use Kallio, the better it gets. It analyzes your past videos and social media to match your unique editing style."
              delay={400}
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">
            © 2025 Kallio. Create More.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
