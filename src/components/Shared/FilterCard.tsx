import Button from '@mui/material/Button'

type CardProps = {
  contactFilter: string | undefined
  value: string
  children: JSX.Element
}

const FilterCard = ({children, value, contactFilter}: CardProps) => {

  const bordered = contactFilter === value ? { borderWidth: '2px', borderStyle: 'solid' } : { padding: '2px' }

  return (
    <Button sx={{ padding: 0, width: '100%', ...bordered }}>
      {children}
    </Button>
  )
}

export default FilterCard
