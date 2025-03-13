import React from 'react'
import styled from 'styled-components'
//UTILS
import { generatePageNumbers } from '../../utils/generateRandomNumbers'

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 5px;
`

const PaginationButton = styled.button`
  padding: 8px 12px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const PageNumber = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  border: none;
  background-color: ${(props) => (props.active ? '#0056b3' : '#e0e0e0')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: ${(props) => (props.active ? '#004494' : '#d0d0d0')};
  }
`

interface PaginationProps {
  totalPages: number
  pageIndex: number
  setPageIndex: (index: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, pageIndex, setPageIndex }) => {
  return (
    <PaginationContainer>
      <PaginationButton onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 0}>
        Previous
      </PaginationButton>
      {generatePageNumbers({ totalPages, pageIndex }).map((page, index) =>
        typeof page === 'number' ? (
          <PageNumber key={index} active={page === pageIndex} onClick={() => setPageIndex(page)}>
            {page + 1}
          </PageNumber>
        ) : (
          <span key={index} style={{ padding: '8px' }}>
            ...
          </span>
        )
      )}
      <PaginationButton
        onClick={() => setPageIndex(pageIndex + 1)}
        disabled={pageIndex + 1 >= totalPages}
      >
        Next
      </PaginationButton>
    </PaginationContainer>
  )
}

export default Pagination
