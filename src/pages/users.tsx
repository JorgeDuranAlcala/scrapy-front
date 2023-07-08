
import { UserTable } from 'src/components/Tables'

const TableList = () => {

  return (
      <UserTable />
  )
}

TableList.acl = {
  action: 'write',
  subject: 'users'
}

export default TableList
