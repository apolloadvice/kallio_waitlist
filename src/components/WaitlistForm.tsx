import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const WaitlistForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    category: ""
  });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        category: formData.category,
      };

      const { error } = await supabase.from("waitlist_signups").insert(payload);

      if (error) {
        if ((error as any).code === "23505") {
          toast({
            title: "Already signed up",
            description: "This email is already on the waitlist.",
          });
        } else {
          toast({
            title: "Something went wrong",
            description: "Please try again in a moment.",
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "You're on the list!",
        description: "We'll be in touch soon with early access.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        category: ""
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-foreground">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="bg-card border-border focus:ring-primary"
            placeholder="First Name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="bg-card border-border focus:ring-primary"
            placeholder="Last Name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-card border-border focus:ring-primary"
          placeholder="kallio@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="text-foreground">Who Are You?</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger className="bg-card border-border focus:ring-primary">
            <SelectValue placeholder="Select your category" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="business-owner">Business Owner</SelectItem>
            <SelectItem value="influencer">Influencer</SelectItem>
            <SelectItem value="solo-creator">Solo Creator</SelectItem>
            <SelectItem value="content-team">Content Team</SelectItem>
            <SelectItem value="agency">Agency</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity font-semibold text-lg py-6"
      >
        {isSubmitting ? "Joining..." : "Join the Waitlist"}
      </Button>
    </form>
  );
};

export default WaitlistForm;
