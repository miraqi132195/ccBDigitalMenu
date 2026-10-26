import { useQuery } from '@tanstack/react-query';
import { fetchMenu } from '../services/menuApi';

export const MENU_QUERY_KEY = ['menu'];

export function useMenu() {
  return useQuery({
    queryKey: MENU_QUERY_KEY,
    queryFn: fetchMenu,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
