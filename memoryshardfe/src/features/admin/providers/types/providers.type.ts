export type ProviderDto = {
  id: string;
  providerName: string;
  providerNote?: string | null;
};

export type CreateUpdateProviderDto = {
  providerName: string;
  providerNote?: string | null;
};

export type ProviderPagedResult = {
  totalCount: number;
  items: ProviderDto[];
};
