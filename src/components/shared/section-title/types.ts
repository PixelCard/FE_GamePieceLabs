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
  topContent?: ReactNode;
  bottomContent?: ReactNode;
  children: ReactNode;
  className?: string;
  content?: "text" | "imageList" | "custom";
}

export interface SectionTitleSplitProps {
  title?: never;
  more?: never;
  align?: never;
  orientation?: never;
  topContent?: never;
  bottomContent?: never;
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

export type SectionTitleProps =
  | SectionTitleMoreProps
  | SectionTitleSplitProps;
