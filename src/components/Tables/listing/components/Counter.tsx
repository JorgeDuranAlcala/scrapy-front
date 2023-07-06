import { useState, useEffect, memo} from 'react'

import Badge from "@mui/material/Badge"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"

import Icon from 'src/@core/components/icon'

type CounterProps = {
  value: number
}

export const Counter = memo(({value}: CounterProps) => {
  const [count, setCount] = useState<number>(value)
  const [savedCount, setSavedCount] =useState(value)

  const submitTimeout = setTimeout(() => {
    if(count !== savedCount){
      console.log('submit data', count)
      setSavedCount(count)
    }
  }, 1000)

  const handleCount = (option: string) => {
    const number = option == 'add'
      ? Math.min(count + 1, 9)
      : Math.max(count - 1, 0)

    setCount(number)

    if(number !== count) clearTimeout(submitTimeout)
  }

  return (
    <ButtonGroup size='small' sx={{maxHeight: "20px"}}>
      <Badge badgeContent={count} color='primary' max={9}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
        <Button aria-label='reduce'
          sx={{borderTopRightRadius: 0, borderBottomRightRadius: 0}}
          onClick={() => handleCount('minus')}
        >
          <Icon icon='tabler:minus' fontSize={15} />
        </Button>
      </Badge>
      <Button aria-label='increase'
          sx={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
          onClick={() => handleCount('add')}
        >
        <Icon icon='tabler:plus' fontSize={15} />
      </Button>
  </ButtonGroup>
  )
})
