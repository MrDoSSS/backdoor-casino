import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
} from 'react-admin'

export const ProductsList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="name" />
        <TextField source="subtitle" />
        <ReferenceField reference="product-tiers" source="tier">
          <TextField source="name"></TextField>
        </ReferenceField>
        <EditButton />
      </Datagrid>
    </List>
  )
}
