import { List, Datagrid, TextField, NumberField } from 'react-admin'

export const UsersList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="address" />
        <NumberField source="balance" />
        <TextField source="permissions" />
      </Datagrid>
    </List>
  )
}
