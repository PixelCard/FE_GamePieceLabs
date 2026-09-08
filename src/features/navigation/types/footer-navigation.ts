export type FooterNavigationLink = {
  label: string;
  href: string;
};

export type FooterNavigationGroup = {
  title: string;
  links: FooterNavigationLink[];
};

export type FooterCertificationBadge = {
  label: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
};

export type FooterContent = {
  navigationGroups: FooterNavigationGroup[];
  certifications: {
    title: string;
    badges: FooterCertificationBadge[];
  };
  fanpage: {
    title: string;
    embedUrl: string;
  };
  copyright: string;
};
