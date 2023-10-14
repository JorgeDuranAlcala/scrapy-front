import { useState, useEffect, memo, useMemo } from 'react'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'

import Typography from '@mui/material/Typography'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import { ControlledTextField } from 'src/components/Forms'
import Icon from 'src/@core/components/icon'
import { FileListItem } from './FileListItem'
import { FileProp } from 'src/components/Shared'

//** Hooks
import { useAuth, useFileRemove } from 'src/hooks'
import useBgColor from 'src/@core/hooks/useBgColor'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import yup from 'src/@core/utils/customized-yup'

// ** Schemas
import { EmailData, EmailSchema, TemplateData } from 'src/schemas'
import { CircularProgress, Switch } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getTemplateByName, postSendEmail, updateEmailTemplate } from 'src/services/email-templates'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { getTemplateNameByUrl } from 'src/utils'

const emailFilter = createFilterOptions<string>()

const defaultEmail: EmailData = {
  reciever: [],
  subject: '',
  message: '',
  attachment: []
}

export const EmailDrawer = memo(({ open, toggle, storedFileHandling, recipients = [] }: EmailDrawerProps) => {
  // ** State
  const [files, setFiles] = useState<FileProp[]>([])
  const [saveTemplate, setSaveTemplate] = useState<boolean>(false)
  const [options, setOptions] = useState<string[]>([])

  // ** Hooks
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const { asPath } = useRouter()
  const { t } = useTranslation()
  const { primaryLight } = useBgColor()
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: FileProp[]) => {
      setFiles(acceptedFiles.map((file: FileProp) => Object.assign(file)))
    }
  })

  const emailFields = useForm({
    defaultValues: defaultEmail,
    mode: 'onBlur',
    resolver: yupResolver(EmailSchema)
  })

  const {
    formState: { errors },
    control,
    resetField
  } = emailFields

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const handleRemoveFile = useFileRemove({ files, setFiles })

  const generateEmailMessage = (data: EmailData) => {
    return storedFileHandling && storedFileHandling.storedFiles.length > 0
      ? (data.message?.concat(
          '\n\n\n Archivos Adjuntos: \n\n',
          storedFileHandling.storedFiles.map(({ name, downloadLink }) => `${name}: ${downloadLink}`).join('\n')
        ) as string)
      : data.message
  }

  const onSubmit = (data: EmailData) => {
    sendEmailMutate({
      ...data,
      message: generateEmailMessage(data),
      attachment: files
    })
    if (saveTemplate) {
      updateTemplateMutate({
        message: emailFields.getValues('message') || '',
        subject: emailFields.getValues('subject') || '',
        name: getTemplateNameByUrl(asPath) || ''
      })
    }
  }

  const handleClose = () => {
    toggle()
    setFiles([])
    emailFields.reset()
  }

  const { mutate: sendEmailMutate, isLoading: isLoadingSendEmail } = useMutation({
    mutationKey: ['send-email'],
    mutationFn: postSendEmail,
    onSuccess: () => {
      handleClose()
      toast.success('Email enviado')
    },
    onError: () => {
      toast.error('Error al enviar el email')
    }
  })

  useQuery({
    queryKey: ['get-template', getTemplateNameByUrl(asPath)],
    queryFn: async () => {
      return await getTemplateByName(getTemplateNameByUrl(asPath) as string)
    },
    onSuccess: (data: TemplateData[]) => {
      const { subject, message } = data?.[0]

      emailFields.reset({
        reciever: emailFields.getValues().reciever || [],
        subject: subject || '',
        message: message || ''
      })
    },
    enabled: !!getTemplateNameByUrl(asPath),
    refetchOnWindowFocus: false
  })

  const { mutate: updateTemplateMutate, isLoading: isLoadingUpdateTemplate } = useMutation({
    mutationKey: ['update-template'],
    mutationFn: updateEmailTemplate,
    onSuccess: () => {
      toast.success('Plantilla de email actualizada')
      setSaveTemplate(false)
      queryClient.invalidateQueries(['get-template', getTemplateNameByUrl(asPath)])
    },
    onError: () => {
      toast.error('Error al actualizar la plantilla')
    }
  })

  useEffect(() => {
    if (recipients.length > 0) resetField('reciever', { defaultValue: recipients })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipients])

  return (
    <FormProvider {...emailFields}>
      <Drawer
        open={open}
        anchor='right'
        variant='temporary'
        onClose={handleClose}
        sx={{ '& .MuiDrawer-paper': { width: [300, 400] } }}
        ModalProps={{ keepMounted: true }}
      >
        <form onSubmit={emailFields.handleSubmit(onSubmit)}>
          <Stack spacing={5} padding={5}>
            <Typography variant='h6'>{t('email-request')}</Typography>
            <Controller
              name='reciever'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  disabled={isLoadingSendEmail || isLoadingUpdateTemplate}
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue.slice())
                  }}
                  multiple
                  filterOptions={(options, params) => {
                    const filtered = emailFilter(options as string[], params)
                    const { inputValue } = params
                    // Suggest the creation of a new value
                    const isExisting = options.some(option => inputValue === option)

                    try {
                      yup.string().email().validateSync(inputValue)
                      if (!isExisting && inputValue !== '') filtered.push(inputValue)
                    } catch {}

                    return filtered
                  }}
                  options={options}
                  renderInput={params => (
                    <TextField
                      {...params}
                      error={Boolean(errors.reciever)}
                      helperText={errors.reciever && t('no-emails-selected')}
                      variant='outlined'
                      label={t('to') as string}
                    />
                  )}
                />
              )}
            />
            <ControlledTextField
              name={'subject'}
              label={'subject'}
              disabled={isLoadingSendEmail || isLoadingUpdateTemplate}
            />
            <ControlledTextField
              name={'message'}
              label={'message'}
              multiline
              type={'textarea'}
              rows={10}
              disabled={isLoadingSendEmail || isLoadingUpdateTemplate}
            />
            <Stack direction='row' justifyContent='space-between' gap={4}>
              <Button
                sx={{
                  ...primaryLight,
                  textTransform: 'none'
                }}
                {...getRootProps()}
                disabled={isLoadingSendEmail || isLoadingUpdateTemplate}
                startIcon={<Icon icon='tabler:upload' fontSize='1.25rem' />}
              >
                {t('attach')}
                <input {...getInputProps()} />
              </Button>
              {user?.is_admin && (
                <Stack direction='row' alignItems='center'>
                  <Typography align='center' variant='body1'>
                    {t('save-template')}
                  </Typography>
                  <Switch
                    disabled={isLoadingUpdateTemplate || isLoadingSendEmail}
                    checked={saveTemplate}
                    onChange={() => setSaveTemplate(!saveTemplate)}
                  />
                </Stack>
              )}
            </Stack>
            <Stack sx={{ maxHeight: 200, overflowY: 'scroll' }}>
              {files.map(file => (
                <FileListItem
                  key={file.name}
                  file={file}
                  handleRemoveFile={handleRemoveFile}
                  disabled={isLoadingSendEmail || isLoadingUpdateTemplate}
                />
              ))}
              {storedFileHandling &&
                storedFileHandling.storedFiles.map(storedFile => (
                  <FileListItem
                    disabled={isLoadingSendEmail || isLoadingUpdateTemplate}
                    key={storedFile.name + storedFile.id}
                    file={storedFile}
                    handleRemoveFile={storedFileHandling.removeStoredFile}
                  />
                ))}
            </Stack>
            <div>
              <Button
                variant='contained'
                type='submit'
                sx={{ mr: 4 }}
                disabled={isLoadingSendEmail || isLoadingUpdateTemplate}
                endIcon={
                  (isLoadingSendEmail || isLoadingUpdateTemplate) && <CircularProgress color='secondary' size={16} />
                }
              >
                {t('send')}
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                onClick={handleClose}
                disabled={isLoadingSendEmail || isLoadingUpdateTemplate}
              >
                {t('cancel')}
              </Button>
            </div>
          </Stack>
        </form>
      </Drawer>
    </FormProvider>
  )
})

type EmailDrawerProps = {
  open: boolean
  toggle: () => void
  recipients?: string[]
  storedFileHandling?: {
    storedFiles: FileProp[]
    removeStoredFile: (file: FileProp) => void
  }
}
