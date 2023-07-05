import { createContext } from 'react'
import { useDisclosure } from 'src/hooks'

// Use this context to share the
// state and control from the useDisclosure hook.
// Hook is inside src/hooks/useDisclosure.tsx

const init: ReturnType<typeof useDisclosure> = [
  false,
  {
    open: () => {return},
    close: () => {return}
  }
]

const ModalContext = createContext(init)

export default ModalContext


