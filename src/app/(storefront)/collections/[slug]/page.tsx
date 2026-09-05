import { notFound } from "next/navigation";

import { BoardGameInserts } from "@/features/collections/board-game-inserts/components/BoardGameInserts";
import { getBoardGameInsertsAsync } from "@/features/collections/board-game-inserts/services/board-game-inserts-api";
import { OXProductFamily } from "@/features/collections/ox-product-family/components/OXProductFamily";
import { getOXProductFamily } from "@/features/collections/ox-product-family/services/ox-product-family-api";
import { getTokens } from "@/features/collections/tokens/services/tokens-api";
import { Tokens } from "@/features/collections/tokens/components/Tokens";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;

  switch (slug) {
    case "board-game-inserts": {
      const boardGameInserts = await getBoardGameInsertsAsync();
      return <BoardGameInserts data={boardGameInserts} />;
    }
    case "ox-product-family": {
      const oxProductFamily = await getOXProductFamily();
      return <OXProductFamily data={oxProductFamily} />;
    }
    case "tokens": {
      const tokens = await getTokens();
      return <Tokens data={tokens} />;
    }
    default:
      notFound();
  }
}
