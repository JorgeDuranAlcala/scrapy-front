import { useState } from "react";

const useDisclosure = () => {
  const [opened, setOpen] = useState(false)

  const open = () => { setOpen(true)}
  const close = () => { setOpen(false)}

  return [
    opened,
    { open, close }
  ] as const
}

export default useDisclosure
