"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // todo: replace with actual API call
    console.log("Newsletter subscription:", email);
    setSubscribed(true);
    toast({
      title: "Successfully Subscribed!",
      description: "You'll receive exclusive offers and updates.",
    });
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-8 sm:p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-silver/10 mb-6">
            <Mail className="h-8 w-8 text-silver-light" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Subscribe to receive exclusive listings, special offers, and automotive news delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background/50 border-silver/30"
              data-testid="input-newsletter-email"
              required
            />
            <Button
              type="submit"
              className="bg-silver-light text-background font-medium gap-2"
              disabled={subscribed}
              data-testid="button-subscribe"
            >
              {subscribed ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Subscribed
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </Card>
      </div>
    </section>
  );
}
