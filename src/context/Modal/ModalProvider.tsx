import ModalContext from "./ModalContext"
import { useDisclosure } from "src/hooks"

const ModalProvider = ({children}: ModalProviderProps) => {
  const modalState = useDisclosure()

  return (
    <ModalContext.Provider value={modalState}>
      {children}
    </ModalContext.Provider>)
}

type ModalProviderProps = {
  children: JSX.Element
}

export default ModalProvider
