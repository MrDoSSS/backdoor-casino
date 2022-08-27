import { TextInput, NumberInput, Edit, SimpleForm, required } from 'react-admin'

export const ProductTiersEdit = (props: any) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} />
        <NumberInput source="cost" validate={[required()]} />
        <NumberInput source="order" validate={[required()]} />
      </SimpleForm>
    </Edit>
  )
}
