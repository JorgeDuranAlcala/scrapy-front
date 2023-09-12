import { memo } from 'react'

import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

import Icon from 'src/@core/components/icon'
import { useDebouncedState } from 'src/hooks'

type CounterProps = {
  value: number
}

export const Counter = memo(({ value }: CounterProps) => {
  const [count, debouncedCount, setCount] = useDebouncedState(0)

  const handleCount = (option: string) => {
    const number = option == 'add' ? 1 : -1

    if (value + count + number <= 9 && value + count + number >= 0)
      setCount(count + number)
  }

  return (
    <ButtonGroup size='small' sx={{ maxHeight: '20px' }}>
      <Badge
        badgeContent={count + value}
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
