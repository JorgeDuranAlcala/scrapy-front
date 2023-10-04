import { useState, useEffect, memo } from 'react'

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
import { EmailSchema } from 'src/schemas'
import Checkbox from '@mui/material/Checkbox'
import { FormControlLabel, Switch } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getTemplateByName } from 'src/services/email-templates'

const emailFilter = createFilterOptions<string>()

type emailData = {
  to: string[]
  subject: string
  message: string
}

const defaultEmail: emailData = {
  to: [],
  subject: '',
  message: ''
}

export const EmailDrawer = memo(({ open, toggle, storedFileHandling, recipients = [] }: EmailDrawerProps) => {
  const { user } = useAuth()

  // ** State
  const [files, setFiles] = useState<FileProp[]>([])
  const [saveTemplate, setSaveTemplate] = useState<boolean>(true)

  // ** Hooks
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
  const { t } = useTranslation()
  const { primaryLight } = useBgColor()
  const [options, setOptions] = useState<string[]>([])

  const handleRemoveFile = useFileRemove({ files, setFiles })

  const onSubmit = (data: typeof defaultEmail) => {
    console.log(data, files)
  }

  useEffect(() => {
    if (recipients.length > 0) resetField('to', { defaultValue: recipients })
  }, [recipients])

  const handleClose = () => {
    toggle()
    setFiles([])
    emailFields.reset()
  }

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
              name='to'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue.slice())
                  }}
                  multiple
                  filterOptions={(options, params) => {
                    const filtered = emailFilter(options, params)
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
                      error={Boolean(errors.to)}
                      helperText={errors.to && t('no-emails-selected')}
                      variant='outlined'
                      label={t('to') as string}
                    />
                  )}
                />
              )}
            />
            <ControlledTextField name={'subject'} label={'subject'} />
            <ControlledTextField name={'message'} label={'message'} multiline type={'textarea'} rows={10} />
            <Stack direction='row' justifyContent='space-between' gap={4}>
              <Button
                sx={{
                  ...primaryLight,
                  textTransform: 'none'
                }}
                {...getRootProps()}
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
                  <Switch checked={saveTemplate} onChange={() => setSaveTemplate(!saveTemplate)} />
                </Stack>
              )}
            </Stack>
            <Stack sx={{ maxHeight: 200, overflowY: 'scroll' }}>
              {files.map(file => (
                <FileListItem key={file.name} file={file} handleRemoveFile={handleRemoveFile} />
              ))}
              {storedFileHandling &&
                storedFileHandling.storedFiles.map(storedFile => (
                  <FileListItem
                    key={storedFile.name}
                    file={storedFile}
                    handleRemoveFile={storedFileHandling.removeStoredFile}
                  />
                ))}
            </Stack>
            <div>
              <Button variant='contained' type='submit' sx={{ mr: 4 }}>
                {t('send')}
              </Button>
              <Button variant='outlined' color='secondary' onClick={handleClose}>
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
