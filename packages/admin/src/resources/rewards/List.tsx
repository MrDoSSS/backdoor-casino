import {
  List,
  Datagrid,
  TextField,
  RichTextField,
  ReferenceField,
  EditButton,
  BooleanField,
} from 'react-admin'

export const RewardsList = () => {
  return (
    <List>
      <Datagrid>
        <RichTextField source="credential" />
        <ReferenceField reference="products" source="product">
          <TextField source="name"></TextField>
        </ReferenceField>
        <BooleanField source="used" />
        <EditButton />
      </Datagrid>
    </List>
  )
}
