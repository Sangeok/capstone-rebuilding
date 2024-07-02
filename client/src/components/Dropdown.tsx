import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

const DropDownContent = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 130px;
  max-height: 450px;
  overflow-y: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 24px;
  border-radius: 40px;
  z-index: 1;
`;

const DropDownContainer = styled.div`
  display: flex;
  position: relative;
  border-width: 2px;
  border-color: rgb(0 0 0);
  border-radius: 0.75rem;
  padding: 30px;
`;

interface DropdownProps {
  trigger: ReactNode;
  content: ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ trigger, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleContainerHover = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <DropDownContainer onMouseEnter={handleContainerHover} onMouseLeave={()=>setIsOpen(false)}>
      <span className="material-icons pr-2">map</span>
      {trigger}
      <DropDownContent isOpen={isOpen} onClick={handleContentClick}>
        {content}
      </DropDownContent>
    </DropDownContainer>
  );
};