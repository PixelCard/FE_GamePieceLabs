import type {
  PlayerReviewContent,
  PlayerReviewImage,
} from "@/features/home/types/player-review";

export const playerReviewContentList = [
  {
    id: "review-content-1",
    author: "Maximilian",
    rating: 5,
    paragraphs: [
      "I was particularly impressed with the care and attention to detail Laserox show and this is evident in the design of the product, but also the individual message of thanks included and their rapid and informative response to questions. It is very clear that they sincerely care about customer satisfaction and are intending on making a quality product. I wholeheartedly support this mindset.",
      "The assembly was mostly intuitive and presented no real problems and once complete fits perfectly and looks great. Should I ever need similar organisers for other games in future, I will most definitely be looking at Laserox first.",
    ],
  },
  {
    id: "review-content-2",
    author: "Andrew",
    rating: 5,
    paragraphs: [
      "Absolutely beautiful. Great design and solid workmanship. Makes setting up and breaking down the game a breeze.",
    ],
  },
  {
    id: "review-content-3",
    author: "Christopher",
    rating: 5,
    paragraphs: [
      "It is my first laserox insert, but this one is gorgeous. The small details with thematic engravings look very nice. It does take some time to put all things together, but that is part of the fun. Really like it.",
    ],
  },
  {
    id: "review-content-4",
    author: "Sarah L.",
    rating: 5,
    paragraphs: [
      "Outstanding precision and quality! All miniature compartments and token trays fit smoothly into the original game box. Premium finish throughout.",
    ],
  },
  {
    id: "review-content-5",
    author: "David M.",
    rating: 5,
    paragraphs: [
      "Top notch materials and exceptionally thoughtful packaging. Everything arrived promptly and in pristine condition. Highly recommended for collectors!",
    ],
  },
] as const satisfies readonly PlayerReviewContent[];

export const playerReviewImageList = [
  {
    id: "review-image-1",
    author: "Maximilian",
    rating: 5,
    imageSrc: "/images/games/7-wonders.jpg",
    imageAlt: "Board game components organized for play",
  },
  {
    id: "review-image-2",
    author: "Andrew",
    rating: 5,
    imageSrc: "/images/games/aeons-end.jpg",
    imageAlt: "Aeon's End board game setup shared by a player",
  },
  {
    id: "review-image-3",
    author: "Christopher",
    rating: 5,
    imageSrc: "/images/games/ankh-gods-of-egypt.jpg",
    imageAlt: "Ankh: Gods of Egypt board game setup shared by a player",
  },
  {
    id: "review-image-4",
    author: "Sarah L.",
    rating: 5,
    imageSrc: "/images/games/arkham-horror.jpg",
    imageAlt: "Arkham Horror board game setup shared by a player",
  },
  {
    id: "review-image-5",
    author: "David M.",
    rating: 5,
    imageSrc: "/images/games/bloodborne-the-board-game.jpg",
    imageAlt: "Bloodborne board game setup shared by a player",
  },
] as const satisfies readonly PlayerReviewImage[];
