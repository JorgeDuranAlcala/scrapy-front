import { createTheme, Theme } from "@mui/material"

export const selectFilled = (theme: Theme) =>
  createTheme({
    ...theme,
    components: {
      ...theme.components,
      MuiSelect: {
        styleOverrides: {
          filled: {
            paddingTop: 5,
            paddingBottom: 5
          }
        }
      }
    }
  })
