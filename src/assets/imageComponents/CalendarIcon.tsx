import { ReactComponent as Icon } from 'assets/calendar.svg';

interface IconProps {
  color: string;
}

const CalendarIcon = ({ color }: IconProps) => {
  return <Icon fill={color} />;
};

export default CalendarIcon;
