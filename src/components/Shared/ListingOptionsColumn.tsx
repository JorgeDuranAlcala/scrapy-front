import Link from 'next/link'

import Icon from 'src/@core/components/icon'

import { type GridRowParams, GridActionsCellItem } from '@mui/x-data-grid'

import { Counter, ActionButton } from 'src/components/Shared'

type Props = {
  edit?: boolean
  openEmailModal: (id: string) => void
  openCommentsModal: (id: string, comments: string) => void
  listingSite: string
} & Omit<GridRowParams, 'touchRippleRef'>

const ListingOptionColumn = (props: Props) => {
  const {
    edit = true,
    id,
    row: { comments, link, calls, email }
  } = props

  let actions: JSX.Element[] = [
    <GridActionsCellItem
      key={'view'}
      {...{ href: link, target: '_blank' }}
      icon={<Icon width={24} icon='tabler:eye' />}
      label='view'
    />,
    <GridActionsCellItem
      key={'email'}
      icon={<Icon width={24} icon='tabler:mail' />}
      label='email'
      onClick={() => {
        props.openEmailModal(email)
      }}
    />,
    <ActionButton
      key='documents'
      title={'Adjuntar'}
      icon='tabler:paperclip'
      buttonProps={{
        component: Link,
        href: `/listings/${props.listingSite}/documents/${id}`,
        passHref: true,
        sx: { padding: '4px' }
      }}
    />
  ]
  if (edit)
    actions = actions.concat([
      <ActionButton
        key='comments'
        title='Comentarios'
        icon={`tabler:${comments && comments.length > 0 ? 'info-circle-filled' : 'info-circle'}`}
        buttonProps={{
          onClick: () => {
            props.openCommentsModal(id as string, comments)
          },
          sx: { padding: '4px' }
        }}
      />,
      <Counter key='counter' value={calls} id={id} />
    ])

  return actions
}

export default ListingOptionColumn
