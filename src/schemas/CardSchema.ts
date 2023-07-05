import yup from "src/@core/utils/customized-yup"
import card from 'card-validator'

export const CardSchema = yup.object().shape({
  name: yup.string().min(0),
  number: yup.string().test('valid-number', 'invalid-card-number', number => card.number(number).isValid),
  expDate: yup.string().test('valid-date', 'invalid-card-date', date => card.expirationDate(date).isValid),
  cvv: yup.string().test('valid-cvv', 'invalid-cvv', cvv => card.cvv(cvv).isValid)
})
