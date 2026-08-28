import type {
    CompanyLink,
    CompanyLinkId,
} from '@/features/home/types/company-link';

export const companyLinks = {
    about: {
        title: 'About us',
        imageSrc: '/images/company-links/about-us.webp',
        imageAlt: 'A craftsperson sanding a pale wooden game board',
        href: '/about',
        imagePosition: 'center',
    },
    materials: {
        title: 'Materials',
        imageSrc: '/images/company-links/materials.webp',
        imageAlt: 'The layered edge and natural grain of a birch plywood sheet',
        href: '/about',
        imagePosition: 'center',
    },
    sustainability: {
        title: 'We are green',
        imageSrc: '/images/company-links/we-are-green.webp',
        imageAlt: 'A recycling symbol formed by clearings in a green forest',
        href: '/about',
        imagePosition: 'center',
    },
    contact: {
        title: 'Contact us',
        imageSrc: '/images/company-links/contact-us.webp',
        imageAlt: 'A customer using a smartphone to contact support',
        href: '/contact',
        imagePosition: 'center',
    },
} as const satisfies Record<CompanyLinkId, CompanyLink>;
