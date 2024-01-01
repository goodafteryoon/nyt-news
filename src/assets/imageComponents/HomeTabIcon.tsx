import { ReactComponent as Icon } from 'assets/home.svg';

interface IconProps {
  color: string;
}

const HomeTabIcon = ({ color }: IconProps) => {
  return <Icon fill={color} />;
};

export default HomeTabIcon;
