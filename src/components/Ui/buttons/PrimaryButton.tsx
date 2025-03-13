import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button<{ variant?: 'primary' | 'danger'; isLoading?: boolean }>`
  padding: 8px 12px;
  border: none;
  background-color: ${({ variant }) => (variant === 'danger' ? '#dc3545' : '#007bff')};
  color: white;
  cursor: ${({ isLoading }) => (isLoading ? 'not-allowed' : 'pointer')};
  border-radius: 4px;

  &:hover {
    background-color: ${({ variant }) => (variant === 'danger' ? '#b02a37' : '#0056b3')};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

interface ButtonProps {
  onClick: (event: React.MouseEvent) => void
  children: React.ReactNode
  isLoading?: boolean
  variant?: 'primary' | 'danger'
  disabled?: boolean
}

const PrimaryButton: React.FC<ButtonProps> = ({
  onClick,
  children,
  isLoading,
  variant = 'primary',
  disabled
}) => {
  return (
    <StyledButton
      onClick={onClick}
      isLoading={isLoading}
      disabled={isLoading || disabled}
      variant={variant}
    >
      {isLoading ? 'Loading...' : children}
    </StyledButton>
  )
}

export default PrimaryButton
