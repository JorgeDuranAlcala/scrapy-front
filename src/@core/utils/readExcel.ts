import path from 'path'
import { readFile, utils, read } from 'xlsx';


/* Read xls files */

// export const readXLS = (file: internal.Stream) => {
//     const workBook = read(file)
//     const firstSheet = workBook.SheetNames[0]
//   }


export const CNAEinfo = () => {
  const directory = path.join(process.cwd(), 'public/estructura_cnae2009.xls')
  const CNAEXLS = readFile(directory)

  return utils.sheet_to_json(CNAEXLS.Sheets[CNAEXLS.SheetNames[0]])
}

export type cnaeInfo = {
  CODINTEGR: string
  COD_CNAE2009: string
  TITULO_CNAE2009: string
}

