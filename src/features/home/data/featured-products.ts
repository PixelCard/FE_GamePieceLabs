import type { ProductCardProps } from '@/components/shared/product-card';

export type FeaturedProduct = ProductCardProps & {
    id: string;
};

export const featuredProducts = [
    {
        id: 'gloomhaven-buttons-bugs-organizer',
        name: 'Gloomhaven Buttons & Bugs Organizer',
        imageSrc:
            'https://laserox.net/cdn/shop/files/LGBB-5.jpg?v=1727173076&width=1200',
        imageAlt: 'Wooden organizer for Gloomhaven Buttons and Bugs',
        price: 10.5,
        rating: 4.9,
    },
    {
        id: 'spirit-organizer',
        name: 'Spirit Organizer',
        imageSrc:
            'https://laserox.net/cdn/shop/files/LSID_comp.jpg?v=1717751144&width=1200',
        imageAlt: 'Wooden organizer trays for Spirit Island',
        price: 38.5,
        rating: 4.5,
    },
    {
        id: 'seti-organizer',
        name: 'SETI Organizer',
        imageSrc:
            'https://laserox.net/cdn/shop/files/LSET-hero-2.png?v=1733236650&width=1200',
        imageAlt: 'Wooden organizer filled with SETI board game components',
        price: 51.5,
        rating: 4.7,
    },
    {
        id: 'spirit-island-expansion-organizer-v2',
        name: 'Spirit Island Expansion Organizer V2',
        imageSrc:
            'https://laserox.net/cdn/shop/files/LSIDE3-4.jpg?v=1738682122&width=1200',
        imageAlt: 'Spirit Island expansion organizer with cards and tokens',
        price: 37.5,
        rating: 2,
    },
    {
        id: 'wyrmspan-organizer',
        name: 'Wyrmspan Organizer',
        imageSrc:
            'https://laserox.net/cdn/shop/files/LWYM-hero-1_90b7e93a-cebd-44d8-84c5-1c1efe0d741d.jpg?v=1718819267&width=1200',
        imageAlt: 'Wooden organizer for Wyrmspan cards and components',
        price: 40.5,
        rating: 5,
    },
    {
        id: 'quacks-organizer',
        name: 'Quacks Organizer',
        imageSrc:
            'https://laserox.net/cdn/shop/files/LQOQ-24.jpg?v=1718818978&width=1200',
        imageAlt: 'Wooden organizer for The Quacks of Quedlinburg',
        price: 46.5,
        rating: 4.9,
    },
] as const satisfies readonly FeaturedProduct[];
