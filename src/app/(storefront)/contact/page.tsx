import type { Metadata } from "next";

import { ContactPage } from "@/features/contact/components/contact-page";
import { contactPageContent } from "@/features/contact/data/contact-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact MemoryShard for help with products, orders, shipping, and your next game-night setup.",
};

export default function ContactRoute() {
  return <ContactPage content={contactPageContent} />;
}
