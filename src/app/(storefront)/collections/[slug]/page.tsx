import { notFound } from "next/navigation";

import { BoardGameInserts } from "@/features/collections/board-game-inserts/components/BoardGameInserts";
import { getBoardGameInsertsAsync } from "@/features/collections/board-game-inserts/services/board-game-inserts-api";

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
    default:
      notFound();
  }
}
