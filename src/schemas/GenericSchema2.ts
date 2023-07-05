import yup from 'src/@core/utils/customized-yup'

const GenericSchema2 = yup.object().shape({
  daysOpened: yup.array().of(yup.number()).ensure(),
  hours: yup.string().ensure()
})

export default GenericSchema2
