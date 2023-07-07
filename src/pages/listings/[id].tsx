// ** React Imports
import { useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardTitle from '@mui/material/CardHeader'

import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Layout
import ListingLayout from 'src/layouts/ListingLayout'

import { ListingTable } from 'src/components/Tables'

import { SpecialFilters, defaultSpecialFilters, type SpecialFiltersData } from 'src/components/Shared'

import { SpecialFilterSchema } from 'src/schemas'

const Listing = () => {
  const [search, setSearch] = useState('')
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
                <SpecialFilters search={search} setSearch={setSearch} />
              </form>
            </FormProvider>
          </CardContent>
          <ListingTable />
        </Card>
      </ListingLayout>
    )
}

Listing.acl={
  action:'see',
  subject:'user-pages'
}

export default Listing
