import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Article } from 'models/article';

const SCRAP_ARTICLES_KEY = 'scrapArticles';

interface ScrapContextType {
  scrapArticles: Article[];
  setScrapArticles: (articles: Article[]) => void;
}

const ScrapContext = createContext<ScrapContextType | undefined>(undefined);
const ScrapProvider = ({ children }: { children: ReactNode }) => {
  const [scrapArticles, setScrapArticles] = useState<Article[]>(() => {
    const localData = localStorage.getItem(SCRAP_ARTICLES_KEY);
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem(SCRAP_ARTICLES_KEY, JSON.stringify(scrapArticles));
  }, [scrapArticles]);

  return (
    <ScrapContext.Provider value={{ scrapArticles, setScrapArticles }}>
      {children}
    </ScrapContext.Provider>
  );
};

export default ScrapProvider;

export const useScrapped = () => {
  const context = useContext(ScrapContext);
  if (!context) {
    throw new Error('useScrapped는 ScrappedProvider 안에서 사용해야합니다 💩');
  }
  return context;
};
