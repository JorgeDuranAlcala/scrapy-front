import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardTitle from '@mui/material/CardHeader'

import { type GridValidRowModel } from '@mui/x-data-grid'

// ** Third party imports
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

// ** Layout
import ListingLayout from 'src/layouts/ListingLayout'

// ** Custom components
import { ListingTable, listingColumns } from 'src/components/Tables'
import { SpecialFilters, type SpecialFiltersData } from 'src/components/Shared'

// ** Schemas
import { SpecialFilterSchema } from 'src/schemas'

// ** Services
import { scrape, getPosts, updatePost } from 'src/services/scraping'

// ** Hooks
import { useDebouncedState } from 'src/hooks'

const Listing = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25
  })
  const [, debouncedSearch, setSearch ] = useDebouncedState('')
  const { query } = useRouter()
  const websiteName = query.id
  const { page, pageSize } = paginationModel

  const specialFilters = useForm({
    defaultValues: SpecialFilterSchema.getDefault(),
    mode: 'onBlur',
    resolver: yupResolver(SpecialFilterSchema)
  })

  const {search, ...filters} = specialFilters.watch()

  useEffect(() => {
    if(search !== debouncedSearch)
      setSearch(search)
  }, [search])

  const {data, isLoading, ...posts} = useQuery({
    queryKey: ['posts', filters, page, pageSize, debouncedSearch],
    queryFn: async() => await getPosts(
      {
        ...filters,
        search: debouncedSearch
      },
      page,
      pageSize
    ),
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const scrapeData = useMutation({
    mutationKey: ['scrape'],
    mutationFn: scrape,
    onSuccess: () => {
      posts.refetch()
    },
  })

  const postUpdate = useMutation({
    mutationKey: ['update-post'],
    mutationFn: updatePost,
    onSuccess: () => {
      toast.success('Dato actualizado')
    },
    onError: (e) => {
      console.log(e)
      toast.error('Backend no permite editar este dato')
    }
  })

  const onSubmit = (data: SpecialFiltersData) => {
    if(typeof websiteName === 'string')
      scrapeData.mutate({filters: data, website: websiteName})
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
        <ListingTable rows={(data && data.posts) || []} columnDefinition={listingColumns}
          {...{paginationModel, setPaginationModel}} totalRows={(data && data.total) || 0}
          loading={isLoading} update={postUpdate.mutate}
        />
      </Card>
    </ListingLayout>
  )
}

Listing.acl={
  action:'see',
  subject:'user-pages'
}

export default Listing
