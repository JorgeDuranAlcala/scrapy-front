import Link from 'next/link'

import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import { GridColDef} from '@mui/x-data-grid'

import { ActionButton } from 'src/components/Shared'

type optionActions = {
  openDeleteModal: (id: string) => void
  openCommentsModal: (comments: string) => (id: string) => void
}

const useColumns = ({openCommentsModal, openDeleteModal}: optionActions): GridColDef[] => {
  const { t } = useTranslation()

  return [
    {
      field: 'companyName',
      headerName: t('business-name') as string,
      filterable: false,
      width: 250,
    },
    {
      field: 'NIF',
      headerName: 'NIF',
      filterable: false,
      width: 200,
    },
    {
      field: 'address',
      headerName: t('address') as string,
      filterable: false,
      width: 300
    },
    {
      field: 'city',
      headerName: t('city') as string,
      filterable: false,
      width: 200
    },
    {
      field: 'status',
      headerName: t('status') as string,
      filterable: false,
      width: 150
    },
    {
      field: 'options',
      headerName: t('options') as string,
      width: 220,
      filterable: false,
      sortable: false,
      renderCell: ({row: { comments }}) =>
      <Stack justifyContent='start' direction='row' spacing={0.25}>
        <ActionButton title={t('see')} icon='tabler:eye'
          buttonProps={{
            component: Link,
            href: '/accounts/tax-data',
            passHref: true
        }}
        />
        <ActionButton title={t('delete')} icon='tabler:trash'
          buttonProps={{onClick: () => {openDeleteModal('id') }}}
        />
        <ActionButton title={t('send-email')} icon='tabler:mail'
          buttonProps={{onClick: () => {console.log('mail') }}}
        />
        <ActionButton title={t('comments')}
          icon={`majesticons:${comments.length === 0 ? 'comment-text-line' : 'comment-text'}`}
          buttonProps={{onClick: () => {openCommentsModal(comments)('id') }}}
        />
      </Stack>
    }
  ]
}

export default useColumns
