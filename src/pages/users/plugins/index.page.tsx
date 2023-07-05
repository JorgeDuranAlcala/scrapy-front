import { useState, ChangeEvent } from 'react'

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import TextField from '@mui/material/TextField'
import Tab from '@mui/material/Tab'
import { useTranslation } from "react-i18next"
import UseBgColor from "src/@core/hooks/useBgColor"

import Icon from "src/@core/components/icon"

import { PricesPopover, PluginCard } from "src/components/Plugins"
import { a11yProps, TabList, TabPanel, type TabData } from 'src/components/Navbars'


const MOCK_PLUGIN_DATA = [
  {
    id: "0",
    title: "Test",
    icon: "tabler:brand-react",
    price: 5,
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, vero repellat voluptas architecto in iste doloremque deserunt cum corporis veritatis atque non obcaecati placeat tenetur optio officia cumque quia veniam.",
    status: "active"
  }
]

for (let i=0; i<4; i++){
  const { id, ...rest } = MOCK_PLUGIN_DATA[0]

  const plugin = Object.assign({id: `${id}${i}`} , rest)
  MOCK_PLUGIN_DATA.push(plugin)
}

const filterButtons = {
  active: "successLight",
  inactive: "errorLight",
  trial: "infoLight"
}

const FilterButton = ({value, selected, setSelected}: FilterButtonProps) => {
  const colors = UseBgColor()
  const { t } = useTranslation()
  const active = value === selected
  const variant = filterButtons[value] as keyof typeof colors

  return (
    <Button
      sx={{padding: 0}}
      onClick={() => setSelected(value)}
    >
      <Card sx={{minWidth: "100px"}}>
        <CardContent>
          <Stack direction={{sm: "column", md: "row"}}
            alignItems={{sm: "center"}}
            spacing={{sm: 2, md: 5}}
            justifyContent="space-between"
          >
            <Box>{t(value)}</Box>
            <Box sx={{
              ...colors[variant],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 50,
              height: 30,
              borderRadius: "5px"
            }}>
              {active && <Icon fontSize={32} icon="tabler:check"/>}
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Button>
  )
}

const PLUGIN_TABS: TabData[] = [
  {
    route: 'management',
    text: 'management',
    icon: 'file-text',
    permissions: { action: '', subject: '' }
  },
  {
    route: 'billing',
    text: 'billing',
    icon: '3d-cube-sphere',
    permissions: { action: '', subject: '' }
  },
  {
    route: 'accounting',
    text: 'accounting',
    icon: 'database',
    permissions: { action: '', subject: '' }
  },
  {
    route: 'taxation',
    text: 'taxation',
    icon: 'credit-card',
    permissions: { action: '', subject: '' }
  }
]

const Plugins = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [buttonFilter, setButtonFilter] = useState('')
  const [activeTab, setTab] = useState('management')

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) =>{
    setSearch(event.target.value)
  }

  const handleFilterChange= (value: string) => {
    setButtonFilter(value !== buttonFilter ? value : '')
  }

  const tabs = PLUGIN_TABS.map(({route, text, icon, permissions}) => (
    <Tab key={route} label={t(text)} {...a11yProps({route, text, icon, permissions})} />
  ))

  return (
    <Stack direction="row" spacing={5}>
      <TabList
        orientation="vertical"
        value={activeTab}
        onChange={(event, value: string) => { setTab(value)}}
        sx={{minWidth: 180}}>
        {tabs}
      </TabList>
      <TabPanel value={'management'} activeTab={activeTab}>
        <Box>
          <Stack direction={{lg: "column", xl:"row"}}
            justifyContent={{ xl: "space-between" }}
            alignItems="center"
            spacing={{xs: 5, md: 5}}
          >
            <Stack direction="row" spacing={3}>
              <TextField
                placeholder={t('module-name') as string}
                sx={({palette}) => ({backgroundColor: palette.background.paper})}
                onChange={handleSearchChange}
                value={search}
              />
              <PricesPopover plugins={MOCK_PLUGIN_DATA}/>
            </Stack>
            <Stack direction="row" spacing={3}>
              {Object.keys(filterButtons).map(variant => (
                <FilterButton key={variant}
                  selected={buttonFilter}
                  value={variant as keyof typeof filterButtons}
                  setSelected={handleFilterChange}
                />
              ))}
            </Stack>
          </Stack>
          <Grid container spacing={5} marginTop={5}>
            {MOCK_PLUGIN_DATA.map((plugin) => (
              <Grid item key={plugin.id} sm={12} md={4}>
                <PluginCard  {...plugin} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </TabPanel>
    </Stack>
  )
}

type FilterButtonProps = {
  value: keyof typeof filterButtons
  selected: string
  setSelected: (value: string) => void
}

Plugins.acl = {
  action: 'read',
  subject: 'users'
}


export default Plugins
