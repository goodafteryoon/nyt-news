import { ReactComponent as Icon } from 'assets/search.svg';

interface IconProps {
  color: string;
}

const SearchIcon = ({ color }: IconProps) => {
  return <Icon fill={color} />;
};

export default SearchIcon;
