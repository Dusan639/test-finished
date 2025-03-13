export const generatePageNumbers = ({
  totalPages,
  pageIndex
}: {
  totalPages: number
  pageIndex: number
}): (number | string)[] => {
  const pages: (number | string)[] = []

  if (totalPages <= 7) {
    for (let i = 0; i < totalPages; i++) pages.push(i)
  } else {
    if (pageIndex > 2) pages.push(0)
    if (pageIndex > 3) pages.push('...')
    for (let i = Math.max(0, pageIndex - 2); i <= Math.min(totalPages - 1, pageIndex + 2); i++) {
      pages.push(i)
    }
    if (pageIndex < totalPages - 4) pages.push('...')
    if (pageIndex < totalPages - 3) pages.push(totalPages - 1)
  }

  return pages
}
