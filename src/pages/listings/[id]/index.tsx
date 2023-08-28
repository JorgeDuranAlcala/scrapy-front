import { useState } from 'react'

import { useRouter } from 'next/router'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardTitle from '@mui/material/CardHeader'

// ** Third party imports
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery, useMutation } from '@tanstack/react-query'

// ** Layout
import ListingLayout from 'src/layouts/ListingLayout'

// ** Custom components
import { ListingTable, listingColumns } from 'src/components/Tables'
import { SpecialFilters, type SpecialFiltersData } from 'src/components/Shared'

// ** Schemas
import { SpecialFilterSchema } from 'src/schemas'

// ** Services
import { getPosts, scrape } from 'src/services/scraping'

const Listing = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25
  })
  const { query } = useRouter()
  const websiteName = query.id

  const specialFilters = useForm({
    defaultValues: SpecialFilterSchema.getDefault(),
    mode: 'onBlur',
    resolver: yupResolver(SpecialFilterSchema)
  })

  const filters = specialFilters.watch()

  const posts = useQuery({
    queryKey: ['posts', paginationModel.page],
    queryFn: () => {
      return getPosts(filters, paginationModel.page)
    },
    keepPreviousData: true
  })

  const scrapeData = useMutation({
    mutationKey: ['scrape-posts'],
    mutationFn: scrape,
    onSuccess: () => {
      posts.refetch()
    }
  })

  const onSubmit = (data: SpecialFiltersData) => {
    if(typeof websiteName === 'string')
      scrapeData.mutate({filters: data, page: websiteName})
    else console.log("Page is loading")
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
        <ListingTable rows={[]} rowLength={ 0} columnDefinition={listingColumns} paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
        />
      </Card>
    </ListingLayout>
  )
}

Listing.acl = {
  action: 'see',
  subject: 'user-pages'
}

export default Listing
