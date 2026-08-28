export type FooterNavigationLink = {
  label: string;
  href: string;
};

export type FooterNavigationGroup = {
  title: string;
  links: FooterNavigationLink[];
};

export type FooterSocialLink = FooterNavigationLink & {
  platform: "facebook" | "instagram" | "youtube";
};

export type FooterPreferenceOption = {
  value: string;
  label: string;
  prefix?: string;
};

export type FooterContent = {
  brand: {
    name: string;
    description: string;
  };
  navigationGroups: FooterNavigationGroup[];
  socialLinks: FooterSocialLink[];
  currencyOptions: FooterPreferenceOption[];
  languageOptions: FooterPreferenceOption[];
  defaultCurrency: string;
  defaultLanguage: string;
  paymentMethods: string[];
  copyright: string;
};
