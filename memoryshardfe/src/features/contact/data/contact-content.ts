import type { ContactPageContent } from "@/features/contact/types/contact-content";

export const contactPageContent = {
  hero: {
    title: "Contact Us",
    imageSrc: "/images/contact/contact-hero.png",
    imageAlt:
      "A customer receiving help with board game accessories at a support desk",
  },
  introduction: {
    eyebrow: "Your questions, our priority",
    title: "Contact Us for Support",
    description:
      "Need help with an order, product fit, or your next game-night setup? Send us a note and our support team will point you in the right direction.",
    faqLabel: "Visit our FAQ page",
    faqHref: "/faq",
  },
  details: [
    {
      label: "General support",
      value: "support@memoryshard.example",
      supportingText: "For product, order, and shipping questions.",
      href: "mailto:support@memoryshard.example",
    },
    {
      label: "Order support",
      value: "Include your order number",
      supportingText: "It helps us find your purchase and respond faster.",
    },
    {
      label: "Support hours",
      value: "Monday - Friday, 08:00 - 16:30",
      supportingText: "Messages received outside these hours are handled next business day.",
    },
  ],
  form: {
    namePlaceholder: "Name",
    emailPlaceholder: "E-mail",
    subjectPlaceholder: "Subject",
    messagePlaceholder: "Message",
    submitLabel: "Send message",
  },
  benefits: [
    {
      title: "Designed for game night",
      description: "Thoughtful accessories made for smoother, more memorable play.",
      icon: "map-pin",
    },
    {
      title: "International shipping",
      description: "Flexible delivery options for tabletop fans around the world.",
      icon: "globe",
    },
    {
      title: "Collector-first support",
      description: "Clear answers before and after every MemoryShard purchase.",
      icon: "messages",
    },
    {
      title: "Secure payment",
      description: "Payments are handled through protected checkout flows.",
      icon: "credit-card",
    },
  ],
} satisfies ContactPageContent;
