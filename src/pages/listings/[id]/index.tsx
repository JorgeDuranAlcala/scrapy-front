import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardTitle from '@mui/material/CardHeader'

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
  const [, debouncedSearch, setSearch] = useDebouncedState('')
  const { query } = useRouter()
  const websiteName = query.id
  const { page, pageSize } = paginationModel

  const specialFilters = useForm({
    defaultValues: SpecialFilterSchema.getDefault(),
    mode: 'onBlur',
    resolver: yupResolver(SpecialFilterSchema)
  })

  const { search, ...filters } = specialFilters.watch()

  useEffect(() => {
    if (search !== debouncedSearch) setSearch(search)
  }, [search])

  /*         {
          municipality: { name: '', id: undefined },
          zone: '',
          category: '',
          operation: '',
          status: '',
          search: debouncedSearch
        }, */
  const { data, isLoading, ...posts } = useQuery({
    queryKey: ['posts', websiteName, filters, page, pageSize, debouncedSearch],
    queryFn: async () => await getPosts(websiteName, page, pageSize),
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  const [filterdData, setFilteredData] = useState([])

  useEffect(() => {
    setFilteredData(data?.posts)
  }, [data?.posts])

  /**
   * this is how you can filter data from the api
   */
  useEffect(() => {
    let newData = []
    if (filters.operation)
      newData = data?.posts.filter((post: any) => filters.operation.toLowerCase() === post.operation)
    if (filters.category) newData = newData?.filter((post: any) => filters.category.toLowerCase() === post.category)
    if (filters.municipality?.name)
      newData = newData?.filter((post: any) => filters.municipality?.name === post.municipality)
    console.log('newData', newData)
    setFilteredData(newData)
  }, [filters.operation, filters.municipality?.name, filters.category, data?.posts])

  /*   useEffect(() => {
    if (filters.municipality?.name) {
      const newData = data?.posts.filter((post: any) => filters.municipality?.name === post.municipality)
      setFilteredData(newData)
    }
  }, [filters.municipality?.name, data?.posts]) */

  const scrapeData = useMutation({
    mutationKey: ['scrape'],
    mutationFn: scrape,
    onSuccess: () => {
      posts.refetch()
    }
  })

  const postUpdate = useMutation({
    mutationKey: ['update-post'],
    mutationFn: updatePost,
    onSuccess: () => {
      toast.success('Dato actualizado')
    },
    onError: e => {
      console.log(e)
      toast.error('Backend no permite editar este dato')
    }
  })

  const onSubmit = (data: SpecialFiltersData) => {
    if (typeof websiteName === 'string') scrapeData.mutate({ filters: data, website: websiteName })
    else console.log('Page is loading')
  }

  return (
    <ListingLayout>
      <Card>
        <CardTitle title='Filtros especiales' sx={{ textTransform: 'uppercase' }} />
        <CardContent>
          <FormProvider {...specialFilters}>
            <form onSubmit={specialFilters.handleSubmit(onSubmit)}>
              <SpecialFilters isScraping={scrapeData.isLoading} />
            </form>
          </FormProvider>
        </CardContent>
        <ListingTable
          rows={filterdData || []}
          columnDefinition={listingColumns}
          {...{ paginationModel, setPaginationModel }}
          totalRows={(data && data.total) || 0}
          loading={isLoading}
          update={postUpdate.mutate}
          editable={true}
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
