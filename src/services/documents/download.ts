// import axios from 'axios'

// export const download = async (fileLinks: string[]) => {
//   for(const url of fileLinks){
//     const resp = await axios( {
//       url,
//       method: 'GET',
//       responseType: 'blob'
//     })
//     console.log(resp)
//   }
// }

export const downloadDocuments = async (selectedRows: string[]) => {
  for(const downloadLink of selectedRows){
    await new Promise((resolve) => {
      setTimeout(() => {
        const element: HTMLAnchorElement | null = document.querySelector(`a[href='${downloadLink}']`)
        element?.click()
        console.log()
        resolve('downloaded')
      }, 1000)
    })
  }
}
