import styled from 'styled-components';

interface BaseButtonProps {
  buttonText: string;
  onClick: () => void;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

const BaseButton = ({
  buttonText,
  onClick,
  type,
  style,
  ariaLabel,
}: BaseButtonProps) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      style={style}
      aria-label={ariaLabel || buttonText}
    >
      {buttonText}
    </Button>
  );
};

export default BaseButton;

const Button = styled.button`
  width: 295px;
  height: 60px;
  border-radius: 16px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.mainBlue};
`;
