import { memo, useEffect, useState } from 'react'

import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import Icon from 'src/@core/components/icon'
import { useDebouncedState } from 'src/hooks'

import { updateCalls } from 'src/services'

type CounterProps = {
  value: number
  id: number | string
}

export const Counter = memo(({ value, id }: CounterProps) => {
  const [calls, setCalls] = useState(value)
  const [count, debouncedCount, setCount] = useDebouncedState(0)

  const callsUpdate = useMutation({
    mutationKey: ['update-calls'],
    mutationFn: updateCalls,
    onSuccess: () => {
      toast.success('Datos actualizados')
      setCalls(count + calls)
      setCount(0)
    },
    onError: (e) => {
      toast.error('Error al actualizar los datos')
      setCount(0)
    }
  })

  const handleCount = (option: string) => {
    const number = option == 'add' ? 1 : -1

    if (calls + count + number <= 9 && calls + count + number >= 0)
      setCount(count + number)
  }

  useEffect(() => {
    if(count != 0)
      callsUpdate.mutate({post_id: id, calls: debouncedCount})
  }, [debouncedCount])

  return (
    <ButtonGroup size='small' sx={{ maxHeight: '20px' }}>
      <Badge
        badgeContent={count + calls}
        color='primary'
        max={9}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Button
          aria-label='reduce'
          sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          onClick={() => handleCount('minus')}
        >
          <Icon icon='tabler:minus' fontSize={15} />
        </Button>
      </Badge>
      <Button
        aria-label='increase'
        sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        onClick={() => handleCount('add')}
      >
        <Icon icon='tabler:plus' fontSize={15} />
      </Button>
    </ButtonGroup>
  )
})
