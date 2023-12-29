import { ReactComponent as Icon } from 'assets/star-fill.svg';

interface IconProps {
  color: string;
}

const FilledStarIcon = ({ color }: IconProps) => {
  return <Icon fill={color} />;
};

export default FilledStarIcon;
