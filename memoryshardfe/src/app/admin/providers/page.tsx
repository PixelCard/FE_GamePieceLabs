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
  deleteProviderAsync,
  getProvidersAsync,
} from "@/features/admin/providers/services/providers-api";
import type { ProviderDto } from "@/features/admin/providers/types/providers.type";

function mapProvider(provider: ProviderDto): CrudEntityItem {
  return {
    id: provider.id,
    name: provider.providerName,
    note: provider.providerNote,
  };
}

export default function ProvidersPage() {
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

  const loadProviders = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getProvidersAsync(0, 100);
      setItems(result.items.map(mapProvider));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Cannot load providers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadProviders();
  }, []);

  const handleDelete = async (item: CrudEntityItem) => {
    const confirmed = window.confirm(
      `Delete provider "${item.name}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    setDeletingId(item.id);
    setError("");

    try {
      await deleteProviderAsync(item.id);
      setItems((current) => current.filter((entry) => entry.id !== item.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete provider failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="w-full space-y-6 pb-8">
      <EntityCrudHero
        theme="providers"
        eyebrow="Goods Partner"
        title="Provider Management"
        description="Manage supplier and brand provider records with routed CRUD pages."
        createHref="/admin/providers/create"
        createLabel="Add Provider"
        icon="PV"
      />

      <EntityCrudStats
        theme="providers"
        items={items}
        filteredItems={filteredItems}
        loading={loading}
        entityLabel="Providers"
        icon="TR"
      />

      <EntityCrudListPanel
        theme="providers"
        title="Provider List"
        description="Browse, search and maintain provider records used by products."
        search={search}
        onSearchChange={setSearch}
        onRefresh={() => void loadProviders()}
        createHref="/admin/providers/create"
        createLabel="Create Provider"
        searchPlaceholder="Search provider name, note or id..."
        error={error}
      >
        <EntityCrudTable
          theme="providers"
          items={filteredItems}
          loading={loading}
          deletingId={deletingId}
          routeBase="/admin/providers"
          entityLabel="Provider"
          emptyDescription="Create a provider or adjust the current search keyword."
          onDelete={(item) => void handleDelete(item)}
        />
      </EntityCrudListPanel>
    </main>
  );
}
