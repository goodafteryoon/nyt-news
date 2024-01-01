import { useInfiniteQuery } from 'react-query';

import { fetchFilteredArticles } from 'api/SearchArticle';
import { useFilterStore } from 'store/articleFilter';
import { formatDateForApi } from 'utils/date';
import { Article } from 'models/article';
import { FilterQuery } from 'models/searchArticle';

export type FetchArticlesFunction = (
  params: FilterQuery & { page?: number }
) => Promise<Article[]>;

const useArticlesQuery = (
  fetchArticles: FetchArticlesFunction = fetchFilteredArticles
) => {
  const { filters } = useFilterStore();
  const { selectedDate, searchTerm, selectedCountries } = filters;
  const formattedDate = selectedDate ? formatDateForApi(selectedDate) : '';

  const articlesQuery = useInfiniteQuery(
    ['articles', { searchTerm, formattedDate, selectedCountries }],
    ({ pageParam = 0 }) =>
      fetchArticles({
        page: pageParam,
        countries: selectedCountries.map((c) => c.value),
        pubDate: formattedDate,
        headline: searchTerm,
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const currentPage = allPages.length;
        return currentPage;
      },
      retry: 3,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 3,
      keepPreviousData: true,
    }
  );

  return articlesQuery;
};

export default useArticlesQuery;
