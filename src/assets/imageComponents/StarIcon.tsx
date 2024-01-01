import { ReactComponent as Icon } from 'assets/star.svg';

interface IconProps {
  color: string;
}

const StarIcon = ({ color }: IconProps) => {
  return <Icon fill={color} />;
};

export default StarIcon;
