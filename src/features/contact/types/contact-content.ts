export type ContactDetail = {
  label: string;
  value: string;
  supportingText?: string;
  href?: string;
};

export type ContactBenefitIcon =
  | "map-pin"
  | "globe"
  | "messages"
  | "credit-card";

export type ContactBenefit = {
  title: string;
  description: string;
  icon: ContactBenefitIcon;
};

export type ContactPageContent = {
  hero: {
    title: string;
    imageSrc: string;
    imageAlt: string;
  };
  introduction: {
    eyebrow: string;
    title: string;
    description: string;
    faqLabel: string;
    faqHref: string;
  };
  details: ContactDetail[];
  form: {
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    submitLabel: string;
  };
  benefits: ContactBenefit[];
};
