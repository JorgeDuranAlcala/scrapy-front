import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"


import { useFormContext } from "react-hook-form"

export const FormButtons = () => {

  const form = useFormContext()

  return (
    <Stack direction="row" spacing={5}>
      <Button type="submit" variant="contained">
        Guardar
      </Button>
      <Button color="secondary" variant="outlined"
        onClick={() => form.reset()}
      > 
        Reiniciar
      </Button>
    </Stack>
  )
}
