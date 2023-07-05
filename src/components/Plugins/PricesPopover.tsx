import { MouseEvent, useState } from "react"

import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import IconButton from "@mui/material/IconButton"
import Popover from "@mui/material/Popover"
import Stack from "@mui/material/Stack"

import { useTranslation, Trans } from "react-i18next"
import  Icon  from "src/@core/components/icon"
import useBgColor from "src/@core/hooks/useBgColor"

export const PricesPopover = ({plugins}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const colors = useBgColor()

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ariaId = open ? 'plugin-price-list-popover' : undefined;
  const { t } = useTranslation()

  const priceTotal = plugins.reduce((total, {price}) => (total + price), 0)

  return (
    <>
      <Button aria-describedby={ariaId} variant="contained" onClick={handleClick}>
        {t('see-prices')}
      </Button>
      <Popover
        anchorReference="anchorPosition"
        anchorPosition={{ top: 3000, left: 3000 }}
        id={ariaId}
        open={open}
        onClose={handleClose}
        anchorOrigin={{vertical: "bottom", horizontal: "right"}}
        transformOrigin={{vertical: "bottom", horizontal: "right"}}
      >
        <Card sx={{minWidth: 400}}>
          <CardHeader
            title={t("price-list")}
            subheader={
              <Trans
                i18nKey="plugin-total"
                components={{
                  green: <Box component={'span'} sx={{color: colors.successLight.color}}/>
                }}
                values={{ count: plugins.length, total: priceTotal }}
              />
            }
            action={
              <IconButton onClick={handleClose}>
                <Icon icon="tabler:x"/>
              </IconButton>
            }
          />
          <CardContent>
            <Stack spacing={5}>
              {plugins.map(({id, title, icon, price}) => (
                <Stack key={id} direction="row" justifyContent="space-between">
                  <Stack direction="row" spacing={3}>
                    <Avatar sx={{...colors.infoLight, width: 24, height: 24}}>
                      <Icon icon={icon} width={16}/>
                    </Avatar>
                    <Box >{title}</Box>
                  </Stack>
                  <Avatar sx={({typography}) => ({
                    ...colors.successLight,
                    fontSize: typography.subtitle2.fontSize
                  })}>
                    {price} €
                  </Avatar>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Popover>
    </>
  )
}

type PluginInfo = {
  id: string
  title: string
  icon: string
  price: number
}

type Props = {
  plugins: PluginInfo[]
}
