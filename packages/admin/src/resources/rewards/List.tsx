import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  BooleanField,
} from 'react-admin'

export const RewardsList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="login" />
        <TextField source="password" />
        <TextField source="key" />
        <ReferenceField reference="products" source="product">
          <TextField source="name"></TextField>
        </ReferenceField>
        <TextField source="address" />
        <BooleanField source="used" />
        <EditButton />
      </Datagrid>
    </List>
  )
}
