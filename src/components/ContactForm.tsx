"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { executeRecaptcha } from "@/components/ReCaptchaProvider";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  inquiry: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  whatsappNumber?: string;
  recaptchaSiteKey?: string;
}

// Map inquiry values to readable labels
const inquiryLabels: Record<string, string> = {
  buy: "Buying a Vehicle",
  sell: "Selling a Vehicle",
  preorder: "Pre-Order Inquiry",
  trade: "Trade-In",
  other: "Other",
};

export default function ContactForm({
  title = "Register Your Interest",
  subtitle = "Fill out the form below and our team will get back to you within 24 hours.",
  whatsappNumber = "",
  recaptchaSiteKey = "",
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      inquiry: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Verify reCAPTCHA before processing form
      if (recaptchaSiteKey) {
        try {
          // Execute reCAPTCHA
          const recaptchaToken = await executeRecaptcha(
            recaptchaSiteKey,
            "contact_form_submit"
          );

          // Verify token with backend
          const verifyResponse = await fetch("/api/verify-recaptcha", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: recaptchaToken }),
          });

          const verifyData = await verifyResponse.json();

          if (!verifyData.success) {
            toast({
              title: "Verification Failed",
              description: "Please try again. reCAPTCHA verification failed.",
              variant: "destructive",
            });
            setIsSubmitting(false);
            return;
          }
        } catch (recaptchaError) {
          console.error("reCAPTCHA error:", recaptchaError);
          // In development or if reCAPTCHA fails, allow submission but log the error
          if (process.env.NODE_ENV === "production") {
            toast({
              title: "Verification Error",
              description: "Unable to verify submission. Please try again.",
              variant: "destructive",
            });
            setIsSubmitting(false);
            return;
          }
        }
      }

      // Debug: Log the received WhatsApp number
      console.log("Received WhatsApp number:", whatsappNumber);
      
      // Format WhatsApp number from site settings (remove any non-digit characters)
      const formattedWhatsApp = whatsappNumber ? whatsappNumber.replace(/\D/g, '') : '';
      
      console.log("Formatted WhatsApp number:", formattedWhatsApp);
      
      if (!formattedWhatsApp || formattedWhatsApp.length < 8) {
        console.error("WhatsApp number validation failed:", {
          original: whatsappNumber,
          formatted: formattedWhatsApp,
          length: formattedWhatsApp?.length
        });
        toast({
          title: "Error",
          description: "WhatsApp number is not configured in site settings. Please contact us directly.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Format inquiry type to readable label
      const inquiryLabel = inquiryLabels[data.inquiry] || data.inquiry;

      // Create formatted message
      const message = `*New Enquiry from website*\n\n` +
        `*Name:* ${data.name}\n` +
        `*Email:* ${data.email}\n` +
        `*Phone:* ${data.phone}\n` +
        `*Inquiry Type:* ${inquiryLabel}\n\n` +
        `*Message:*\n${data.message}`;

      // URL encode the message
      const encodedMessage = encodeURIComponent(message);

      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${formattedWhatsApp}?text=${encodedMessage}`;

      // Open WhatsApp in a new window/tab
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // Show success message
      toast({
        title: "Opening WhatsApp...",
        description: "Please send the message to complete your submission.",
      });

      // Reset form after a short delay
      setTimeout(() => {
        form.reset();
        setIsSubmitting(false);
      }, 500);
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
      toast({
        title: "Error",
        description: "Failed to open WhatsApp. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      className="bg-background/50 border-silver/30"
                      data-testid="input-contact-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="bg-background/50 border-silver/30"
                      data-testid="input-contact-email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+1 234 567 890"
                      className="bg-background/50 border-silver/30"
                      data-testid="input-contact-phone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inquiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inquiry Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className="bg-background/50 border-silver/30"
                        data-testid="select-inquiry-type"
                      >
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="buy">Buying a Vehicle</SelectItem>
                      <SelectItem value="sell">Selling a Vehicle</SelectItem>
                      <SelectItem value="preorder">Pre-Order Inquiry</SelectItem>
                      <SelectItem value="trade">Trade-In</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your requirements..."
                    className="bg-background/50 border-silver/30 min-h-[120px]"
                    data-testid="input-contact-message"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-silver-light text-background font-medium gap-2"
            disabled={isSubmitting}
            data-testid="button-submit-contact"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
