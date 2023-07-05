import { MouseEvent, useState } from "react"

import Link from "next/link"

import Avatar from "@mui/material/Avatar"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import Chip from "@mui/material/Chip"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"

import { useTranslation } from "react-i18next"

import  Icon  from "src/@core/components/icon"
import UseBgColor from "src/@core/hooks/useBgColor"

export const PluginCard = (props: Props) => {
  const { id, title, icon, description, price, status } = props
  const { t } = useTranslation()
  const colors = UseBgColor()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return(
    <Card>
      <CardHeader
      avatar={
        <Avatar sx={colors.infoLight}>
          <Icon icon={icon} width={25}/>
        </Avatar>
      }
      title={title}
      action={
        <div>
          <IconButton aria-controls="plugin-options" aria-haspopup={true} onClick={handleClick}>
            <Icon icon={"tabler:dots-vertical"} />
          </IconButton>
          <Menu
            keepMounted id='plugin-options'
            anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}>
            <MenuItem LinkComponent={Link} href={"#"} onClick={handleClose}>{t("manage_module")}</MenuItem>
          </Menu>
        </div>
      }
      />
      <CardContent>
        <Typography sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="end">
          <Avatar sx={({typography}) => ({
            ...colors.successLight,
            fontSize: typography.body1.fontSize
            })}
          >
              {price}€
          </Avatar>
          <Chip label={t(status)} sx={{...colors.successLight, borderRadius: "5px"}} />
        </Stack>
      </CardContent>
    </Card>
  )
}

type Props = {
  id: string
  title: string
  icon: string
  description: string
  price: number
  status: string
}
