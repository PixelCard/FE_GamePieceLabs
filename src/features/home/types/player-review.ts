export type PlayerReviewsVariant = "content" | "image";

export interface PlayerReviewContent {
  id: string;
  author: string;
  rating: number;
  paragraphs: readonly string[];
}

export interface PlayerReviewImage {
  id: string;
  author: string;
  rating: number;
  imageSrc: string;
  imageAlt: string;
}
