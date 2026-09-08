import type { FooterContent } from "@/features/navigation/types/footer-navigation";

export const footerContent: FooterContent = {
  navigationGroups: [
    {
      title: "Information",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Payment & Shipping", href: "/shipping" },
        { label: "Returns", href: "/returns" },
      ],
    },
    {
      title: "Useful links",
      links: [
        { label: "Distributors", href: "/distributors" },
        { label: "FAQ", href: "/faq" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  certifications: {
    title: "Certifications",
    badges: [
      {
        label: "View DMCA.com protection status",
        href: "https://www.dmca.com/r/1q28p05",
        imageSrc: "/images/footer/dmca-protected.webp",
        imageAlt: "DMCA.com Protection Status",
        width: 121,
        height: 24,
      },
      {
        label: "View Ministry of Industry and Trade registration",
        href: "http://online.gov.vn/nen-tang/6b21bf2e-2bcb-4523-82c2-5acbf9404ec6",
        imageSrc: "/images/footer/bo-cong-thuong.png",
        imageAlt: "Registered with the Ministry of Industry and Trade",
        width: 230,
        height: 86,
      },
    ],
  },
  fanpage: {
    title: "Fanpage",
    embedUrl:
      "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FIn3DPhuKienBoardgame%3Flocale%3Dvi_VN&tabs=&width=340&height=150&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true",
  },
  copyright: "© 2026 Game Piece Labs. All rights reserved.",
};
