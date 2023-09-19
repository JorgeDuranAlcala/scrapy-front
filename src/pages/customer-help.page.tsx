// ** React Imports
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import Icon from 'src/@core/components/icon'
import { useTranslation } from 'react-i18next'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  gap: 20,
  flexDirection: 'column',
  borderRadius: 20,
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: 497,
    height: 'auto',
    maxHeight: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(20)
  }
}))

const CustomerHelp = () => {
  const { t } = useTranslation()
  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper sx={{backgroundColor: 'action.hover'}} mb={5} p={5}>
          <Typography variant='h4'>{t('customer-support')}</Typography>
          <Typography variant='h6'>{t('customer-support-hours', { start: '9:00', end: '22:00' })}</Typography>
          <Stack justifyContent="space-around" direction={{ md: 'row' }} spacing={5}>
            <Stack alignItems='center' sx={{ backgroundColor: 'background' }} direction='row' spacing={3}>
              <Icon icon='tabler:phone' />
              <Typography variant='h6'>911 000 000</Typography>
            </Stack>
            <Stack alignItems='center' sx={{ backgroundColor: 'background' }} direction='row' spacing={2} >
              <Icon icon='tabler:mail' />
              <Typography variant='h6'>info@autoges.eu</Typography>
            </Stack>
          </Stack>
        </BoxWrapper>
        <Button LinkComponent={Link} href="/" variant="contained">
          {t('back-home')}
        </Button>
        <Img height='500' alt='under-maintenance-illustration' src='/images/pages/misc-under-maintenance.png' />
      </Box>
      <FooterIllustrations />
    </Box>
  )
}

CustomerHelp.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default CustomerHelp
