import { useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { useQuery } from '@tanstack/react-query'

import { UserTable, TableWrapper } from 'src/components/Tables'

import { getAll } from 'src/services/users'

import { useDebouncedState } from 'src/hooks'

const TableList = () => {
  const [page, setPage] = useState(0)
  const [search, debouncedSearch, setSearch] = useDebouncedState('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['get-users'],
    queryFn: () => getAll(page, debouncedSearch),
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  return (
    <Card>
      <CardContent>
        <TableWrapper
          page={page}
          setPage={setPage}
          loading={isLoading || search != debouncedSearch}
          error={isError}
          rows={data || []}
        >
          <UserTable rows={data || []} search={search} setSearch={setSearch} />
        </TableWrapper>
      </CardContent>
    </Card>
  )
}

TableList.acl = {
  action: 'write',
  subject: 'users'
}

export default TableList
