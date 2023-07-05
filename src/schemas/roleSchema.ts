import yup from 'src/@core/utils/customized-yup'

const permissionSchema = yup.object().shape({
  code: yup.string().required(),
  write: yup.boolean().default(false),
  read: yup.boolean().default(false)
})

const roleSchema = yup.object().shape({
  role: yup.string().min(1),
  permissions: yup.array().of(permissionSchema).length(8).test(
    'selected-permissions',
    'form-error.no-permissions-selected',
    (data) => Boolean(data && data.some(({write, read}) => write || read))
  )
})

export default roleSchema
