export type CompanyLinkId =
    | 'about'
    | 'materials'
    | 'sustainability'
    | 'contact';

export interface CompanyLink {
    title: string;
    imageSrc: string;
    imageAlt: string;
    href: string;
    imagePosition?: string;
}
