import { List, Datagrid, TextField, EditButton } from 'react-admin'

export const WhitelistList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="address" />
        <EditButton />
      </Datagrid>
    </List>
  )
}
