import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Stack from '@mui/material/Stack'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'

import { useTranslation } from 'react-i18next'
import yup from 'src/@core/utils/customized-yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// * Custom components
import { UserSettingsTabs } from "src/components/Navbars"

const unchecked = { browser: false, email: false }

const defaultNotificationsForm = {
  notifications: [
    { type: 'test1', ...unchecked },
    { type: 'test2', ...unchecked },
    { type: 'test3', ...unchecked },
    { type: 'test4', ...unchecked }
  ]
}

const CheckBoxSchema = yup.object({
  type: yup.string(),
  browser: yup.boolean(),
  email: yup.boolean()
})

const notificationsSchema = yup.object().shape({
  notifications: yup.array().of(CheckBoxSchema).length(4)
})

const Notifications = () => {
  const { t } = useTranslation()

  const { handleSubmit, control, reset, getValues } = useForm({
    defaultValues: defaultNotificationsForm,
    mode: 'onBlur',
    resolver: yupResolver(notificationsSchema)
  })

  const checkboxes = getValues('notifications')

  const onSubmit = (data: typeof defaultNotificationsForm) => {
    console.log(data)
  }

  return (
    <Stack spacing={5}>
      <UserSettingsTabs/>
      <Card>
        <CardHeader
          title={t('notifications')}
          titleTypographyProps={{ sx: { mb: 1 } }}
          subheader={
            <Typography sx={{ color: 'text.secondary' }}>
              {t('notifications-disclaimer')}
            </Typography>
          }
        />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TableContainer
              sx={{ borderRadius: '6px !important', border: theme => `1px solid ${theme.palette.divider}` }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: '80%' }}>{t('type')}</TableCell>
                    <TableCell align='center'>{t('email')}</TableCell>
                    <TableCell align='center'>{t('browser')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    '& .MuiTableRow-root:last-child .MuiTableCell-root': { borderBottom: 0 },
                    '& .MuiTableRow-root:nth-of-type(odd)': { backgroundColor: 'action.hover' }
                  }}
                >
                  {checkboxes.map((row, i) => (
                    <TableRow key={row.type}>
                      <TableCell sx={{ py: '0 !important' }}>
                        <Typography sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>{row.type}</Typography>
                      </TableCell>
                      <TableCell align='center' sx={{ py: '0 !important' }}>
                        <Controller
                          name={`notifications.${i}.email`}
                          control={control}
                          render={({ field: { value, onChange } }) => <Checkbox checked={value} onChange={onChange} />}
                        />
                      </TableCell>
                      <TableCell align='center' sx={{ py: '0 !important' }}>
                        <Controller
                          name={`notifications.${i}.browser`}
                          control={control}
                          render={({ field: { value, onChange } }) => <Checkbox checked={value} onChange={onChange} />}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack direction='row' spacing={5} mt={5}>
              <Button variant='contained' type='submit'>
                {t('save')}
              </Button>
              <Button variant='outlined' color='secondary' onClick={() => reset()}>
                {t('discard-changes')}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
  </Stack>
  )
}

Notifications.acl = {
  action: 'update',
  subject: 'personal-account'
}

export default Notifications
