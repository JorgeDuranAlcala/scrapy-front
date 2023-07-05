import { UserTable } from "src/components"

const TableList = () => {
  //TODO: Pedir informacion del backend y pasarla a user table bajo el
  // prop llamado 'rows'

  return <UserTable subject="tenant-system" tooltip="user" />
}

TableList.acl = {
  action: 'read',
  subject: 'tenant-system'
}


export default TableList
