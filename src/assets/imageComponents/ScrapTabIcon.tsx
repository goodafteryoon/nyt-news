import { ReactComponent as Icon } from 'assets/sheet.svg';

interface IconProps {
  color: string;
}

const ScrapTabIcon = ({ color }: IconProps) => {
  return <Icon stroke={color} />;
};

export default ScrapTabIcon;
