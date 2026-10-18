import { useMutation, useQuery, type QueryKey } from '@tanstack/react-query';

export type Notice = { id: string; text: string; type: 'promo' | 'info' | 'warning'; createdAt: string };
const storageKey = 'tovi_notices';
const queryKey: QueryKey = ['notices'];

function readNotices(): Notice[] {
  try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { return []; }
}
function writeNotices(items: Notice[]) { localStorage.setItem(storageKey, JSON.stringify(items)); }

export function getListNoticesQueryKey() { return queryKey; }
export function useListNotices() {
  return useQuery({ queryKey, queryFn: async () => readNotices() });
}
export function useCreateNotice() {
  return useMutation({
    mutationFn: async ({ data }: { data: { text: string; type: Notice['type'] }; headers?: Record<string, string> }) => {
      const notice: Notice = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
      writeNotices([notice, ...readNotices()]);
      return notice;
    },
  });
}
export function useDeleteNotice() {
  return useMutation({
    mutationFn: async ({ id }: { id: string; headers?: Record<string, string> }) => {
      writeNotices(readNotices().filter((notice) => notice.id !== id));
    },
  });
}
