import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

import { useTranslation } from "react-i18next"
import { useFormContext } from "react-hook-form"

export const FormButtons = () => {
  const { t } = useTranslation()
  const form = useFormContext()

  return (
    <Stack direction="row" spacing={5}>
      <Button type="submit" variant="contained">
        {t('save')}
      </Button>
      <Button color="secondary" variant="outlined"
        onClick={() => form.reset()}
      >
        {t('reset')}
      </Button>
    </Stack>
  )
}
