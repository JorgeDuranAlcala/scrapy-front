// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import useNavigationRouting from '../routing'

const useNavigation = (): VerticalNavItemsType => {
  return useNavigationRouting()
}

export default useNavigation
