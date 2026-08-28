import type {
  CreateUpdateProviderDto,
  ProviderDto,
  ProviderPagedResult,
} from "@/features/admin/providers/types/providers.type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://localhost:44329";

async function parseError(response: Response): Promise<string> {
  const body = await response.text();
  return body ? `${response.status} - ${body}` : `${response.status}`;
}

export async function getProvidersAsync(skipCount = 0, maxResultCount = 50): Promise<ProviderPagedResult> {
  const params = new URLSearchParams({ skipCount: String(skipCount), maxResultCount: String(maxResultCount) });
  const response = await fetch(`${API_BASE_URL}/api/app/provider?${params.toString()}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Failed to load providers: ${await parseError(response)}`);
  return (await response.json()) as ProviderPagedResult;
}

export async function getProviderByIdAsync(id: string): Promise<ProviderDto> {
  const response = await fetch(`${API_BASE_URL}/api/app/provider/${id}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Failed to load provider: ${await parseError(response)}`);
  return (await response.json()) as ProviderDto;
}

export async function createProviderAsync(input: CreateUpdateProviderDto): Promise<ProviderDto> {
  const response = await fetch(`${API_BASE_URL}/api/app/provider`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error(`Create provider failed: ${await parseError(response)}`);
  return (await response.json()) as ProviderDto;
}

export async function updateProviderAsync(id: string, input: CreateUpdateProviderDto): Promise<ProviderDto> {
  const response = await fetch(`${API_BASE_URL}/api/app/provider/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error(`Update provider failed: ${await parseError(response)}`);
  return (await response.json()) as ProviderDto;
}

export async function deleteProviderAsync(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/app/provider/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error(`Delete provider failed: ${await parseError(response)}`);
}
