import { createTheme, Theme } from "@mui/material"

const stackTheme = (theme: Theme) => createTheme({
  ...theme,
  components:{
    ...theme.components,
    MuiStack:{
      defaultProps:{
        direction:{ sm:"column", md: "row"},
        spacing: {sm: 5, xs: 5, }
      },
    },
  }
})

export default stackTheme
