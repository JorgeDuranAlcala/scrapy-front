import { Dispatch, SetStateAction, memo } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from "@mui/material/Button"
import Typography from '@mui/material/Typography'
import List from "@mui/material/List"

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

import Icon from "src/@core/components/icon"
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

import { useFileRemove } from 'src/hooks'

import { FileListItem, FileProp } from './FileListItem'

const FileUploader = ({files, setFiles, submit}: Props) => {
  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles)
    },
  })

  const handleFileRemove = useFileRemove({files, setFiles})

  const removeAllFiles = () => { setFiles([])}

  const fileList = files.map((file: FileProp) => {
    return <FileListItem key={file.name + (file.id || '') + file.size}
      file={file}
      handleRemoveFile={handleFileRemove}/>
  })

  return (
    <DropzoneWrapper>
      <Box {...getRootProps({ className: 'dropzone' })} sx={{ height: 300 }}>
        <input {...getInputProps()} />
          <Box sx={{
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                mb: 8.75,
                width: 48,
                height: 48,
                display: 'flex',
                borderRadius: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.08)`
              }}
            >
              <Icon icon='tabler:upload' fontSize='1.75rem' />
            </Box>
            <Typography variant='h5' sx={{ mb: 2.5 }}>
                Arrastra los archivos o haz click en el recuadro para subir archivos
            </Typography>
          </Box>
      </Box>
      <List sx={{maxHeight: "200px", overflowY: files.length > 2 ? 'scroll': ''}}>
        {fileList}
      </List>
      {files.length ? (
        <>
          <div className='buttons'>
            <Button color='error' variant='outlined' onClick={removeAllFiles}>
              Quitar todo
            </Button>
            <Button variant='contained' onClick={submit}>Subir</Button>
          </div>
        </>
      ) : null}
    </DropzoneWrapper>
  )
}

type Props = {
  files: FileProp[],
  setFiles: Dispatch<SetStateAction<FileProp[]>>,
  submit: () => void
}

export default memo(FileUploader)
