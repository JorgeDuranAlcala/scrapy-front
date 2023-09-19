// ** MUI Imports
import Box from '@mui/material/Box'
import MuiLink from '@mui/material/Link'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import Link from 'next/link'

import { useTranslation } from 'react-i18next'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const { t } = useTranslation()

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
        {`${t('made-by')} `}
        <MuiLink component={Link} href='/' passHref>
          ErpSistemas
        </MuiLink>
      </Typography>
      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <MuiLink component={Link} href='/customer-help' passHref>
            {t('customer-support')}
          </MuiLink>
        </Box>
      )}
    </Box>
  )
}

export default FooterContent
