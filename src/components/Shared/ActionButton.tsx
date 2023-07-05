import MuiIconButton, { IconButtonProps } from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

import Icon from "src/@core/components/icon"

type ActionButtonProps = {
  buttonProps: IconButtonProps<any>
  title: string
  icon: string
}

const ActionButton = ({ buttonProps, title, icon }: ActionButtonProps) => {
  return (
    <Tooltip placement="top" title={title}>
      <MuiIconButton {...buttonProps}>
        <Icon width={24} icon={icon} />
      </MuiIconButton>
    </Tooltip>
  )
}

export default ActionButton
