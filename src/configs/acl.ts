import { AbilityBuilder, PureAbility } from '@casl/ability'
import type { Permissions } from 'src/types'
import { allPermissions } from 'src/types'

export type Subjects = string
export type Actions = 'manage' | 'write' | 'read'


export type AppAbility = PureAbility<[Actions, Subjects]>
export const AppAbility = PureAbility as any

export type ACLObj = {
  action: Actions
  subject: string
}

const defineRulesFor = (role: string, permissions: Permissions) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  const applyPermissions = (permissionArr: Permissions) => {
    permissionArr.forEach(({read, write, code}) => {
      read && can('read', code)
      write && can('write', code)
    })
  }

  applyPermissions(permissions)

  switch (role) {
    case "superAdmin": {
      can('read', 'tenant-system')
      can('write', 'tenant-system')
      can('update', 'account-security')
      can('switch', 'tenant')
      can('update', 'tenant-settings')
      break
    }
    case "admin": {
      applyPermissions(allPermissions(true))
      can('update', 'personal-account')
      can('update', 'account-security')
      can('update', 'tenant-settings')
      can('get', 'help')
      break
    }
    case "gestor":{
      can('update', 'account-security')
      can('switch', 'tenant')
      break
    }
    case "normal": {
      can('update', 'personal-account')
      can('update', 'account-security')
      can('get', 'help')
      break
    }
  }

  return rules
}

export const buildAbilityFor = (role: string, permissions: Permissions): AppAbility => {
  return new AppAbility(defineRulesFor(role, permissions), {
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
