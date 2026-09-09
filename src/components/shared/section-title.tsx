import type { ReactElement } from "react";

import { CardGridSection } from "@/components/shared/section-title/card-grid-section";
import { CenteredContentSection } from "@/components/shared/section-title/centered-content-section";
import { SplitImageContentSection } from "@/components/shared/section-title/split-image-content-section";
import { TextContentSection } from "@/components/shared/section-title/text-content-section";

import type { SectionTitleProps } from "./section-title/types";

export { SectionTitleGroupProps } from "./section-title/section-title-group";
export type {
  SectionTitleAlign,
  SectionTitleMore,
  SectionTitleMoreProps,
  SectionTitleOrientation,
  SectionTitleProps,
  SectionTitleSplitContentPosition,
  SectionTitleSplitProps,
} from "./section-title/types";

export function SectionTitle(props: SectionTitleProps): ReactElement {
  switch (props.content) {
    case "split":
      return <SplitImageContentSection {...props} />;
    case "text":
      return <TextContentSection {...props} />;
    case "custom":
      return <CenteredContentSection {...props} />;
    case "imageList":
    default:
      return <CardGridSection {...props} />;
  }
}
