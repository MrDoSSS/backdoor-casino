import { Edit, SimpleForm, required } from 'react-admin'
import { ReferenceInput, SelectInput, TextInput } from 'react-admin'

export const RewardsEdit = (props: any) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="login" />
        <TextInput source="password" />
        <TextInput source="key" />
        <ReferenceInput
          source="product"
          reference="products"
          validate={[required()]}
        >
          <SelectInput label="Product" optionText="name" />
        </ReferenceInput>
        <TextInput source="address" />
      </SimpleForm>
    </Edit>
  )
}
