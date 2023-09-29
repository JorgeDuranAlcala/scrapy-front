import Link from 'next/link'

import Icon from 'src/@core/components/icon'

import { type GridRowParams, GridActionsCellItem } from '@mui/x-data-grid'

import { Counter, ActionButton } from 'src/components/Shared'

type Props = {
  openEmailModal: (id: string) => void
  openCommentsModal: (id: string, comments: string) => void
  listingSite: string
} & Omit<GridRowParams, 'touchRippleRef'>

const ListingOptionColumn = (props: Props) => {
  const {
    id,
    row: { comments, link, calls, email }
  } = props

  return [
    <GridActionsCellItem key={'view'} {...{href: link}}
      icon={
        <Icon width={24} icon='tabler:eye'/>
      }
    label='view'
    />,
    <GridActionsCellItem key={'email'} icon={<Icon width={24} icon='tabler:mail'/>} label='email'
      onClick={()=> {props.openEmailModal(email)}}
    />,
    <ActionButton key='documents'
    title={'Adjuntar'}
    icon='tabler:paperclip'
    buttonProps={{
      component: Link,
      href: `/listings/${props.listingSite}/documents/${id}`,
      passHref: true,
      sx: { padding: '4px' }
    }}
    />,
    <ActionButton key='comments'
    title='Comentarios'
    icon={`tabler:${comments && comments.length > 0 ? 'info-circle-filled' : 'info-circle'}`}
    buttonProps={{
      onClick: () => {
        props.openCommentsModal(id as string, comments)
      },
      sx: { padding: '4px' }
    }}
    />,
    <Counter key='counter' value={calls} id={id}/>
  ]
}

export default ListingOptionColumn
