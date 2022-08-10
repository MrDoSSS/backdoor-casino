import { List, Datagrid, TextField, NumberField, EditButton } from 'react-admin'

export const ProductTiersList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="name" />
        <NumberField source="cost" />
        <EditButton />
      </Datagrid>
    </List>
  )
}
