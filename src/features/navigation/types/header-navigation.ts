export type HeaderNavigationItem = {
  label: string;
  href: string;
};

export type HeaderPromoCard = {
  title: string;
  description: string;
  href: string;
  tone: "charcoal" | "ocean" | "walnut" | "clay" | "sand" | "forest";
  icon: "inserts" | "hotlist" | "new" | "story" | "materials" | "green";
};
