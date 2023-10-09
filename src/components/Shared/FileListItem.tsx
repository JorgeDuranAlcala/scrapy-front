import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import Icon from 'src/@core/components/icon'

export interface FileProp {
  id?: string
  name: string
  type?: string
  size?: number
  downloadLink?: string
}

export const FileListItem = ({ file, handleRemoveFile, disabled }: FileListItemProps) => {
  const renderFilePreview = (file: FileProp) => {
    if (file.type && file.type.startsWith('image'))
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />

    return <Icon icon='tabler:file-description' />
  }

  return (
    <ListItem key={file.name}>
      <Box className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          {file.size && (
            <Typography className='file-size' variant='body2'>
              {Math.round(file.size / 100) / 10 > 1000
                ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
            </Typography>
          )}
        </div>
      </Box>
      <IconButton sx={{ marginLeft: 'auto' }} onClick={() => handleRemoveFile(file)} disabled={disabled}>
        <Icon icon='tabler:x' fontSize={20} />
      </IconButton>
    </ListItem>
  )
}

type FileListItemProps = {
  file: FileProp
  handleRemoveFile: (file: FileProp) => void
  disabled?: boolean
}
