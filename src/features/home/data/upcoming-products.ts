import type { CardImageTitleProps } from '@/components/shared/card-image-title';

export type UpcomingProduct = CardImageTitleProps & {
    id: string;
};

export const upcomingProducts = [
    {
        id: 'seti-space-agencies-organizer',
        imageSrc:
            'https://laserox.net/cdn/shop/files/seti.webp?v=1762162796',
        imageAlt: 'SETI Space Agencies board game cover art',
        href: '/products?game=seti-space-agencies',
    },
    {
        id: 'nemesis-retaliation-expansion-organizer',
        imageSrc:
            'https://laserox.net/cdn/shop/files/Nemesis.webp?v=1762162795',
        imageAlt: 'Nemesis Retaliation board game cover art',
        href: '/products?game=nemesis-retaliation',
    },
    {
        id: 'twilight-imperium-thunders-edge-crate',
        imageSrc:
            'https://laserox.net/cdn/shop/files/TI4_kieg.webp?v=1762162849',
        imageAlt: "Twilight Imperium Thunder's Edge expansion cover art",
        href: '/products?game=twilight-imperium-thunders-edge',
    },
    {
        id: 'stalker-organizer',
        imageSrc:
            'https://laserox.net/cdn/shop/files/s.t.a.l.k.e.r..png?v=1740643747',
        imageAlt: 'S.T.A.L.K.E.R. The Board Game cover art',
        href: '/products?game=stalker-the-board-game',
    },
    {
        id: 'clans-of-caledonia-industria-organizer',
        imageSrc:
            'https://laserox.net/cdn/shop/files/clans.webp?v=1762162891',
        imageAlt: 'Clans of Caledonia and Industria board game cover art',
        href: '/products?game=clans-of-caledonia-industria',
    },
] as const satisfies readonly UpcomingProduct[];
