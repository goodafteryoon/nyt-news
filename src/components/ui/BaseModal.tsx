import { ReactNode } from 'react';
import styled from 'styled-components';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BaseModal = ({ isOpen, onClose, children }: BaseModalProps) => {
  if (!isOpen) return null;
  return (
    <>
      <ModalOverlay onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          {children}
        </ModalContainer>
      </ModalOverlay>
    </>
  );
};

export default BaseModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 98;
`;

const ModalContainer = styled.div`
  position: fixed;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 99;
  border-radius: 16px;
`;
