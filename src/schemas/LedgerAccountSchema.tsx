import yup from 'src/@core/utils/customized-yup'

const LedgerAccountSchema = yup.object().shape({
  ledgerAccount: yup.string().min(1),
  name: yup.string().min(1),
  accItem: yup.string().min(1),
  relatedAcc: yup.string(),
  amortization: yup.number().min(0).max(100).integer()
})

export default LedgerAccountSchema
