import { PropsWithChildren } from "react"


interface TUsersLayout {

}

function UsersLayout({children}:TUsersLayout & PropsWithChildren){
  return <>
    {children}
  </>
}

export default UsersLayout
