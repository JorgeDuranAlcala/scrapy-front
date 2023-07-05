const accountsConditionType = [
  'contains',
  'exclude',
  'equal',
  'different',
  'empty',
  'notEmpty',
  'startsBy',
  'endsIn'
] as const

const accountsconditionArr: string[] = accountsConditionType as unknown as string[]

export default accountsconditionArr
