import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const formatDate = (dateString: string) => {
  return dayjs(dateString).format('YYYY.MM.DD. (ddd)');
};
