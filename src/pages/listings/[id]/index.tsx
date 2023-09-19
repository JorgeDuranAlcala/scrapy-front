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

const ROWS = [
  {
    id: 1,
    email: 'test@gmail.com',
    operation: 'test',
    category: 'test',
    title: 'title',
    price: 3000,
    meters: 1200,
    sqrMtrPrice: 1200,
    phone: 1200,
    status: 'Contacto',
    bathrooms: 2,
    rooms: 2,
    adSite: 'blah blah',
    adDate: new Date(),
    adOwner: 'test',
    user: 'test',
    link: '#',
    count: 2,
    vip: false,
  },
  {
    id: 2,
    email: 'test2@gmail.com',
    operation: 'test',
    category: 'test',
    title: 'title',
    price: 3000,
    meters: 1200,
    sqrMtrPrice: 1200,
    phone: 1200,
    status: 'Contacto',
    bathrooms: 2,
    rooms: 2,
    adSite: 'blah blah',
    adDate: new Date(),
    adOwner: 'test',
    user: 'test',
    link: '#',
    count: 3,
    comments: 'este es un comentario',
    vip: true,
  },
  {
    id: 3,
    email: 'test2@gmail.com',
    operation: 'test',
    category: 'test',
    title: 'title',
    price: 3000,
    meters: 1200,
    sqrMtrPrice: 1200,
    phone: 1200,
    status: 'Contacto',
    bathrooms: 2,
    rooms: 2,
    adSite: 'blah blah',
    adDate: new Date(),
    adOwner: 'test',
    user: 'test',
    link: '#',
    count: 3,
    comments: 'este es un comentario'
  },
  {
    id: 4,
    email: 'test2@gmail.com',
    operation: 'test',
    category: 'test',
    title: 'title',
    price: 3000,
    meters: 1200,
    sqrMtrPrice: 1200,
    phone: 1200,
    status: 'Contacto',
    bathrooms: 2,
    rooms: 2,
    adSite: 'blah blah',
    adDate: new Date(),
    adOwner: 'test',
    user: 'test',
    link: '#',
    count: 3,
    comments: 'este es un comentario'
  },
  {
    id: 5,
    email: 'test2@gmail.com',
    operation: 'test',
    category: 'test',
    title: 'title',
    price: 3000,
    meters: 1200,
    sqrMtrPrice: 1200,
    phone: 1200,
    status: 'Contacto',
    bathrooms: 2,
    rooms: 2,
    adSite: 'blah blah',
    adDate: new Date(),
    adOwner: 'test',
    user: 'test',
    link: '#',
    count: 3,
    comments: 'este es un comentario'
  },
  {
    id: 6,
    email: 'test2@gmail.com',
    operation: 'test',
    category: 'test',
    title: 'title',
    price: 3000,
    meters: 1200,
    sqrMtrPrice: 1200,
    phone: 1200,
    status: 'Contacto',
    bathrooms: 2,
    rooms: 2,
    adSite: 'blah blah',
    adDate: new Date(),
    adOwner: 'test',
    user: 'test',
    link: '#',
    count: 3,
    comments: 'este es un comentario'
  },
  {
    id: 7,
    email: 'test2@gmail.com',
    operation: 'test',
    category: 'test',
    title: 'title',
    price: 3000,
    meters: 1200,
    sqrMtrPrice: 1200,
    phone: 1200,
    status: 'Contacto',
    bathrooms: 2,
    rooms: 2,
    adSite: 'blah blah',
    adDate: new Date(),
    adOwner: 'test',
    user: 'test',
    link: '#',
    count: 3,
    comments: 'este es un comentario'
  },
  {
    id: 8,
    email: 'test2@gmail.com',
    operation: 'test',
    category: 'test',
    title: 'title',
    price: 3000,
    meters: 1200,
    sqrMtrPrice: 1200,
    phone: 1200,
    status: 'Contacto',
    bathrooms: 2,
    rooms: 2,
    adSite: 'blah blah',
    adDate: new Date(),
    adOwner: 'test',
    user: 'test',
    link: '#',
    count: 3,
    comments: 'este es un comentario'
  },
  {
    id: 9,
    email: 'test2@gmail.com',
    operation: 'test',
    category: 'test',
    title: 'title',
    price: 3000,
    meters: 1200,
    sqrMtrPrice: 1200,
    phone: 1200,
    status: 'Contacto',
    bathrooms: 2,
    rooms: 2,
    adSite: 'blah blah',
    adDate: new Date(),
    adOwner: 'test',
    user: 'test',
    link: '#',
    count: 3,
    comments: 'este es un comentario'
  },
  {
    id: 10,
    email: 'test2@gmail.com',
    operation: 'test',
    category: 'test',
    title: 'title',
    price: 3000,
    meters: 1200,
    sqrMtrPrice: 1200,
    phone: 1200,
    status: 'Contacto',
    bathrooms: 2,
    rooms: 2,
    adSite: 'blah blah',
    adDate: new Date(),
    adOwner: 'test',
    user: 'test',
    link: '#',
    count: 3,
    comments: 'este es un comentario'
  }
]

for(let i = 0; i<= 20; i++){
  const a = {...ROWS[0]}
  a.id= i + 50
  ROWS.push(a)
}

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
        <ListingTable rows={ROWS} columnDefinition={listingColumns} />
      </Card>
    </ListingLayout>
  )
}

Listing.acl={
  action:'see',
  subject:'user-pages'
}

export default Listing
