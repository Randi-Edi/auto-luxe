import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

// todo: remove mock functionality
const faqs: FAQItem[] = [
  {
    question: "How does the vehicle buying process work?",
    answer:
      "Our buying process is simple and transparent. Browse our inventory online, schedule a viewing, and our team will guide you through financing options and paperwork. We handle everything from inspection to delivery.",
  },
  {
    question: "Do you offer financing options?",
    answer:
      "Yes, we partner with leading financial institutions to offer competitive financing rates. Our finance team will work with you to find the best terms based on your situation.",
  },
  {
    question: "Can I trade in my current vehicle?",
    answer:
      "Absolutely! We accept trade-ins of all makes and models. Bring your vehicle for a free evaluation, and we'll provide a competitive offer that can be applied to your new purchase.",
  },
  {
    question: "What warranty do you offer?",
    answer:
      "All our vehicles come with a comprehensive warranty. New vehicles include manufacturer warranty, while pre-owned vehicles come with our exclusive Ganegoda International warranty covering major components.",
  },
  {
    question: "How can I pre-order an upcoming vehicle?",
    answer:
      "Visit our Pre-Orders page to see upcoming vehicles. Select your desired model, pay a refundable deposit, and we'll keep you updated on availability and delivery timeline.",
  },
  {
    question: "Do you ship vehicles internationally?",
    answer:
      "Yes, we offer worldwide shipping. Our logistics team handles all documentation, customs clearance, and delivery to your location. Contact us for a shipping quote.",
  },
  {
    question: "What documents do I need to purchase a vehicle?",
    answer:
      "You'll need a valid ID, proof of residence, and proof of income for financing. For cash purchases, only valid ID and proof of residence are required.",
  },
  {
    question: "Can I return a vehicle after purchase?",
    answer:
      "We offer a 7-day satisfaction guarantee. If you're not completely satisfied, return the vehicle in its original condition for a full refund, subject to our terms and conditions.",
  },
];

interface FAQAccordionProps {
  items?: FAQItem[];
}

export default function FAQAccordion({ items = faqs }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {items.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border border-silver/20 rounded-md bg-card/30 backdrop-blur-sm px-4 data-[state=open]:bg-card/50"
          data-testid={`accordion-item-${index}`}
        >
          <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-4">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
