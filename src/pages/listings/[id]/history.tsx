import { useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardTitle from '@mui/material/CardHeader'
import Stack from '@mui/material/Stack'

import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'

import UseBgColor from 'src/@core/hooks/useBgColor'

// Layout
import ListingLayout from 'src/layouts/ListingLayout'

import { ListingTable, listingHistoryColumns } from 'src/components/Tables'

import { SpecialFilters, defaultSpecialFilters, type SpecialFiltersData } from 'src/components/Shared'

import { SpecialFilterSchema } from 'src/schemas'

import { getHistory } from 'src/services/posts'

type InfoTagProps = {
  title: string | number
  color: keyof ReturnType<typeof UseBgColor>
}

const InfoTag = ({ title, color }: InfoTagProps) => {
  const colors = UseBgColor()
  return (
    <Box {...colors[color]} padding='20px' minWidth={120} textAlign='center' borderRadius={2.5}>
      {title}
    </Box>
  )
}

const ListingHistory = () => {
  const specialFilters = useForm({
    defaultValues: defaultSpecialFilters,
    mode: 'onBlur',
    resolver: yupResolver(SpecialFilterSchema)
  })

  const { userData } = specialFilters.watch()

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25
  })

  const { data, isLoading } = useQuery({
    queryKey: ['get-history', paginationModel.page, userData?.email],
    queryFn: async () => {
      return await getHistory({ page: paginationModel.page, email: userData?.email })
    }
  })

  const onSubmit = (data: SpecialFiltersData) => {
    console.log(data)
  }

  return (
    <ListingLayout>
      <Card>
        <CardTitle title='Filtros especiales' sx={{ textTransform: 'uppercase' }} />
        <CardContent>
          <FormProvider {...specialFilters}>
            <form onSubmit={specialFilters.handleSubmit(onSubmit)}>
              <SpecialFilters />
            </form>
          </FormProvider>
        </CardContent>
        <CardContent sx={{ paddingBottom: '0px' }}>
          <Stack direction='row' gap={3}>
            <InfoTag
              title={new Date().toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
              })}
              color='primaryLight'
            />
            <InfoTag title={'placeholder'} color='infoLight' />
          </Stack>
        </CardContent>
        <ListingTable
          rows={data?.history || []}
          columnDefinition={listingHistoryColumns}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          totalRows={data?.total || 0}
          loading={isLoading}
          editable={false}
        />
      </Card>
    </ListingLayout>
  )
}

ListingHistory.acl = {
  action: 'see',
  subject: 'user-pages'
}

export default ListingHistory
