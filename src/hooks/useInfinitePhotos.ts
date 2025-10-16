// src/hooks/useInfinitePhotos.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import { usePhotosSearchPhotos } from '@/api/generated/photos/photos';
import type { PhotoItemDto, FilterDto } from '@/api';

interface UseInfinitePhotosParams {
  pageSize?: number;
  filter: Omit<FilterDto, 'page' | 'pageSize'>;
  enabled?: boolean;
}

interface UseInfinitePhotosResult {
  photos: PhotoItemDto[];
  totalCount: number;
  hasMore: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: Error | null;
  loadMore: () => void;
  refresh: () => void;
}

export const useInfinitePhotos = ({
  pageSize = 20,
  filter,
  enabled = true,
}: UseInfinitePhotosParams): UseInfinitePhotosResult => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allPhotos, setAllPhotos] = useState<PhotoItemDto[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const isLoadingMore = useRef(false);
  const isInitialLoad = useRef(true);

  const { mutate, isPending } = usePhotosSearchPhotos({
    mutation: {
      onSuccess: (response) => {
        console.log(`Page ${currentPage} loaded:`, response.items?.length || 0, 'photos');

        if (response.items) {
          setAllPhotos((prev) => {
            // Для первой страницы заменяем
            if (currentPage === 1) {
              return response.items || [];
            }

            // Для остальных добавляем, фильтруя дубликаты
            const existingIds = new Set(prev.map((p) => p.id));
            const newItems = (response.items || []).filter((item) => !existingIds.has(item.id));
            return [...prev, ...newItems];
          });

          setTotalCount(response.totalCount || 0);

          // Проверяем есть ли еще данные
          const loadedCount =
            currentPage === 1
              ? response.items?.length || 0
              : allPhotos.length + (response.items?.length || 0);

          setHasMore(loadedCount < (response.totalCount || 0));
          setError(null);
        }

        isLoadingMore.current = false;
        isInitialLoad.current = false;
      },
      onError: (err) => {
        console.error('Error loading photos:', err);
        setError(err as Error);
        isLoadingMore.current = false;
        isInitialLoad.current = false;
        setHasMore(false);
      },
    },
  });

  const loadPage = useCallback(
    (page: number) => {
      if (isLoadingMore.current || !enabled) return;

      isLoadingMore.current = true;
      setCurrentPage(page);

      mutate({
        data: {
          ...filter,
          page,
          pageSize,
        },
      });
    },
    [mutate, filter, pageSize, enabled]
  );

  const loadMore = useCallback(() => {
    if (isPending || !hasMore || isLoadingMore.current || !enabled) {
      return;
    }

    console.log('Loading more photos, next page:', currentPage + 1);
    loadPage(currentPage + 1);
  }, [isPending, hasMore, currentPage, loadPage, enabled]);

  const refresh = useCallback(() => {
    console.log('Refreshing photos...');
    setAllPhotos([]);
    setCurrentPage(1);
    setHasMore(true);
    setError(null);
    isInitialLoad.current = true;
    loadPage(1);
  }, [loadPage]);

  // Загружаем первую страницу при монтировании или изменении фильтра
  useEffect(() => {
    if (enabled) {
      refresh();
    }
  }, [enabled, JSON.stringify(filter)]); // Используем JSON.stringify для deep comparison

  return {
    photos: allPhotos,
    totalCount,
    hasMore,
    isLoading: isPending && isInitialLoad.current,
    isLoadingMore: isPending && !isInitialLoad.current,
    error,
    loadMore,
    refresh,
  };
};
