import {
  TextInput,
  NumberInput,
  Create,
  SimpleForm,
  required,
} from 'react-admin'

export const ProductTiersCreate = (props: any) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} />
        <NumberInput source="cost" validate={[required()]} />
        <NumberInput source="order" validate={[required()]} />
      </SimpleForm>
    </Create>
  )
}
