import { useState } from 'react'

const useTablePagination = <T,>(rows: T[], rowsPerPage?: number) => {

  const [visibleRows, setVisibleRows] = useState<typeof rows>(rows.slice(0, rowsPerPage || 25))

  const visibleRowsChange = (array: unknown) => {
    setVisibleRows(array as typeof rows)
  }

  return { visibleRows, visibleRowsChange }
}

export default useTablePagination
