import { AbilityBuilder, PureAbility } from '@casl/ability'


export type Subjects = string
export type Actions = 'manage' | 'write' | 'read'


export type AppAbility = PureAbility<[Actions, Subjects]>
export const AppAbility = PureAbility as any

export type ACLObj = {
  action: Actions
  subject: string
}

const defineRulesFor = (role: string) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  switch (role) {
    case "admin": {
      can('see', 'history')
      break
    }
    case "normal":{}
  }

  return rules
}

export const buildAbilityFor = (role: string): AppAbility => {
  return new AppAbility(defineRulesFor(role), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
