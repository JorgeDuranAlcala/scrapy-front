import * as yup from 'yup'

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const PHONE_REGEX = /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/

yup.setLocale({
  string: {
    min: 'form-error.empty'
  }
})

yup.addMethod(yup.string, 'emailOrEmpty', function validateEmail() {
  return this.matches(EMAIL_REGEX, {
    message: 'invalid-email',
    name: 'emailOrEmpty',
    excludeEmptyString: true,
  });
});

yup.addMethod(yup.string, 'phoneOrEmpty', function validatePhone() {
  return this.matches(PHONE_REGEX, {
    message: 'invalid-phone',
    name: 'phoneOrEmpty',
    excludeEmptyString: true,
  })
})

declare module 'yup' {
  interface StringSchema {
    emailOrEmpty(): yup.StringSchema
    phoneOrEmpty(): yup.StringSchema
  }
}

export default yup
