import React from 'react'
import styled from 'styled-components'

const DeleteButtonStyled = styled.button<{ isLoading?: boolean }>`
  padding: 6px 10px;
  border: none;
  background-color: ${({ isLoading }) => (isLoading ? '#999' : '#dc3545')};
  color: white;
  cursor: ${({ isLoading }) => (isLoading ? 'not-allowed' : 'pointer')};
  border-radius: 4px;
  margin-left: 10px;

  &:hover {
    background-color: ${({ isLoading }) => (isLoading ? '#999' : '#b02a37')};
  }
`

interface DeleteButtonProps {
  onClick: (e: React.MouseEvent) => void
  isLoading: boolean
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, isLoading }) => {
  return (
    <DeleteButtonStyled onClick={onClick} isLoading={isLoading} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Delete'}
    </DeleteButtonStyled>
  )
}

export default DeleteButton
