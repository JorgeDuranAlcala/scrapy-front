import { useContext } from 'react'

import { AbilityContext } from 'src/layouts/components/acl/Can'

import toast from 'react-hot-toast'

import { useTranslation } from 'react-i18next'

// Hook returns a function that accepts another function as
// its argument. Said argument function, will be run if the current
// user has the required permissions specified in the hook's arguments.
// Otherwise, a toast indicating the lack of permissions will be displayed

const useProtectedAction= (action: string, subject: string) => {
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()

  return (funct: any, successMsg?: string, errorMsg?: string) => {
    const defaultErrMsg = 'permission-error'
    const defaultSuccessMsg= 'successful-action'

    if(ability?.can(action, subject)){
      funct()
      toast.success(t(successMsg || defaultSuccessMsg) )
    }
    else
      toast.error(t(errorMsg || defaultErrMsg))
  }
}

export default useProtectedAction
