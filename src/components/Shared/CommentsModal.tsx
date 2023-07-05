// React
import { useContext, useEffect } from "react"

// ** Mui
import Button from "@mui/material/Button"
import InputAdornment from "@mui/material/InputAdornment"
import Dialog from "@mui/material/Dialog"
import Stack from "@mui/material/Stack"

// ** Third party
import { useTranslation } from "react-i18next"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import yup from "src/@core/utils/customized-yup"

// ** Custom components
import { ControlledTextField } from "src/components/Forms"
import Icon from "src/@core/components/icon"

// ** Context
import { ModalContext } from "src/context"

const commentsSchema = yup.object().shape({
  comments: yup.string().min(1)
})

type commentsData = { comments: string }

export const CommentsModal = ({id, comments=''}: CommentModalProps) => {
  const { t } = useTranslation()
  const [opened, { close }] = useContext(ModalContext)
  const commentsForm = useForm({
    defaultValues: { comments },
    mode: 'onBlur',
    resolver: yupResolver(commentsSchema),
  })

  const onSubmit = (data: commentsData) => {
    console.log(data, id)
  }

  useEffect(() => {
    if(opened)
      commentsForm.reset({comments})
  }, [opened])

  return (
    <Dialog open={opened} onClose={close} fullWidth>
        <FormProvider {...commentsForm}>
          <form onSubmit={commentsForm.handleSubmit(onSubmit)} >
            <Stack spacing={5} padding={10}>
              <ControlledTextField
                name="comments"
                label="comments"
                multiline
                rows={5}
                InputProps={{
                  sx: { alignItems: 'start' },
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon width={20} icon='tabler:message' />
                    </InputAdornment>
                  )
                }}
              />
              <Stack direction={"row"} justifyContent="space-between">
                <Button type="submit" variant="contained">
                  {t('save')}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={close}
                >
                  {t('cancel')}
                </Button>
              </Stack>
            </Stack>
          </form>
        </FormProvider>
    </Dialog>
  )
}

type CommentModalProps = {
  id: string
  comments?: string
}
