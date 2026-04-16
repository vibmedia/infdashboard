/**
 * Kobi API Client — Centralized service for all backend calls.
 * Replace mock data in pages by importing from here.
 */

const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `API error ${res.status}`);
  }
  return res.json();
}

// ── Influencers ────────────────────────────────────────────

export const influencersApi = {
  list: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return request<any>(`/influencers/${qs}`);
  },
  get: (id: string) => request<any>(`/influencers/${id}`),
  update: (id: string, data: any) =>
    request<any>(`/influencers/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
};

// ── Brands ─────────────────────────────────────────────────

export const brandsApi = {
  list: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return request<any>(`/brands/${qs}`);
  },
  get: (id: string) => request<any>(`/brands/${id}`),
  create: (data: any) =>
    request<any>('/brands/', { method: 'POST', body: JSON.stringify(data) }),
};

// ── Jobs ───────────────────────────────────────────────────

export const jobsApi = {
  list: () => request<any>('/jobs/'),
  create: (data: any) =>
    request<any>('/jobs/', { method: 'POST', body: JSON.stringify(data) }),
};

// ── Campaigns ──────────────────────────────────────────────

export const campaignsApi = {
  list: () => request<any>('/campaigns/'),
  create: (data: any) =>
    request<any>('/campaigns/', { method: 'POST', body: JSON.stringify(data) }),
};

// ── IG Accounts ────────────────────────────────────────────

export const igAccountsApi = {
  list: () => request<any>('/ig-accounts/'),
  create: (data: any) =>
    request<any>('/ig-accounts/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    request<any>(`/ig-accounts/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  login: (id: string, password: string) =>
    request<any>(`/ig-accounts/${id}/login`, { method: 'POST', body: JSON.stringify({ password }) }),
  healthCheck: (id: string) =>
    request<any>(`/ig-accounts/${id}/health-check`, { method: 'POST' }),
  activity: (id: string) => request<any>(`/ig-accounts/${id}/activity`),
  advanceWarmup: (id: string) =>
    request<any>(`/ig-accounts/${id}/advance-warmup`, { method: 'POST' }),
};

// ── Proxies ────────────────────────────────────────────────

export const proxiesApi = {
  list: () => request<any>('/proxies/'),
  create: (data: any) =>
    request<any>('/proxies/', { method: 'POST', body: JSON.stringify(data) }),
  healthCheck: (id: string) =>
    request<any>(`/proxies/${id}/health-check`, { method: 'POST' }),
  delete: (id: string) =>
    request<any>(`/proxies/${id}`, { method: 'DELETE' }),
};

// ── WhatsApp ───────────────────────────────────────────────

export const whatsappApi = {
  templates: () => request<any>('/whatsapp/templates'),
  fillTemplate: (data: any) =>
    request<any>('/whatsapp/fill-template', { method: 'POST', body: JSON.stringify(data) }),
  logMessage: (data: any) =>
    request<any>('/whatsapp/log-message', { method: 'POST', body: JSON.stringify(data) }),
  logReply: (data: any) =>
    request<any>('/whatsapp/log-reply', { method: 'POST', body: JSON.stringify(data) }),
  conversation: (brandId: string) => request<any>(`/whatsapp/conversations/${brandId}`),
};

// ── Import ─────────────────────────────────────────────────

export const importApi = {
  influencers: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return fetch(`${API_BASE}/import/influencers`, { method: 'POST', body: form }).then(r => r.json());
  },
  brands: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return fetch(`${API_BASE}/import/brands`, { method: 'POST', body: form }).then(r => r.json());
  },
};

// ── Settings ───────────────────────────────────────────────

export const settingsApi = {
  getAll: () => request<any>('/settings/'),
  get: (key: string) => request<any>(`/settings/${key}`),
  update: (key: string, value: any) =>
    request<any>(`/settings/${key}`, { method: 'PATCH', body: JSON.stringify({ config_value: value }) }),
  addIndustry: (data: any) =>
    request<any>('/settings/industries/add', { method: 'POST', body: JSON.stringify(data) }),
  addRegion: (data: any) =>
    request<any>('/settings/regions/add', { method: 'POST', body: JSON.stringify(data) }),
};

// ── Reports ────────────────────────────────────────────────

export const reportsApi = {
  dailySummary: () => request<any>('/reports/daily-summary'),
};

// ── Agents ─────────────────────────────────────────────────

export const agentsApi = {
  enrich: (handle: string) =>
    request<any>('/agents/enrich', { method: 'POST', body: JSON.stringify({ instagram_handle: handle }) }),
  classify: (text: string) =>
    request<any>('/agents/classify', { method: 'POST', body: JSON.stringify({ reply_text: text }) }),
  onboard: (influencerId: string, reply: string) =>
    request<any>('/agents/onboard/next-message', {
      method: 'POST',
      body: JSON.stringify({ influencer_id: influencerId, latest_reply: reply }),
    }),
  outreach: (influencerId: string, accountId: string, step: number) =>
    request<any>('/agents/outreach/send', {
      method: 'POST',
      body: JSON.stringify({ influencer_id: influencerId, ig_account_id: accountId, drip_step: step }),
    }),
  logs: (limit = 50) => request<any>(`/agents/logs?limit=${limit}`),
};

// ── Health ─────────────────────────────────────────────────

export const healthApi = {
  check: () => request<any>('/health'),
};
