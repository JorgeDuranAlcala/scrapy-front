import { useContext } from 'react'
import Switch from "@mui/material/Switch"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from "@mui/material/Tooltip"

import { useTranslation } from 'react-i18next'
import { useFormContext, Controller } from 'react-hook-form'

import { ControlledTextField } from 'src/components/Forms'
import Icon from 'src/@core/components/icon'

import { ModalContext } from 'src/context'

import { PERMISSIONS, allPermissions } from 'src/types'

const defaultPermissions = allPermissions(false)
const selectAll = allPermissions(true)

export const defaultRoleForm = {
  role: '',
  permissions: defaultPermissions
}

export const RoleForm = () => {
  const { t } = useTranslation()
  const {
    control,
    formState: { errors },
    setValue,
    reset,
    watch,
    getValues,
    trigger
  } = useFormContext()

  const handler = useContext(ModalContext)[1]

  const permissions: typeof defaultPermissions = watch('permissions')

  // Checks if some checkboxes are not selected
  const someUnchecked = permissions.some(({ write, read }) => {
    return !write || !read
  })

  const handleClose = () => {
    reset(defaultRoleForm)
    handler.close()
  }

  return (
    <>
      <Box marginY={5}>
        <Box textAlign='center' fontWeight={600}>
          {t('role')}
        </Box>
        <Box textAlign='center' typography='body2'>
          {t('select-role-permissions')}
        </Box>
      </Box>
      <ControlledTextField name='role' label='role' />
      <Grid
        container
        paddingBottom='7px'
        marginTop={5}
        sx={({ palette }) => ({ borderBottom: `1px solid ${palette.divider}` })}
      >
        <Grid item xs={6}>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Box fontWeight={500}>{t('admin-access')}</Box>
            <Tooltip title={t("admin-role-select-all-info")}>
              <IconButton>
                <Icon icon='tabler:info-circle' />
              </IconButton>
            </Tooltip>
          </Stack>
        </Grid>
        <Grid item xs={6} container direction='row'>
          <FormControlLabel
            label={t('select-all')}
            control={
              <Switch
                checked={!someUnchecked}
                onChange={() => {
                  setValue('permissions', someUnchecked ? selectAll : defaultPermissions)
                }}
              />
            }
          />
        </Grid>
      </Grid>
      {PERMISSIONS.map(({ code, label }, i) => (
        <Grid
          container
          key={code}
          alignItems='center'
          paddingY={'7px'}
          sx={({ palette }) => ({ borderBottom: `1px solid ${palette.divider}` })}
        >
          <Grid item xs={6}>
            <Box fontWeight={500}>{t(label)}</Box>
          </Grid>
          <Grid item xs={6}>
            <Stack direction='row' justifyContent='space-between'>
              <FormControlLabel
                label={t('read_permission')}
                control={
                  <Controller
                    name={`permissions[${i}].read`}
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Switch checked={getValues(`permissions[${i}].read`)}
                        onChange={(event) => {
                          onChange(event)
                          if(permissions[i].write)
                            setValue(`permissions[${i}].write`, false)

                          trigger(`permissions[${i}].read`)
                        }}
                      />
                    )}
                  />
                }
              />
              <FormControlLabel
                label={t('write_permission')}
                control={
                  <Controller
                    name={`permissions[${i}].write`}
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Switch
                        disabled={!permissions[i].read}
                        checked={permissions[i].write}
                        onChange={(e) => {
                          onChange(e)
                          trigger(`permissions[${i}]`)
                        }}
                      />
                      )}
                  />
                }
              />
            </Stack>
          </Grid>
          <Divider />
        </Grid>
      ))}
      {
        errors.permissions &&
        <FormControl error={Boolean(errors.permissions)} fullWidth>
          <FormHelperText sx={{textAlign: "center"}}>
            {t(errors.permissions.message as string)}
          </FormHelperText>
        </FormControl>
      }
      <Grid container marginTop={10}>
        <Grid item xs/>
        <Grid item xs={6}>
          <Stack direction="row" spacing={5}>
            <Button type="submit" variant="contained">
              {t('save')}
            </Button>
            <Button  variant="outlined" color="secondary"
              onClick={handleClose}
            >
              {t('cancel')}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}
