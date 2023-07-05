import { useState } from "react"

import IconButton from "@mui/material/IconButton"
import type { TextFieldProps } from "@mui/material/TextField"

import ControlledTextField from "./ControlledTextField"

import Icon from "src/@core/components/icon"

const Password = ({name, label, ...props}: PasswordFieldProps) => {
  const [ showPassword, setShowPassword ] = useState(false)

  return (
    <ControlledTextField
      name={name}
      label={label}
      type={showPassword ? 'text' : 'password'}
      autoComplete='on'
      {...props}
      InputProps={{
        endAdornment:
        <IconButton onClick={() => setShowPassword(!showPassword)}>
          <Icon icon={showPassword ? "tabler:eye-off" : "tabler:eye"}/>
        </IconButton>
      }}
    />
  )
}

type PasswordFieldProps = {
  name: string,
  label: string
} & TextFieldProps

export default Password
