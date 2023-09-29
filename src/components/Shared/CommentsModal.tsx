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
import {toast } from 'react-hot-toast'

const commentsSchema = yup.object().shape({
  comments: yup.string().min(1)
})

type commentsData = { comment: string }

export const CommentsModal = ({id, comments='', opened, close, submit}: CommentModalProps) => {
  const { t } = useTranslation()
  const commentsForm = useForm({
    defaultValues: { comment: comments },
    mode: 'onBlur',
    resolver: yupResolver(commentsSchema),
  })

  const onSubmit = (data: commentsData) => {
    toast.error('backend no permite editar comentario')
    if(submit) submit(data)
    console.log(data, id)
  }

  useEffect(() => {
    if(opened)
      commentsForm.reset({comment: comments})
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
  submit?: (data: any) => void
  comments?: string
  opened: boolean,
  close: () => void
}
