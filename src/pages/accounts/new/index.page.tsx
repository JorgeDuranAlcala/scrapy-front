// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Step from '@mui/material/Step'
import Stepper from '@mui/material/Stepper'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

// ** Hooks
import { useContactForm } from './_hooks/useContactForm'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import {
  BankForm,
  CardForm,
  AccountTypeSelect,
  ParticularForm,
  CompanyForm,
  ContactForm,
  OtherAdressesForm,
  clientSchema,
  companySchema,
  Representative,
  defaultBankForm,
  defaultParticularForm,
  defaultCardForm,
  defaultCompanyForm,
  defaultContactForm,
  defaultOtherAddrForm,
  type CardData,
  type BankFormData,
  type CompanyFormData,
  type ContactsFormData,
  type OtherAddrData
} from 'src/components/Forms'
import { CollapsibleTable } from 'src/components/Tables'

import { BankSchema, CardSchema, ContactSchema } from 'src/schemas'
// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { CNAEinfo, type cnaeInfo } from 'src/@core/utils/readExcel'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'

import stackTheme from 'src/@core/styles/stackTheme'

const steps = [
  {
    icon: 'tabler:number-1',
    title: 'tax-data',
    subtitle: 'subtitle.tax-data'
  },
  {
    icon: 'tabler:number-2',
    title: 'other-addresses',
    subtitle: 'subtitle.other-addresses'
  },
  {
    icon: 'tabler:number-3',
    title: 'payment-method',
    subtitle: 'subtitle.payment-method'
  },
  {
    icon: 'tabler:number-4',
    title: 'contact-data',
    subtitle: 'subtitle.contact-data'
  }
]

