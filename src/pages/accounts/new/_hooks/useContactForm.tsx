// ** React Imports
import { useState } from 'react'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

// ** Custom Components Imports
import {
  defaultOtherAddrForm,
  type OtherAddrData
} from 'src/components'

import { OtherAddrSchema } from 'src/schemas'

export const useContactForm = () => {
  const [addresses, setAddresses] = useState<OtherAddrData[]>([])
  const [editAddress, setEditAddress] = useState<number | undefined>(undefined)

  const otherAddrForm = useForm({
    defaultValues: defaultOtherAddrForm,
    mode: 'onBlur',
    resolver: yupResolver(OtherAddrSchema)
  })

  const noDuplicatedAdresses = (address: OtherAddrData) => {
    const address1 = Object.keys(address)
    const repeated = addresses.find(savedAddress => {
      const address2 = Object.keys(savedAddress)
      if (address1.length !== address2.length) return false

      const repeatedKeys = address1.reduce((total, key) => {
        const typedKey = key as keyof typeof defaultOtherAddrForm
        if (typeof address[typedKey] === 'object') return total + 1

        return address[typedKey] === savedAddress[typedKey] ? total + 1 : total
      }, 0)

      if (repeatedKeys !== address1.length) return false

      return true
    })

    if (!repeated) return true

    toast.error('Ya existe una dirección con los datos proporcionados')

    return false
  }

  const newAddress = () => {
    otherAddrForm.handleSubmit((data: OtherAddrData) => {
      if (noDuplicatedAdresses(data)) {
        const addressArr = addresses.slice()
        const currentAddr = Object.assign({}, data)
        addressArr.push(currentAddr)
        setAddresses(addressArr)
        toast.success('Información guardada correctamente')
        otherAddrForm.reset(defaultOtherAddrForm)
      }
    })()
  }

  const handleAddressEdit = (index?: number) => {
    setEditAddress(index)

    if(index)
      otherAddrForm.reset(addresses[index])
  }

  const saveAddressChanges = () => {
    otherAddrForm.handleSubmit((edited: OtherAddrData) => {
      if (noDuplicatedAdresses(edited)) {
        const addressArr = addresses.slice()
        const currentAddr = Object.assign({}, edited)
        addressArr[editAddress as number] = currentAddr
        setAddresses(addressArr)
        toast.success('Información editada correctamente')
        setEditAddress(undefined)
        otherAddrForm.reset(defaultOtherAddrForm)
      }
    })()
  }

  return {
    addresses,
    editAddress,
    otherAddrForm,
    functions: {
      newAddress,
      noDuplicatedAdresses,
      handleAddressEdit,
      saveAddressChanges,
    }
  }
}
