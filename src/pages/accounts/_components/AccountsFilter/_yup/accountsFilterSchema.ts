import yup from 'src/@core/utils/customized-yup'
import { accountsconditionArr, accountsfieldsFilter } from '../_const'

const accountsFilterSchema = yup.object().shape({
  field: yup.string().oneOf(accountsfieldsFilter),
  condition: yup.string().oneOf(accountsconditionArr),
  input: yup.string().required()
})

export default accountsFilterSchema