const New = ({ cnae }: props) => {
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = useState<number>(0)
  const [method, setMethod] = useState<'bank' | 'card'>('bank')

  // Tax Data Form ---------------------------

  const companyForm = useForm({
    defaultValues: defaultCompanyForm,
    mode: 'onBlur',
    resolver: yupResolver(companySchema)
  })

  const particularForm = useForm({
    defaultValues: defaultParticularForm,
    mode: 'onBlur',
    resolver: yupResolver(clientSchema)
  })

  const clientType = companyForm.watch('clientType')
  const isParticular = clientType === 'particular-client'

  const represents = companyForm.watch('represents')

  useEffect(() => {
    particularForm.setValue('represents', represents)
  }, [represents])

  //-------------------------------------------

  // Other Addesses form ----------------------

  const {
    otherAddrForm,
    addresses,
    editAddress,
    functions: { newAddress, noDuplicatedAdresses, handleAddressEdit, saveAddressChanges }
  } = useContactForm()

  //-------------------------------------------

  // Payment Form ----------------------------

  const cardForm = useForm({
    defaultValues: defaultCardForm,
    mode: 'onBlur',
    resolver: yupResolver(CardSchema)
  })

  const bankForm = useForm({
    defaultValues: defaultBankForm,
    mode: 'onBlur',
    resolver: yupResolver(BankSchema)
  })

  // -----------------------------------------

  // Contact Form ----------------------------

  const contactForm = useForm({
    defaultValues: defaultContactForm,
    mode: 'onBlur',
    resolver: yupResolver(ContactSchema)
  })

  // ------------------------------------------

  const nextStep = () => setActiveStep(activeStep + 1)

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }

    switch (activeStep) {
      case 0: {
        if (!isParticular)
          companyForm.handleSubmit((data: CompanyFormData) => {
            console.log(data, 'not particular')
            nextStep()
          })()
        else
          particularForm.handleSubmit(data => {
            console.log(data, 'particular')
            nextStep()
          })()
        break
      }
      case 1: {
        if (addresses.length > 0 && !otherAddrForm.formState.isDirty) nextStep()
        else
          otherAddrForm.handleSubmit((data: OtherAddrData) => {
            if (noDuplicatedAdresses(data)) {
              console.log(addresses.concat(data))
              nextStep()
            }
          })()

        break
      }
      case 2: {
        if (method === 'card')
          cardForm.handleSubmit((data: CardData) => {
            console.log(data)
            nextStep()
          })()
        else
          bankForm.handleSubmit((data: BankFormData) => {
            console.log(data)
            nextStep()
          })()

        break
      }
      case 3: {
        contactForm.handleSubmit((data: ContactsFormData) => {
          console.log(data)
        })
      }
    }
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <ThemeProvider theme={stackTheme}>
           <FormProvider {...companyForm}>
                <Stack mb={5}
                  justifyContent={{sm:"center", md: "space-between"}}
                  alignItems={{sm:"center", md: "start"}}
                >
                  <AccountTypeSelect />
                  <Representative/>
                </Stack>
                { !isParticular && <CompanyForm cnae={cnae} /> }
              </FormProvider>
              <FormProvider {...particularForm}>
                { isParticular && <ParticularForm /> }
              </FormProvider>
        </ThemeProvider>

        )
      case 1:
        return (
          <FormProvider {...otherAddrForm}>
            {addresses.length > 0 && <CollapsibleTable setEdit={handleAddressEdit} rows={addresses} />}
            <OtherAdressesForm />

            <Stack mt={5} direction='row' justifyContent='space-between'>
              {typeof editAddress !== 'number' ? (
                <Button onClick={newAddress} variant='contained' startIcon={<Icon icon='tabler:plus' />}>
                  {t('add-more')}
                </Button>
              ) : (
                <Stack direction={'row'} spacing={5}>
                  <Button disabled={!otherAddrForm.formState.isDirty} onClick={saveAddressChanges} variant='contained'>
                    {t('save-changes')}
                  </Button>
                  <Button
                    onClick={() => {
                      handleAddressEdit()
                      otherAddrForm.reset(defaultOtherAddrForm)
                    }}
                    variant='contained'
                    color='error'
                  >
                    {t('cancel')}
                  </Button>
                </Stack>
              )}
              {otherAddrForm.formState.isDirty && editAddress === undefined && addresses.length > 0 && (
                <Button size='large' type='submit' color='info' variant='contained' onClick={nextStep}>
                  {t('no-save-current-address')}
                </Button>
              )}
            </Stack>
          </FormProvider>
        )
      case 2:
        return (
          <Stack direction='row'>
            <FormControl fullWidth>
              <InputLabel id='city-label'>{t('payment-method')}</InputLabel>
              <Select
                id='cardOrBank'
                value={method}
                labelId='cardOrBank-label'
                label='Metodo de pago'
                onChange={event => setMethod(event.target.value as 'bank' | 'card')}
              >
                <MenuItem value='bank'>{t('bank')}</MenuItem>
                <MenuItem value='card'>{t('card')}</MenuItem>
              </Select>
            </FormControl>
            {method === 'bank' ? (
              <FormProvider {...bankForm}>
                <BankForm />
              </FormProvider>
            ) : (
              <FormProvider {...cardForm}>
                <CardForm />
              </FormProvider>
            )}
          </Stack>
        )
      case 3:
        return (
          <Stack direction='column'>
            <ContactForm errors={contactForm.formState.errors} control={contactForm.control} />
          </Stack>
        )
      default:
        return 'Unknown Step'
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <>
          <Typography>{t('steps-completed')}</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained' onClick={() => setActiveStep(0)}>
              {t('reset')}
            </Button>
          </Box>
        </>
      )
    } else {
      return (
        <form
          onSubmit={e => {
            e.preventDefault()
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {t(steps[activeStep].title)}
              </Typography>
              <Typography variant='caption' component='p'>
                {t(steps[activeStep].subtitle)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box width={'100%'}>
                <ThemeProvider theme={stackTheme}>{getStepContent(activeStep)}</ThemeProvider>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                size='large'
                variant='outlined'
                color='secondary'
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                {t('back')}
              </Button>
              <Button size='large' type='submit' variant='contained' onClick={handleNext}>
                {t(activeStep === steps.length - 1 ? 'submit' : 'next')}
              </Button>
            </Grid>
          </Grid>
        </form>
      )
    }
  }

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep} connector={<Icon icon='tabler:chevron-right' />}>
            {steps.map((step, index) => {
              const RenderAvatar = activeStep >= index ? CustomAvatar : Avatar

              return (
                <Step key={index}>
                  <div className='step-label'>
                    <RenderAvatar
                      variant='rounded'
                      {...(activeStep >= index && { skin: 'light' })}
                      {...(activeStep === index && { skin: 'filled' })}
                      {...(activeStep >= index && { color: 'primary' })}
                      sx={{
                        ...(activeStep === index && { boxShadow: theme => theme.shadows[3] }),
                        ...(activeStep > index && { color: theme => hexToRGBA(theme.palette.primary.main, 0.4) })
                      }}
                    >
                      <Icon icon={step.icon} />
                    </RenderAvatar>
                    <div>
                      <Typography className='step-title'>{t(step.title)}</Typography>
                      <Typography className='step-subtitle'>{t(step.subtitle)}</Typography>
                    </div>
                  </div>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>
      <Divider sx={{ m: '0 !important' }} />
      <CardContent>{renderContent()}</CardContent>
    </Card>
  )
}

export const getServerSideProps = () => {
  const cnaeCodes = CNAEinfo() as cnaeInfo[]
  const cnae = cnaeCodes.filter(({ CODINTEGR }) => CODINTEGR.length > 1)

  return {
    props: { cnae }
  }
}

type props = {
  cnae: cnaeInfo[]
}

New.acl = {
  action: 'write',
  subject: 'accounts'
}

export default New
