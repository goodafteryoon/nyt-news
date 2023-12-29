import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const formatDate = (dateString: string) => {
  return dayjs(dateString).format('YYYY.MM.DD. (ddd)');
};

export const formatDateForDisplayHeader = (date: Date | null) => {
  return dayjs(date).format('YYYY.MM.DD');
};

export const formatDateForDisplayInput = (date: Date | null) => {
  return dayjs(date).format('YYYY년 MM월 DD일');
};
