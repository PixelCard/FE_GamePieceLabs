import type { ReactNode } from "react";

export type SectionTitleAlign = "left" | "center" | "right";
export type SectionTitleOrientation = "vertical" | "horizon";
export type SectionTitleSplitContentPosition = "left" | "right";

export interface SectionTitleMore {
  label?: string;
  href?: string;
}

export interface SectionTitleMoreProps {
  title: string;
  more?: SectionTitleMore;
  align?: SectionTitleAlign;
  orientation?: SectionTitleOrientation;
  children: ReactNode;
  className?: string;
  content?: "text" | "imageList";
}

export interface SectionTitleHorizonSplitProps {
  title?: never;
  more?: never;
  align?: never;
  orientation?: "horizon";
  children: ReactNode;
  className?: string;
  content: "split";
  contentPosition?: SectionTitleSplitContentPosition;
  image: {
    src: string;
    alt: string;
    aspectRatio?: string;
  };
}

export interface SectionTitleVerticalSplitProps {
  title: string;
  more?: SectionTitleMore;
  align?: SectionTitleAlign;
  orientation: "vertical";
  children: ReactNode;
  className?: string;
  content: "split";
  contentPosition?: never;
  image?: never;
}

export type SectionTitleSplitProps =
  | SectionTitleHorizonSplitProps
  | SectionTitleVerticalSplitProps;

export type SectionTitleProps =
  | SectionTitleMoreProps
  | SectionTitleSplitProps;
