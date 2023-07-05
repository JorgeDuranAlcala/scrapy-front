export type AccountsAdvancedFilterQuery = {
  field: (typeof fieldsFilterType)[number]
  condition: (typeof conditionType)[number]
  input: string
}
