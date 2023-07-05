import { ThemeProvider } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

import stackTheme from 'src/@core/styles/stackTheme'

import {
  defaultEditPluginForm,
  defaultPriceForm,
  EditPluginForm,
  PluginPricing,
  type PriceFormData,
  type EditPluginFormData
} from 'src/components/Forms'
import { a11yProps, TabList, TabPanel, type TabData } from 'src/components/Navbars'

import { pluginsSchema, PluginPricingSchema } from 'src/schemas'

const Details = () => {
  const { t } = useTranslation()
  const [deactivate, setDeactivate] = useState(false)

  const pluginForm = useForm({
    defaultValues: defaultEditPluginForm,
    mode: 'onBlur',
    resolver: yupResolver(pluginsSchema)
  })

  const onPluginSubmit = (data: EditPluginFormData) => {
    console.log(data)
  }

  return (
    <Stack spacing={5}>
      <Card>
        <CardContent>
          <FormProvider {...pluginForm}>
            <form onSubmit={pluginForm.handleSubmit(onPluginSubmit)}>
              <ThemeProvider theme={stackTheme}>
                <EditPluginForm />
              </ThemeProvider>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Box fontWeight={600} mb={5}>
            {t('deactivate-product')}
          </Box>
          <FormControlLabel
            control={<Checkbox checked={deactivate} onChange={() => setDeactivate(!deactivate)} />}
            label={t('confirm-deactivate-product')}
          />
          <Stack direction='row' spacing={5} mt={3}>
            <Button disabled={!deactivate} variant='outlined' color={'warning'}>
              {t('deactivate')}
            </Button>
            <Button variant='outlined' color='success'>
              {t('activate')}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}

const PLUGIN_TABS: TabData[] = [
  {
    route: 'detail',
    text: 'detail',
    icon: 'credit-card',
    permissions: { action: 'manage', subject: 'all' }
  },
  {
    route: 'price',
    text: 'price',
    icon: 'coin',
    permissions: { action: 'manage', subject: 'all' }
  },
  {
    route: 'image',
    text: 'image',
    icon: 'settings',
    permissions: { action: 'manage', subject: 'all' }
  }
]

const EditPlugin = () => {
  const { t } = useTranslation()
  const [tab, setTab] = useState('detail')

  const pluginPricing = useForm({
    defaultValues: defaultPriceForm,
    mode: 'onBlur',
    resolver: yupResolver(PluginPricingSchema)
  })

  const onPluginPricingSubmit = (data: PriceFormData) => {
    console.log(data)
  }

  const tabs = PLUGIN_TABS.map(({ route, text, icon, permissions }) => (
    <Tab key={route} label={t(text)} {...a11yProps({ route, text, icon, permissions })} />
  ))

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  return (
    <Box>
      <TabList value={tab} onChange={handleChange} sx={{ marginBottom: 5 }}>
        {tabs}
      </TabList>
      <TabPanel value={'detail'} activeTab={tab}>
        <Details />
      </TabPanel>
      <TabPanel value={'price'} activeTab={tab}>
        <FormProvider {...pluginPricing}>
          <Card>
            <CardContent>
              <form onSubmit={pluginPricing.handleSubmit(onPluginPricingSubmit)}>
                <PluginPricing />
              </form>
            </CardContent>
          </Card>
        </FormProvider>
      </TabPanel>
    </Box>
  )
}

EditPlugin.acl = {
  action: 'read',
  subject: 'tenant-system'
}

export default EditPlugin
