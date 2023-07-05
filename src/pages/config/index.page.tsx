// ** React Imports
import { useState, ChangeEvent, FormEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'

import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom hooks
import useBgColor from 'src/@core/hooks/useBgColor'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 300,
  height: 'auto',
  marginRight: theme.spacing(6),
  borderRadius: theme.shape.borderRadius
}))

const EditEmployee = () => {
  const { t } = useTranslation()
  const { primaryLight } = useBgColor()

  // ** State
  const [inputValue, setInputValue] = useState('')
  const [imgSrc, setImgSrc] = useState('')

  const handleInputImageChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setInputValue(reader.result as string)
      }
    }
  }
  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("submit")
  }

  return(
  <Card>
    <CardHeader title={t('logo-config')} />
    <form onSubmit={handleSubmit}>
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ display: 'flex', gap: 5 }}>
          {imgSrc !== '' ? (
            <ImgStyled src={imgSrc} alt='Profile Pic' />
          ) : (
            <Stack
              justifyContent='center'
              alignItems='center'
              width={300}
              height={100}
              marginRight={6}
              borderRadius='6px'
              sx={primaryLight}
            >
              <Icon icon='tabler:user' width={80} />
            </Stack>
          )}
          <div>
          <Stack direction="row" spacing={5}>
            <Button component='label' variant='contained' htmlFor='banner-upload-image'>
              {t('upload_context', { context: 'photo' })}
              <input
                hidden
                type='file'
                value={inputValue}
                accept='image/png, image/jpeg'
                onChange={handleInputImageChange}
                id='banner-upload-image'
              />
            </Button>
            <Button color='secondary' variant='outlined' onClick={handleInputImageReset}>
              {t('reset')}
            </Button>
            { imgSrc !== '' &&
              <Button type="submit" variant='contained'>
                {t('save-changes')}
              </Button>
            }
          </Stack>
            <Typography sx={{ mt: 4, color: 'text.disabled' }}>{t('image-upload-restrictions')}</Typography>
          </div>
        </Box>
      </CardContent>
    </form>
  </Card>
)}

EditEmployee.acl = {
  action: 'update',
  subject: 'tenant-settings'
}

export default EditEmployee
