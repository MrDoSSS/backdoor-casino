import { Create, SimpleForm, required } from 'react-admin'
import { ReferenceInput, SelectInput, TextInput } from 'react-admin'

export const RewardsCreate = (props: any) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="login" />
        <TextInput source="password" />
        <TextInput source="key" />{' '}
        <ReferenceInput
          source="product"
          reference="products"
          validate={[required()]}
        >
          <SelectInput label="Product" optionText="name" />
        </ReferenceInput>
        <TextInput source="address" />
      </SimpleForm>
    </Create>
  )
}
