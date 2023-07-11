import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardTitle from '@mui/material/CardHeader'

import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Layout
import ListingLayout from 'src/layouts/ListingLayout'

import { ListingTable, listingColumns } from 'src/components/Tables'

import { SpecialFilters, defaultSpecialFilters, type SpecialFiltersData } from 'src/components/Shared'

import { SpecialFilterSchema } from 'src/schemas'

const ROWS= [
  {
    id: 1,
    email: "test@gmail.com",
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
    count:2
  },
  {
    id: 2,
    email: "test2@gmail.com",
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
    count:3,
    comments: 'este es un comentario'
  }
]

const Listing = () => {
  const specialFilters = useForm({
    defaultValues: defaultSpecialFilters,
    mode: 'onBlur',
    resolver: yupResolver(SpecialFilterSchema)
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
