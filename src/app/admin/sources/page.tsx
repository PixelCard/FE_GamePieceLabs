"use client";

import { useEffect, useMemo, useState } from "react";

import {
  EntityCrudHero,
  EntityCrudListPanel,
  EntityCrudStats,
  EntityCrudTable,
  type CrudEntityItem,
} from "@/features/admin/components/EntityCrudUi";
import {
  deleteSourceAsync,
  getSourcesAsync,
} from "@/features/admin/sources/services/sources-api";
import type { ProductSouceDto } from "@/features/admin/sources/types/sources.type";

function mapSource(source: ProductSouceDto): CrudEntityItem {
  return {
    id: source.id,
    name: source.souceName,
    note: source.souceNote,
  };
}

export default function SourcesPage() {
  const [items, setItems] = useState<CrudEntityItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return items;

    return items.filter((item) =>
      [item.name, item.note, item.id].some((value) =>
        value?.toLowerCase().includes(keyword),
      ),
    );
  }, [items, search]);

  const loadSources = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getSourcesAsync(0, 100);
      setItems(result.items.map(mapSource));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Cannot load sources");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadSources();
  }, []);

  const handleDelete = async (item: CrudEntityItem) => {
    const confirmed = window.confirm(
      `Delete source "${item.name}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    setDeletingId(item.id);
    setError("");

    try {
      await deleteSourceAsync(item.id);
      setItems((current) => current.filter((entry) => entry.id !== item.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete source failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="w-full space-y-6 pb-8">
      <EntityCrudHero
        theme="sources"
        eyebrow="Goods Source"
        title="Source Management"
        description="Manage sourcing records with the same routed CRUD pattern as products."
        createHref="/admin/sources/create"
        createLabel="Add Source"
        icon="SC"
      />

      <EntityCrudStats
        theme="sources"
        items={items}
        filteredItems={filteredItems}
        loading={loading}
        entityLabel="Sources"
        icon="DB"
      />

      <EntityCrudListPanel
        theme="sources"
        title="Source List"
        description="Browse, search and maintain product source records."
        search={search}
        onSearchChange={setSearch}
        onRefresh={() => void loadSources()}
        createHref="/admin/sources/create"
        createLabel="Create Source"
        searchPlaceholder="Search source name, note or id..."
        error={error}
      >
        <EntityCrudTable
          theme="sources"
          items={filteredItems}
          loading={loading}
          deletingId={deletingId}
          routeBase="/admin/sources"
          entityLabel="Source"
          emptyDescription="Create a source or adjust the current search keyword."
          onDelete={(item) => void handleDelete(item)}
        />
      </EntityCrudListPanel>
    </main>
  );
}
