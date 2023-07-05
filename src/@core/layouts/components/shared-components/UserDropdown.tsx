// ** React Imports
import { useState, SyntheticEvent, Fragment, useContext } from 'react'

// ** Next Import
import { useRouter } from 'next/router'
import NextLink from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'

// ** Third party imports
import { useTranslation } from 'react-i18next'

interface Props {
  settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const MenuItemStyled = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  '&:hover .MuiBox-root, &:hover .MuiBox-root svg': {
    color: theme.palette.primary.main
  }
}))

const Link = styled(NextLink)(() => ({
  '&': {
    textDecoration: "none"
  }
}))

const UserDropdown = (props: Props) => {
  // ** Translation
  const { t } = useTranslation()

  // ** Abilities
  const ability = useContext(AbilityContext)

  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const { logout, tenantUser, activeTenant } = useAuth()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const canEditProfile = ability?.can('update', 'personal-account')

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    px: 4,
    py: 1.75,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2.5,
      color: 'text.primary'
    }
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt='John Doe'
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src='/images/avatars/1.png'
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4.5 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ py: 1.75, px: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar alt='John Doe' src='/images/avatars/1.png' sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', ml: 2.5, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 500 }}>John Doe</Typography>
              { tenantUser && tenantUser.userRole.specialRol !== 'normal' &&
                <Typography variant='body2'>{t(tenantUser.userRole.specialRol)}</Typography>
              }
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
        <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box component={Link} sx={styles} href={`/users/edit${canEditProfile ? '/' : '/security'}`}>
              <Icon icon='tabler:user-check' />
              {t('my-profile')}
            </Box>
        </MenuItemStyled>
        <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='tabler:message-2' />
            {t('chat')}
          </Box>
        </MenuItemStyled>
        <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
        <Box>
        { ability?.can('update', 'tenant-settings') && activeTenant !== null &&
            <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
              <Box sx={styles} component={Link} href="/users/plugins">
                <Icon icon='tabler:currency-dollar' />
                {t('pricing')}
              </Box>
            </MenuItemStyled>
        }
        { ability?.can('read', 'users') &&
            <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
              <Box sx={styles} component={Link} href="/users/">
                <Icon icon='tabler:users' />
                {t('users')}
              </Box>
            </MenuItemStyled>
        }
          </Box>
          <Box>
        { ability?.can('update', 'tenant-settings') && activeTenant !== null &&
            <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
              <Box sx={styles} component={Link} href="/config">
                <Icon icon='tabler:settings' />
                {t('configurations')}
              </Box>
            </MenuItemStyled>
        }
        { ability?.can('get', 'help') &&
            <MenuItemStyled sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
              <Box sx={styles}>
                <Icon icon='tabler:help' />
                {t('help')}
              </Box>
            </MenuItemStyled>
        }
        {(ability?.can('get', 'help') || ability?.can('update', 'tenant-settings')) &&
          activeTenant !== null &&
          <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
        }
        </Box>
        <MenuItemStyled onClick={handleLogout} sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem' } }}>
          <Icon icon='tabler:logout' />
          Logout
        </MenuItemStyled>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
