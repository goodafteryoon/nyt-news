import { FilterQuery } from 'models/searchArticle';

export const generateFilterQuery = ({
  countries,
  pubDate,
  headline,
}: FilterQuery) => {
  const filteredGlocations =
    countries?.length > 0
      ? `glocations.contains:(${countries
          .map((country) => `"${country}"`)
          .join(' OR ')})`
      : '';
  const filteredPubDate = pubDate ? `pub_date:("${pubDate}")` : '';
  const filteredHeadline = headline ? `headline:("${headline}")` : '';

  let fq = [];
  if (filteredGlocations) fq.push(filteredGlocations);
  if (filteredPubDate) fq.push(filteredPubDate);
  if (filteredHeadline) fq.push(filteredHeadline);

  return fq.join(' AND ');
};
