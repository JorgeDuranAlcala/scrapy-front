import yup from 'src/@core/utils/customized-yup'

const AccountTypeSchema = yup.object().shape({
  clientType: yup.string().oneOf([ 'business-client', 'particular-client', ''])
    .when('providerType', (providerType, schema) => {
      return schema.test(
        'is-error',
        'form-error.empty-select_other',
        (clientType: string) => clientType.length > 0 || providerType.length > 0
      )
    }),
  providerType: yup.string().optional().oneOf(['provider', '']).ensure()
})


export default AccountTypeSchema
