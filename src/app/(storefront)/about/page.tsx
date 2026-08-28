import type { Metadata } from "next";
import { AboutPage } from "@/features/about/components/about-page";
import { aboutPageContent } from "@/features/about/data/about-content";

export const metadata: Metadata = {
  title: "Về chúng tôi | MemoryShard",
  description:
    "Tìm hiểu câu chuyện, sứ mệnh và kỹ nghệ chế tác phụ kiện board game bằng gỗ và công nghệ laser chính xác của MemoryShard.",
};

export default function AboutRoute() {
  return <AboutPage content={aboutPageContent} />;
}
