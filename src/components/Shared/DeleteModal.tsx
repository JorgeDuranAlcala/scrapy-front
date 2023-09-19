import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Stack from "@mui/material/Stack"

import Icon from "src/@core/components/icon"
import { useTranslation } from "react-i18next"

const modalBodyStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 10
}

const DeleteModal = ({handleDelete, modalOpen, close, name, gender, count, disable=false}: DeleteModalProps) => {
  const { t } = useTranslation()

  const translation = t('delete-confirmation_context',{ name, gender, count} )
  const capitalizedText = translation.slice(0,2) + translation.slice(2).toLowerCase()

  return (
    <Modal open={modalOpen} onClose={close}>
      <Box sx={modalBodyStyle}>
        <Stack spacing={5} alignItems='center'>
          <Box color='warning.main'>
            <Icon icon='tabler:alert-circle' width={150} />
          </Box>
          <Box textAlign={'center'} color={'body'}>{capitalizedText}</Box>
          <Stack direction='row' spacing={5}>
            <Button onClick={handleDelete} sx={{ width: 100 }} variant='contained' disabled={disable}>
              {t('yes')}
            </Button>
            <Button variant='outlined' sx={{ width: 100 }} onClick={close} disabled={disable}>
              {t('cancel')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}

type DeleteModalProps = {
  modalOpen: boolean
  close: () => void
  name: string
  gender: string // Used for spanish translations
  count?: number
  handleDelete?: () => void
  disable?: boolean
}

export default DeleteModal
