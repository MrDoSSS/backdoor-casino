import { List, Datagrid, TextField, EditButton } from 'react-admin'

export const SettingsList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="key" />
        <TextField source="value" />
        <EditButton />
      </Datagrid>
    </List>
  )
}
