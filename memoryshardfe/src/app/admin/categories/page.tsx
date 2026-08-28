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
  deleteCategoryAsync,
  getCategoriesAsync,
} from "@/features/admin/categories/services/categories-api";
import type { CategoryDto } from "@/features/admin/categories/types/categories.type";

function mapCategory(category: CategoryDto): CrudEntityItem {
  return {
    id: category.id,
    name: category.categoryName,
    note: category.categoryNote,
  };
}

export default function CategoriesPage() {
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

  const loadCategories = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getCategoriesAsync(0, 100);
      setItems(result.items.map(mapCategory));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Cannot load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadCategories();
  }, []);

  const handleDelete = async (item: CrudEntityItem) => {
    const confirmed = window.confirm(
      `Delete category "${item.name}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    setDeletingId(item.id);
    setError("");

    try {
      await deleteCategoryAsync(item.id);
      setItems((current) => current.filter((entry) => entry.id !== item.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete category failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="w-full space-y-6 pb-8">
      <EntityCrudHero
        theme="categories"
        eyebrow="Classification"
        title="Category Management"
        description="Manage product categories with the same routed CRUD flow as products."
        createHref="/admin/categories/create"
        createLabel="Add Category"
        icon="CT"
      />

      <EntityCrudStats
        theme="categories"
        items={items}
        filteredItems={filteredItems}
        loading={loading}
        entityLabel="Categories"
        icon="ID"
      />

      <EntityCrudListPanel
        theme="categories"
        title="Category List"
        description="Browse, search and maintain product classification records."
        search={search}
        onSearchChange={setSearch}
        onRefresh={() => void loadCategories()}
        createHref="/admin/categories/create"
        createLabel="Create Category"
        searchPlaceholder="Search category name, note or id..."
        error={error}
      >
        <EntityCrudTable
          theme="categories"
          items={filteredItems}
          loading={loading}
          deletingId={deletingId}
          routeBase="/admin/categories"
          entityLabel="Category"
          emptyDescription="Create a category or adjust the current search keyword."
          onDelete={(item) => void handleDelete(item)}
        />
      </EntityCrudListPanel>
    </main>
  );
}
