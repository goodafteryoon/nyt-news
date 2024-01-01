import axios from 'axios';

import { FilterQuery } from 'models/searchArticle';
import { Article, GetSearchArticlesResponse } from 'models/article';
import { generateFilterQuery } from 'utils/generateFilterQuery';

const URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const apiKey = '5yJhFdAM47piynGqkIdD6sh5Sciyw5TY';

export const fetchFilteredArticles = async ({
  countries,
  pubDate,
  headline,
  page = 0,
}: FilterQuery & { page?: number }): Promise<Article[]> => {
  try {
    const fq = generateFilterQuery({ countries, pubDate, headline });

    const response = await axios.get<GetSearchArticlesResponse>(URL, {
      params: {
        'api-key': apiKey,
        fq,
        page,
      },
    });

    if (response.status === 200) {
      return response.data.response.docs;
    }
    throw new Error('Failed to fetch articles');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error: ', error.response?.data);
    } else {
      console.error('Unexpected error: ', error);
    }
    throw error;
  }
};
