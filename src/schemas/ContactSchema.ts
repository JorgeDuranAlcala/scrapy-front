import yup from 'src/@core/utils/customized-yup'

const phoneRegex = /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/
const NOTIFICATION_OPTIONS = ['yes', 'no']

const contactSchema = yup.object().shape({
  nameAndLastName: yup.string().required(),
  DNI: yup.string(),
  phone: yup.string().required().matches(phoneRegex),
  email: yup.string().email(),
  jobTitle: yup.string(),

  // Remember to change this with the select field you are provided
  emailNotifications: yup
    .array()
    .of(yup.string().ensure())
    .compact(element => NOTIFICATION_OPTIONS.includes(element))
})

export default contactSchema
