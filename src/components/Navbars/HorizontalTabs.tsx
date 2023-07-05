import { useContext } from "react"

import Tab from '@mui/material/Tab'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { AbilityContext } from 'src/layouts/components/acl/Can'


import { Icon } from '@iconify/react'

import { TabList } from './TabList'

import Link from 'next/link'

export const a11yProps = (tabInfo: TabData) => {
  const {route, text, icon} = tabInfo

  return {
    icon: <Icon width={20} icon={`tabler:${icon}`} />,
    value: route,
    id: `tab-${text}`,
    'aria-controls': `tabpanel-${text}`
  }
}

export const HorizontalTabs = ({ basePath, tabElements }: HorizontalTabProps) => {
  const router = useRouter()
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()

  const currentPage = router.pathname.split(`${basePath}/`)[1]

  const tabs = tabElements
    .filter(({permissions: {action, subject}}) => ability?.can(action, subject) )
    .map((tab) => {
      const {route, text} = tab
      return (
      <Tab component={Link}
        href={route !== "#" ? basePath +'/' + route : "#"}
        key={route + text} label={t(text)} {...a11yProps(tab)}
        />
      )
    })

  return (
    <TabList
      variant='scrollable'
      value={currentPage || ''}
      aria-label='account-tabs'
      sx={{ borderRight: 1, borderColor: 'divider' }}
    >
      {tabs}
    </TabList>
  )
}

export type TabData = {
  route: string
  text: string
  icon: string
  permissions: { action: string, subject: string }
}

type HorizontalTabProps = {
  basePath: string
  tabElements: TabData[]
}
