const accountsFieldsFilterType = [
  'businessName',
  'NIF',
  'address',
  'city',
  'email',
  'phone',
  'status',
  'tags',
  'commercialName'
] as const

const accountsfieldsFilter: string[] = accountsFieldsFilterType as unknown as string[]

export default accountsfieldsFilter