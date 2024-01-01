import { Article } from 'models/article';
import { FiltersState } from 'store/articleFilter/type';
import { formatDateForApi } from 'utils/date';

export const filterScrappedArticles = (
  articles: Article[],
  filters: FiltersState
): Article[] => {
  return articles.filter((article: Article) => {
    const matchesSearchTerm = filters.searchTerm
      ? article.headline.main
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase())
      : true;
    const matchesDate = filters.selectedDate
      ? formatDateForApi(new Date(article.pub_date)) ===
        formatDateForApi(filters.selectedDate)
      : true;
    const matchesCountries =
      filters.selectedCountries.length > 0
        ? filters.selectedCountries.some(
            (country) => article.section_name === country.value
          )
        : true;

    return matchesSearchTerm && matchesDate && matchesCountries;
  });
};
