import { Dispatch, SetStateAction } from 'react'
import { FileProp } from "src/components"

type useFileRemoveProps = {
  files: FileProp[]
  setFiles: Dispatch<SetStateAction<FileProp[] | File[]>>
}

const useFileRemove = ({files, setFiles}: useFileRemoveProps) =>{
  return (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setFiles([...filtered])
  }
}

export default useFileRemove
