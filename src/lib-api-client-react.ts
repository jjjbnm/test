import { useMutation, useQuery, type QueryKey } from '@tanstack/react-query';

export type Notice = { id: string; text: string; type: 'promo' | 'info' | 'warning'; createdAt: string };
const queryKey: QueryKey = ['notices'];

export function getListNoticesQueryKey() { return queryKey; }
export function useListNotices() {
  return useQuery({ queryKey, queryFn: async (): Promise<Notice[]> => {
    const response = await fetch('/api/notices');
    if (!response.ok) throw new Error('Failed to load notices');
    return response.json();
  } });
}
export function useCreateNotice() {
  return useMutation({
    mutationFn: async ({ data, headers }: { data: { text: string; type: Notice['type'] }; headers?: Record<string, string> }) => {
      const response = await fetch('/api/notices', { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error('Failed to create notice');
      return response.json() as Promise<Notice>;
    },
  });
}
export function useDeleteNotice() {
  return useMutation({
    mutationFn: async ({ id, headers }: { id: string; headers?: Record<string, string> }) => {
      const response = await fetch(`/api/notices?id=${encodeURIComponent(id)}`, { method: 'DELETE', headers });
      if (!response.ok) throw new Error('Failed to delete notice');
    },
  });
}
