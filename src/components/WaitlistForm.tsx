import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const waitlistSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  category: z.string().min(1, "Please select a category"),
});

const WaitlistForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    category: ""
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate input
      const validatedData = waitlistSchema.parse(formData);

      // Insert into database
      const { error } = await supabase
        .from("waitlist_signups")
        .insert({
          first_name: validatedData.firstName,
          last_name: validatedData.lastName,
          email: validatedData.email,
          who_are_you: validatedData.category,
        });

      if (error) {
        if (error.code === "23505") {
          toast({
            variant: "destructive",
            title: "Already signed up",
            description: "This email is already on our waitlist!",
          });
        } else {
          throw error;
        }
        return;
      }

      toast({
        title: "You're on the list!",
        description: "We'll be in touch soon with early access.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        category: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          variant: "destructive",
          title: "Validation error",
          description: error.errors[0].message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
      }
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
            placeholder="John"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="bg-card border-border focus:ring-primary"
            placeholder="Doe"
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
          placeholder="john@example.com"
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
        className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity font-semibold text-lg py-6"
      >
        Join the Waitlist
      </Button>
    </form>
  );
};

export default WaitlistForm;
