import { useState, Dispatch, SetStateAction } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import InputLabel from "@mui/material/InputLabel"
import Select, {SelectChangeEvent} from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormControl from '@mui/material/FormControl'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles';

import { useTranslation } from 'react-i18next'

import  useBgColor from 'src/@core/hooks/useBgColor'

const variants = {
  'client-provider': 'primaryLight',
  'business-particular': 'infoLight',
  'price': 'successLight'
} as const

export const BusinessCompanySelect = ({ setBusiness, businesses, org, business }: Props) => {
  const { t } = useTranslation()
  const [active, setActive] = useState('active')
  const colors = useBgColor()
  const Tag = styled(Box)<TagProps>(({ variant }) => ({
    width: "100%",
    textTransform: "uppercase",
    fontSize: "0.8rem",
    padding: 5,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    ...colors[variants[variant]],
  }))

  const activeFieldColor = active==='active' ? colors.successLight : colors.warningLight

  const handleBusinessChange = (event: SelectChangeEvent<number>) => {
    setBusiness(event.target.value as number)
  }

  const businessMenu = businesses.map((business, i) => <MenuItem value={i} key={business}>{business}</MenuItem>)

  if(businesses.length === 1) setBusiness(0)

  const label = `Campo Nombre ${org === 'company' ? 'Comercial' : 'y Apellidos'} + (POBLACION)`

  return (
    <Card>
      <CardContent>
        <Stack direction={{xs: "column", sm: "column", md: "row"}} spacing={5}>
          <FormControl fullWidth disabled={businesses.length <= 1}>
          <InputLabel id="business-label">{label}</InputLabel>
              <Select
                id="business"
                value={business === undefined ? '' : business}
                label={label}
                onChange={handleBusinessChange}
              >
                {businessMenu}
              </Select>
          </FormControl>
          <Stack width={"100%"} spacing={5} direction="row" >
            <Tag variant='client-provider'>
              Placeholder
            </Tag>
            <Tag variant='business-particular'>Placeholder</Tag>
            <Select
              value={active}
              onChange={(event) => { setActive(event.target.value)}}
              sx={{
                ...activeFieldColor,
                textAlign: 'center',
                textTransform: 'uppercase',
                fontSize: '0.8rem'
              }}
              fullWidth
            >
              <MenuItem value='active'>{t('active')}</MenuItem>
              <MenuItem value='inactive'>{t('inactive')}</MenuItem>
            </Select>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

type Props = {
  setBusiness: Dispatch<SetStateAction<number | undefined>>
  businesses: string[]
  org?: OrgSelect
  business: number | undefined
}

interface TagProps extends BoxProps {
  variant: 'client-provider' | 'business-particular' | 'price'
}

export type OrgSelect = 'company' | 'client'
